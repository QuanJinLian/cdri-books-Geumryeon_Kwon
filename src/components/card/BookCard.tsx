import {
  BookCardItem,
  BookCardItemProps,
} from "@/components/card/BookCardItem";
import { FieldValues } from "react-hook-form";
import { useState } from "react";

export type BookCardProps<T extends FieldValues> = {
  className?: string;
  data: Omit<BookCardItemProps<T>, "accordion">[];
  accordion: {
    multi?: boolean; // 기본값 false, 하나만 열린다.
    hidden?: boolean; // 기본값 false
    openIds?: string[];
  };
};

export function BookCard<T extends FieldValues>({
  className = "",
  data,
  accordion,
}: BookCardProps<T>) {
  const { multi = false, hidden = false } = accordion || {};
  const _openIds = accordion?.openIds ?? [];
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(multi ? _openIds : [_openIds[0]]),
  );

  const handleChange: NonNullable<
    BookCardItemProps<T>["accordion"]
  >["onChange"] = (id) => {
    const hasId = openIds.has(id);
    if (!multi) {
      setOpenIds(new Set(hasId ? [] : [id]));
      return;
    }

    if (hasId) {
      setOpenIds(new Set([...openIds].filter((x) => x !== id)));
    } else {
      setOpenIds(new Set([...openIds, id]));
    }
  };

  return (
    <div className={`book-card-container ${className}`}>
      {data?.map((dataItem) => (
        <BookCardItem
          key={dataItem.id}
          {...dataItem}
          accordion={
            hidden
              ? undefined
              : {
                  isOpen: openIds.has(dataItem.id),
                  onChange: handleChange,
                }
          }
        />
      ))}
    </div>
  );
}
