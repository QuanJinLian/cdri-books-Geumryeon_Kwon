import { Empty, ItemCount } from "@/components";

export function LikeBooks() {
  return (
    <main className="tab-content-container">
      <p className="typo-title2">내가 찜한 책</p>
      <div className="result-count">
        <ItemCount
          className="result"
          title={"찜한 책"}
          count={{
            prefix: "총",
            number: 30099,
            suffix: "건",
          }}
        />
      </div>
      <div className="result-content">
        <Empty
          message={"찜한 책이 없습니다."}
          imageSrc={"/src/assets/image/icon_book.svg"}
        />
      </div>
    </main>
  );
}
