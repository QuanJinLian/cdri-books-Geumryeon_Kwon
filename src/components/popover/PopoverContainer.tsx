import { ReactNode } from "react";
import { Box } from "@mui/material";
import { usePopover } from "@/components";

type Props = {
  className?: string;
  children?: ReactNode;
  onClose?: ReturnType<typeof usePopover>["handleClose"];
  hideCloseButton?: boolean;
  boxProps?: Parameters<typeof Box>[0];
};

export function PopoverContainer({
  className,
  children,
  onClose,
  hideCloseButton,
  boxProps,
}: Props) {
  return (
    <Box
      {...boxProps}
      className={`popover-container ${className || ""} ${boxProps?.className || ""}`}
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
    </Box>
  );
}
