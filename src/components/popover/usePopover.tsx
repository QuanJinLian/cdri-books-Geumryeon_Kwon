import { MouseEvent, ReactNode, useState } from "react";
import { Popover } from "@mui/material";

export type UsePopover = {
  id: string;
  popoverProps?: Omit<
    Parameters<typeof Popover>[0],
    "open" | "id" | "anchorEl"
  >;
};

export function usePopover<T extends HTMLElement>({
  id,
  popoverProps,
}: UsePopover) {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);

  const handleClick = (e: MouseEvent<T>) => {
    setAnchorEl(e.currentTarget);
  };

  const { onClose, ...restProps } = popoverProps || {};
  const handleClose: Parameters<typeof Popover>[0]["onClose"] = (e, reason) => {
    onClose?.(e, reason);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const _id = open ? id : undefined;

  return {
    id: _id,
    handleClick,
    handleClose,
    anchorEl,
    popoverControl: {
      id: _id,
      onClose: handleClose,
      open: open,
      anchorEl: anchorEl,
      ...restProps,
    },
  };
}
