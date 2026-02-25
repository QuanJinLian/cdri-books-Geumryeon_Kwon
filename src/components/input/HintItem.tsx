import React, { ButtonHTMLAttributes } from "react";

export type HintItemProps = {
  className?: string;
  id: string;
  label: string;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: Pick<HintItemProps, "id" | "label">,
  ) => void;
  button?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    text?: string;
    onClick?: (
      e: React.MouseEvent<HTMLButtonElement>,
      data: Pick<HintItemProps, "id" | "label">,
    ) => void;
  };
};

export function HintItem({
  className = "",
  id,
  label,
  onClick,
  button,
}: HintItemProps) {
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
