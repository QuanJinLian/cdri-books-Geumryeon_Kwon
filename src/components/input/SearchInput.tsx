import { HintItem } from "./HintItem";
import { CSSProperties, InputHTMLAttributes } from "react";

type Props = {
  className?: string;
  icon?: {
    imageSrc?: string;
    alt?: string;
    hidden?: boolean;
    size?: string;
  };
  input: InputHTMLAttributes<HTMLInputElement>;
  hints?: Parameters<typeof HintItem>[0][];
  hideHint?: boolean;
};

export function SearchInput({
  className,
  icon,
  input,
  hints,
  hideHint = false,
}: Props) {
  // 기본 아이콘 지정해줌
  const {
    imageSrc = "/src/components/input/assets/search.svg",
    alt = "search-icon",
    size = "30px",
  } = icon || {};

  return (
    <div
      className={`search-input-container ${className}`}
      style={{ "--imgSize": icon?.hidden ? "0" : size } as CSSProperties} // 아이콘이 없는 경우 hint-item padding 조절이 필요함
    >
      <div className="input-container">
        <img src={imageSrc} alt={alt} />
        <input {...input} />
      </div>

      {!hideHint && (
        <div className="content-container">
          {hints?.map((hint) => (
            <HintItem key={hint.id} {...hint} />
          ))}
        </div>
      )}
    </div>
  );
}
