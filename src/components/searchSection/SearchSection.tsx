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
import { SubmitHandler, useForm } from "react-hook-form";
import { Popover } from "@mui/material";
import { useEffect, useMemo } from "react";

export type SearchFormValues = {
  search: string;
  category: string;
  detailSearch: string;
};

type SearchSectionProps = {
  onSubmit: SubmitHandler<SearchFormValues>;
};

export function SearchSection({ onSubmit }: SearchSectionProps) {
  const { handleClick, handleClose, popoverControl } = usePopover({
    id: "detail-search",
    popoverProps: popoverSettings.bottomCenter,
  });
  const formControl = useForm<SearchFormValues>();
  const { register, setValue, watch, getValues, handleSubmit } = formControl;
  const { search, detailSearch, category } = watch();

  // hint 관련 로직
  const { hints, addHint, removeHint } = useHints({
    hintKey: "search-hint",
    limit: 8,
  });

  const _onSubmit = (values: SearchFormValues) => {
    const search =
      values.search ||
      (values.category && values.detailSearch ? values.detailSearch : "");

    if (!search) {
      console.error("there is no search value in SearchSection");
      return;
    }

    addHint({} as any, { id: search, label: search });
    onSubmit(values);
    handleClose({}, "escapeKeyDown");
  };

  const hintItemClick: typeof addHint = (e, data) => {
    // 검색 query 로직
    setValue("search", data.label);
    _onSubmit(getValues());
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

  // input 끼리 연관 로직
  useEffect(() => {
    if (search && (detailSearch || category)) {
      setValue("category", "");
      setValue("detailSearch", "");
    }
  }, [search]);
  useEffect(() => {
    if (search && (detailSearch || category)) {
      setValue("search", "");
    }
  }, [detailSearch, category]);

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
          onSubmit={_onSubmit}
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
          <form
            className="detail-search-container"
            onSubmit={handleSubmit(_onSubmit)}
          >
            <div className="input-container">
              <CDRISelect
                items={items}
                inputLabel="제목"
                selectProps={{
                  onChange: (e, values) => {
                    setValue("category", values?.current?.[0]);
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
    value: "person",
    label: "저자명",
  },
  {
    value: "publisher",
    label: "출판사",
  },
];
