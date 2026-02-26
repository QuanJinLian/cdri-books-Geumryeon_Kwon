import axios from "axios";
import { BookCardItemProps, SearchFormValues } from "@/components";
import { BE_BookItem, BE_Response } from "@/types";
import { UndefinedInitialDataInfiniteOptions } from "@tanstack/react-query";

const buyOnClick: BookCardItemProps<BE_BookItem>["onClick"] = (data) => {
  if (!data?.url) return;

  window.open(data?.url, "_blank");
};

function converter(data: BE_BookItem[]) {
  return data?.map?.(
    (d, i) =>
      ({
        id: d.isbn,
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

export type ReturnBookItem = BE_Response<BookCardItemProps<BE_BookItem>>;

export const getSearchBooks: UndefinedInitialDataInfiniteOptions<ReturnBookItem>["queryFn"] =
  async ({ queryKey, pageParam = 1 }) => {
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
