import { ReactNode, useEffect, useRef } from "react";

export type InfiniteScrollProps = {
  className?: string;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  loadingComponent?: ReactNode;
};

const InfiniteScroll = ({
  className = "",
  onLoadMore,
  hasMore,
  isLoading,
  loadingComponent,
}: InfiniteScrollProps) => {
  const observerRef = useRef(null);

  useEffect(() => {
    // 이미 로딩 중이거나 더 가져올 데이터가 없으면 관찰 중단
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.95 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <div className={`infinite-scroll-container ${className}`} ref={observerRef}>
      {isLoading && (
        <p>
          {loadingComponent ?? (
            <img
              className="loading-icon"
              src="/src/assets/image/spinner.svg"
              alt="loading-icon"
              loading="lazy"
            />
          )}
        </p>
      )}
    </div>
  );
};

export default InfiniteScroll;
