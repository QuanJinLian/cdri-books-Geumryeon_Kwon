import { ReactNode } from "react";
import { Typography } from "@mui/material";
import { usePopover } from "@/components";

type Props = {
  className?: string;
  children?: ReactNode;
  onClose?: ReturnType<typeof usePopover>["handleClose"];
  hideCloseButton?: boolean;
};

export function PopoverContainer({
  className,
  children,
  onClose,
  hideCloseButton,
}: Props) {
  return (
    <Typography className={`popover-container ${className}`}>
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
