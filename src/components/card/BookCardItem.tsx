import { ItemCount } from "@/components";
import { BookTitle } from "@/components/card/BookTitle";
import { FieldValues } from "react-hook-form";

export type BookCardItemProps<T extends FieldValues> = {
  id: string;
  imgSrc: string;
  title: string;
  author: string[];
  prices: number[]; //가격
  content?: string;
  rawData?: T;
  onClick: (data: T | undefined) => void; // 구매 버튼 클릭
  accordion?: {
    isOpen: boolean;
    onChange: (id: string) => void;
  };
};

export function BookCardItem<T extends FieldValues>({
  id,
  imgSrc,
  prices,
  author,
  title,
  content,
  rawData,
  onClick,
  accordion,
}: BookCardItemProps<T>) {
  const { isOpen = false, onChange } = accordion || {};
  const lastPrice = prices[prices.length - 1];

  const BuyButton = (
    <button
      className="primary-button buy-button"
      onClick={() => onClick(rawData)}
    >
      구매하기
    </button>
  );

  return (
    <div className={`book-card-item-container ${isOpen ? "detail-open" : ""}`}>
      <div className="img-container">
        <img src={imgSrc} alt={title} />
      </div>
      <div className="content-container">
        <div className="content-header">
          <ItemCount
            className="book-name-price"
            title={<BookTitle title={title} subTitle={author?.join(", ")} />}
            count={{
              number: lastPrice,
              suffix: "원",
            }}
          />
          {/* 구매하기 버튼 */}
          {BuyButton}

          {/* accordion 설정 있을 경우에만 버튼 노출 */}
          {accordion && (
            <button
              className="gray-button detail-button"
              onClick={() => {
                onChange?.(id);
              }}
            >
              상세보기
              <img src="/src/assets/image/arrow-down.svg" alt="arrow-down" />
            </button>
          )}
        </div>

        {/* 상세 컨텐트 */}
        <div className="content-body">
          <div className="content-body-wrapper">
            <div className="content-body-left">
              <h2>책 소개</h2>
              <p>{content}</p>
            </div>
            <div className="content-body-right">
              <div className="price-container">
                {prices.map((price, i) => (
                  <ItemCount
                    key={`price-${price}-${i}`}
                    className={`price ${i === prices.length - 1 ? "" : "strikethrough"}`}
                    count={{
                      prefix: i === 0 ? "원가" : "할인가",
                      number: price,
                      suffix: "원",
                    }}
                  />
                ))}
              </div>

              {/* 구매하기 버튼 */}
              {BuyButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
