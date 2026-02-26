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

const emptyHint: HintItemProps[] = [
  { id: "empty", label: "검색 기록이 없습니다." },
];

export type SearchFormValues = {
  search: string;
  category: string;
  detailSearch: string;
};

type SearchSectionProps = {
  onSubmit: SubmitHandler<SearchFormValues>;
  select: {
    items: SelectItem[];
    selected?: SelectItem["value"];
  };
};

export function SearchSection({ onSubmit, select }: SearchSectionProps) {
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

  const { items, selected } = select;
  const resetDetail = () => {
    setValue("category", selected || "");
    setValue("detailSearch", "");
  };
  const resetSearch = () => {
    setValue("search", "");
  };

  const hintItemClick: typeof addHint = (e, data) => {
    // 검색 query 로직
    setValue("search", data.label);
    resetDetail();
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

  // 필요하면 여기서 debounce 처리
  const showHints = useMemo(() => {
    let _hints = hintsProps?.length ? hintsProps : emptyHint;

    return !search
      ? _hints
      : hintsProps?.filter((h) => h.label.includes(search));
  }, [hintsProps, search]);
  // hint 관련 로직 끝

  const _onSubmit = (values: SearchFormValues) => {
    const search =
      values.search ||
      (values.category && values.detailSearch ? values.detailSearch : "");

    if (search) {
      addHint({} as any, { id: search, label: search });
    }

    onSubmit(values);
    handleClose({}, "escapeKeyDown");
  };

  //select
  useEffect(() => {
    if (!selected) return;

    setValue("category", selected);
  }, [selected]);

  // input 끼리 연관 로직
  useEffect(() => {
    if (search && (detailSearch || category !== selected)) {
      resetDetail();
    }
  }, [search]);
  useEffect(() => {
    if (search && (detailSearch || category !== selected)) {
      resetSearch();
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
          hints={showHints}
          onSubmit={_onSubmit}
        />
      </div>
      <button className="transparent-button" onClick={handleClick}>
        상세 검색
      </button>
      <Popover {...popoverControl}>
        <PopoverContainer
          onClose={handleClose}
          boxProps={{ sx: { width: 360 } }}
        >
          <form
            className="detail-search-container"
            onSubmit={handleSubmit(_onSubmit)}
          >
            <div className="input-container">
              <CDRISelect
                items={items}
                selected={category}
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
