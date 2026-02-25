import {
  BookCard,
  BookCardItemProps,
  Empty,
  ItemCount,
  SearchFormValues,
  SearchSection,
  SelectItem,
  InfiniteScroll,
} from "@/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BE_BookItem, BE_Response } from "@/types";

// 도서 검색
export function SearchBooks() {
  const [values, setValues] = useState<SearchFormValues | undefined>();

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery<BE_Response<BookCardItemProps<BE_BookItem>>>({
      queryKey: ["books", values],
      queryFn: async ({ queryKey, pageParam = 1 }) => {
        const queryKey1 = queryKey[1] as typeof values;
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
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.meta.is_end || !lastPage.meta.total_count)
          return undefined;
        return allPages.length + 1;
      },
      enabled: !!values,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });

  const onSubmit = (values) => {
    setValues(values);
  };

  return (
    <main className="tab-content-container">
      <p className="typo-title2">도서 검색</p>
      <SearchSection
        onSubmit={onSubmit}
        select={{ items: items, selected: items[0].value }}
      />
      <div className="result-count">
        <ItemCount
          className="result"
          title={"도서 검색 결과"}
          count={{
            prefix: "총",
            number: data?.pages?.[0]?.meta?.total_count || 0,
            suffix: "건",
          }}
        />
      </div>
      <div className="result-content">
        {data?.pages.map((page, i) => {
          return (
            <BookCard<BE_BookItem>
              key={i}
              data={page.documents}
              accordion={{
                multi: true,
              }}
            />
          );
        })}
        {hasNextPage && (
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasMore={hasNextPage}
            isLoading={isFetchingNextPage}
          />
        )}

        {(!data?.pages?.length || !data?.pages?.[0]?.documents?.length) &&
          (isFetching ? (
            <Empty imageSrc={"/src/assets/image/spinner.svg"} message={""} />
          ) : (
            <Empty
              message={"검색된 결과가 없습니다."}
              imageSrc={"/src/assets/image/icon_book.svg"}
            />
          ))}
      </div>
      <div></div>
    </main>
  );
}

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

const items: SelectItem[] = [
  {
    value: "title",
    label: "제목",
  },
  {
    value: "person",
    label: "저자명",
  },
  {
    value: "publisher",
    label: "출판사",
  },
];
