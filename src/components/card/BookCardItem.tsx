import { useState } from "react";
import { ItemCount } from "@/components";
import { BookTitle } from "@/components/card/BookTitle";

type BookCardItemProps = {
  imgSrc: string;
  title: string;
  author: string[];
  prices: number[]; //가격
  content: string;
};

export function BookCardItem({
  imgSrc,
  prices,
  author,
  title,
  content,
}: BookCardItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const lastPrice = prices[prices.length - 1];

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
          <button className="primary-button buy-button">구매하기</button>
          <button
            className="gray-button detail-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            상세보기
            <img src="/src/assets/image/arrow-down.svg" alt="arrow-down" />
          </button>
        </div>
        {isOpen && (
          <div className="content-body">
            <div className="content-body-left">
              <h2>책 소개</h2>
              <p>{content}</p>
            </div>
            <div className="content-body-right">
              <div className="price-container">
                {prices.map((price, i) => (
                  <ItemCount
                    className={`price ${i === prices.length - 1 ? "" : "strikethrough"}`}
                    count={{
                      prefix: i === 0 ? "원가" : "할인가",
                      number: price,
                      suffix: "원",
                    }}
                  />
                ))}
              </div>
              <button className="primary-button buy-button">구매하기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
