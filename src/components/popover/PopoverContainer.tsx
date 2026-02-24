import { ReactNode } from "react";
import { Typography } from "@mui/material";
import { usePopover } from "@/components";

type Props = {
  className?: string;
  children?: ReactNode;
  onClose?: ReturnType<typeof usePopover>["handleClose"];
  hideCloseButton?: boolean;
  typographyProps?: Parameters<typeof Typography>[0];
};

export function PopoverContainer({
  className,
  children,
  onClose,
  hideCloseButton,
  typographyProps,
}: Props) {
  return (
    <Typography
      {...typographyProps}
      className={`popover-container ${className || ""} ${typographyProps?.className || ""}`}
    >
      {!hideCloseButton && (
        <div className="button-container">
          <button
            className="icon-button close-gray"
            onClick={(e) => {
              onClose?.(e, "escapeKeyDown");
            }}
          ></button>
        </div>
      )}

      <div className="content-container">{children}</div>
    </Typography>
  );
}
