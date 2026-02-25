import { Empty, ItemCount, SearchSection } from "@/components";

// 도서 검색
export function SearchBooks() {
  return (
    <main className="tab-content-container">
      <p className="typo-title2">도서 검색</p>
      <SearchSection />
      <div className="result-count">
        <ItemCount
          className="result"
          title={"도서 검색 결과"}
          count={{
            prefix: "총",
            number: 30099,
            suffix: "건",
          }}
        />
      </div>
      <div className="result-content">
        <Empty
          message={"검색된 결과가 없습니다."}
          imageSrc={"/src/assets/image/icon_book.svg"}
        />
      </div>
    </main>
  );
}
