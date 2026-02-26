import { CSSProperties, InputHTMLAttributes, useMemo, useRef } from "react";
import { HintItem, HintItemProps, usePopover } from "@/components";
import { popoverSettings } from "@/defines";
import { Popover } from "@mui/material";
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { useClickOutSide } from "@/hooks";

type Props<T extends FieldValues> = {
  className?: string;
  icon?: {
    imageSrc?: string;
    alt?: string;
    hidden?: boolean;
    size?: string;
  };
  input: Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
    name: Path<T>;
  };
  formControl: UseFormReturn<T>;
  hints?: HintItemProps[];
  hideHint?: boolean;
  onSubmit: SubmitHandler<T>;
};

export function SearchInput<T extends FieldValues>({
  className = "",
  icon,
  input,
  formControl,
  hints,
  hideHint = false,
  onSubmit,
}: Props<T>) {
  // 기본 아이콘 지정해줌
  const {
    imageSrc = "/src/components/input/assets/search.svg",
    alt = "search-icon",
    size = "30px",
  } = icon || {};

  const { handleClick, handleClose, anchorEl, popoverControl, setOpen } =
    usePopover({
      id: "detail-search",
      popoverProps: popoverSettings.bottomCenter,
    });
  const { width } = useMemo(
    () => anchorEl?.getBoundingClientRect() || ({} as DOMRect),
    [anchorEl],
  );

  const searchImgSize = icon?.hidden ? "0" : size;
  const isOpen = popoverControl.open && !!hints?.length;

  const popperRef = useRef<HTMLDivElement>(null);

  const { ref } = useClickOutSide<HTMLDivElement>({
    ignoreDomList: [popperRef],
    callback: () => {
      handleClose({}, "escapeKeyDown");
    },
  });

  const _onSubmit: typeof onSubmit = (data, event) => {
    onSubmit(data, event);
    handleClose({}, "escapeKeyDown");
  };

  return (
    <form
      className={`search-input-container ${className} ${isOpen ? "open" : ""}`}
      style={{ "--imgSize": searchImgSize } as CSSProperties} // 아이콘이 없는 경우 hint-item padding 조절이 필요함
      onSubmit={formControl.handleSubmit(_onSubmit)}
    >
      <div ref={ref} className={`input-container`} onClick={handleClick}>
        <img src={imageSrc} alt={alt} />
        <input
          {...input}
          onChange={(e) => {
            input.onChange?.(e);
            setOpen(true);
          }}
          autoComplete="off"
        />
      </div>

      <Popover
        className={`search-input-popper`}
        {...popoverControl}
        transitionDuration={0}
        hideBackdrop
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        slotProps={{
          root: {
            sx: { pointerEvents: "none" },
          },
          paper: {
            sx: {
              pointerEvents: "auto",
              "--Paper-shadow": "unset !important",
              marginTop: "9px",
              borderRadius: "0 0 24px 24px",
              ".search-input-content-container": {
                width: width + 20 + "px",
                padding: isOpen ? "12px 12px 12px 45px" : "0",
              },
              ".hint-item-container": {
                color: "var(--text-subtitle)",
              },
            },
          },
        }}
      >
        {!hideHint && (
          <div ref={popperRef} className="search-input-content-container">
            {hints?.map((hint) => (
              <HintItem
                key={hint.id}
                {...hint}
                onClick={(e) => {
                  hint.onClick?.(e, hint);
                  handleClose(e, "escapeKeyDown");
                }}
              />
            ))}
          </div>
        )}
      </Popover>
    </form>
  );
}
