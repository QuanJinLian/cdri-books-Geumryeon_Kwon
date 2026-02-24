// 도서 검색 결과 총 21건
// 할인가 13,500원
// 위와 같은 문구 표현하는 컴포넌트

import { ReactNode } from "react";
import "./itemCount.scss";

type Props = {
  className?: string;
  title?: ReactNode;
  count?: {
    prefix?: ReactNode;
    number: number;
    suffix?: ReactNode;
    formatter?: (number: number) => ReactNode;
  };
};

const defaultFormatter = (num: number) =>
  new Intl.NumberFormat("ko-KR").format(num);

export function ItemCount({ className = "", title, count }: Props) {
  const { prefix, suffix, number, formatter = defaultFormatter } = count || {};
  return (
    <div className={`item-count-container ${className}`}>
      {title && <span className="title">{title}</span>}

      <div className="count-container">
        {prefix && <span className="prefix">{prefix}</span>}

        <div className="count-suffix-group">
          {number && <span className="count">{formatter(number)}</span>}
          {suffix && <span className="suffix">{suffix}</span>}
        </div>
      </div>
    </div>
  );
}
