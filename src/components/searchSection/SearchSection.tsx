import {
  CDRISelect,
  PopoverContainer,
  SelectItem,
  usePopover,
} from "@/components";
import { popoverSettings } from "@/defines";
import { useForm } from "react-hook-form";
import { SearchInput } from "@/components/input";

export function SearchSection() {
  const { handleClick, handleClose, Popover } = usePopover({
    id: "detail-search",
    popoverProps: popoverSettings.bottomCenter,
  });
  const { register, setValue, watch } = useForm();

  return (
    <div className="search-section-container">
      <div className="search-book-input-container">
        <SearchInput
          input={{
            ...register("search"),
            placeholder: "검색어를 입력하여 주세요",
          }}
          hints={[]}
        />
      </div>
      <button className="transparent-button" onClick={handleClick}>
        상세 검색
      </button>
      <Popover>
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
