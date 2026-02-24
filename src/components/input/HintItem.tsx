import React, { ButtonHTMLAttributes } from "react";

type Props = {
  className?: string;
  id: string;
  label: string;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: Pick<Props, "id" | "label">,
  ) => void;
  button?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    text?: string;
    onClick?: (
      e: React.MouseEvent<HTMLButtonElement>,
      data: Pick<Props, "id" | "label">,
    ) => void;
  };
};

export function HintItem({
  className = "",
  id,
  label,
  onClick,
  button,
}: Props) {
  const { onClick: buttonOnClick, text, ...restButtonAttribute } = button || {};
  return (
    <div
      className={`hint-item-container ${className}`}
      onClick={(e) => {
        onClick && onClick(e, { id, label });
      }}
    >
      <span className="label">{label}</span>

      {button && (
        <button
          {...restButtonAttribute}
          onClick={(e) => {
            if (!buttonOnClick) return;
            e.stopPropagation();

            buttonOnClick(e, { id, label });
          }}
        >
          {text || ""}
        </button>
      )}
    </div>
  );
}
