import axios from "axios";
import { BookCardItemProps, SearchFormValues } from "@/components";
import { BE_BookItem, BE_Response, DeepNonNullable } from "@/types";
import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { LikedListObj } from "@/pages";

const buyOnClick: BookCardItemProps<BE_BookItem>["onClick"] = (data) => {
  if (!data?.url) return;

  window.open(data?.url, "_blank");
};

function converter(data: BE_BookItem[]) {
  return data?.map?.(
    (d, i) =>
      ({
        id: `${d.isbn}-${d.title}-${d.authors?.join(",")}`,
        title: d.title,
        content: d.contents,
        author: d.authors,
        prices: [d.price, d.sale_price],
        imgSrc: d.thumbnail,
        onClick: buyOnClick,
        rawData: d,
      }) as BookCardItemProps<BE_BookItem>,
  );
}

export type ReturnBookItem =
  | BE_Response<BookCardItemProps<BE_BookItem>>
  | undefined;
export type ReturnBookData = UseInfiniteQueryResult<ReturnBookItem>["data"];

export const getSearchBooks: UndefinedInitialDataInfiniteOptions<ReturnBookItem>["queryFn"] =
  async ({ queryKey, pageParam = 1 }): Promise<ReturnBookData> => {
    const queryKey1 = queryKey[1] as SearchFormValues;
    const params = queryKey1?.search
      ? { query: queryKey1.search }
      : { query: queryKey1?.detailSearch, target: queryKey1?.category };

    const { data } = await axios.get("/v3/search/book", {
      params: {
        ...params,
        page: pageParam,
      },
    });

    data.documents = converter(data.documents);
    return data;
  };

export const getNextPageParam = (lastPage, allPages) => {
  if (lastPage.meta.is_end || !lastPage.meta.total_count) return undefined;
  return allPages.length + 1;
};

export const mergeBooksNLikedList = ({
  books,
  likedList,
  onLikeChange,
}: {
  books: InfiniteData<ReturnBookItem, unknown> | undefined;
  likedList: LikedListObj;
  onLikeChange: DeepNonNullable<
    BookCardItemProps<BE_BookItem>
  >["heart"]["onChange"];
}): InfiniteData<ReturnBookItem, unknown> | undefined => {
  if (!books || !books?.pages?.[0]?.documents?.length) return;

  if (!likedList) return books;

  return {
    ...books,
    pages: books.pages.map(
      (page) =>
        ({
          ...page,
          documents: page?.documents?.map((item) => ({
            ...item,
            heart: {
              checked: !!likedList?.[item.id],
              onChange: onLikeChange,
              data: item.rawData,
            },
          })),
        }) as ReturnBookItem,
    ),
  };
};
