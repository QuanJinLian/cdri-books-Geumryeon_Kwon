import {
  BookCard,
  Empty,
  ItemCount,
  SearchFormValues,
  SearchSection,
  SelectItem,
  InfiniteScroll,
  BookImg,
} from "@/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { BE_BookItem } from "@/types";
import {
  getNextPageParam,
  getSearchBooks,
  mergeBooksNLikedList,
  ReturnBookItem,
} from "@/pages/search/search-api";
import { useLikedList } from "@/pages/like/useLikedList";

// 도서 검색
export function SearchBooks() {
  const [values, setValues] = useState<SearchFormValues | undefined>();

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery<ReturnBookItem>({
      queryKey: ["books", values],
      queryFn: getSearchBooks,
      initialPageParam: 1,
      getNextPageParam: getNextPageParam,
      enabled: !!values,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });

  const onSubmit = (values) => {
    setValues(values);
  };

  // 찜한 책과 merge 작업
  const { likedListObj, onLikeChange } = useLikedList();
  const showData = useMemo(
    () =>
      mergeBooksNLikedList({
        books: data,
        likedList: likedListObj,
        onLikeChange,
      }),
    [data, likedListObj],
  );

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
        {showData?.pages.map((page, i) => {
          if (!page) return null;

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
