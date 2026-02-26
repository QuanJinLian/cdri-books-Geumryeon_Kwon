import { BookCard, Empty, InfiniteScroll, ItemCount } from "@/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getLikeList,
  getNextPageParam,
  mergeBooksNLikedList,
  ReturnBookItem,
  useLikedList,
} from "@/pages";
import { BE_BookItem } from "@/types";
import { useMemo } from "react";

export function LikeBooks() {
  const { likedListObj, onLikeChange, likedList } = useLikedList();

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery<ReturnBookItem>({
      queryKey: ["likes", likedList],
      queryFn: getLikeList,
      initialPageParam: 1,
      getNextPageParam: getNextPageParam,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });

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
      <p className="typo-title2">내가 찜한 책</p>
      <div className="result-count">
        <ItemCount
          className="result"
          title={"찜한 책"}
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
              message={"찜한 책이 없습니다."}
              imageSrc={"/src/assets/image/icon_book.svg"}
            />
          ))}
      </div>
    </main>
  );
}
