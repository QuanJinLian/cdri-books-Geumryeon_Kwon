import {
  CDRISelect,
  HintItemProps,
  PopoverContainer,
  SearchInput,
  SelectItem,
  useHints,
  usePopover,
} from "@/components";
import { popoverSettings } from "@/defines";
import { useForm } from "react-hook-form";
import { Popover } from "@mui/material";
import { useMemo } from "react";

export function SearchSection() {
  const { handleClick, handleClose, popoverControl } = usePopover({
    id: "detail-search",
    popoverProps: popoverSettings.bottomCenter,
  });
  const formControl = useForm();
  const { register, setValue, watch } = formControl;

  // hint 관련 로직
  const { hints, addHint, removeHint } = useHints({ hintKey: "search-hint" });
  const hintItemClick: typeof addHint = (e, data) => {
    addHint(e, data);

    // 검색 query 로직
  };
  const hintsProps = useMemo(
    () =>
      hints?.map(
        (h) =>
          ({
            ...h,
            onClick: hintItemClick,
            button: {
              onClick: removeHint,
            },
          }) as HintItemProps,
      ),
    [hints],
  );

  return (
    <div className="search-section-container">
      <div className="search-book-input-container">
        <SearchInput
          input={{
            ...register("search"),
            placeholder: "검색어를 입력하여 주세요",
          }}
          formControl={formControl}
          hints={hintsProps}
        />
      </div>
      <button className="transparent-button" onClick={handleClick}>
        상세 검색
      </button>
      <Popover {...popoverControl}>
        <PopoverContainer
          onClose={handleClose}
          typographyProps={{ sx: { width: 360 } }}
        >
          <form className="detail-search-container">
            <div className="input-container">
              <CDRISelect
                items={items}
                inputLabel="제목"
                selectProps={{
                  multiple: true,
                  onChange: (e, values) => {
                    console.log("sss", e, values);
                  },
                }}
                formControlProps={{ sx: { width: 150 } }}
              />
              <input
                className="cdri-input"
                type="text"
                placeholder={"검색어를 입력하세요"}
                {...register("detailSearch")}
              />
            </div>
            <button className="primary-button">검색하기</button>
          </form>
        </PopoverContainer>
      </Popover>
    </div>
  );
}

const items: SelectItem[] = [
  {
    value: "author",
    label: "저자명",
  },
  {
    value: "publisher",
    label: "출판사",
  },
];
