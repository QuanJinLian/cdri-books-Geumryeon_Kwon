import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import { nanoid } from "@/util";

export type SelectItem = {
  label: ReactNode;
  value: string;
  menuItemProps?: Parameters<typeof MenuItem>[0];
};

type SelectedType = string[];

export type CDRiSelectProps = {
  items: SelectItem[];
  selected?: SelectedType[number] | SelectedType;
  inputLabel?: string;
  formControlProps?: Parameters<typeof FormControl>[0];
  selectProps?: Omit<
    Parameters<typeof Select>[0],
    "labelId" | "value" | "onChange"
  > & {
    onChange?: (
      e: SelectChangeEvent<SelectedType>,
      selected: { previous: SelectedType; current: SelectedType },
    ) => void;
  };
};

export function CDRISelect({
  items,
  selected: _selected,
  inputLabel,
  formControlProps,
  selectProps,
}: CDRiSelectProps) {
  const id = useMemo(() => `cdri-select-${nanoid()}`, []);

  const alreadySelected = Array.isArray(_selected)
    ? _selected
    : typeof _selected === "string"
      ? [_selected]
      : [];
  const [selected, setSelected] = useState<SelectedType>(alreadySelected);

  const handleChange = (event: SelectChangeEvent<SelectedType>) => {
    const {
      target: { value },
    } = event;
    const selectedVal = typeof value === "string" ? value.split(",") : value;
    selectProps?.onChange?.(event, {
      previous: selected,
      current: selectedVal,
    });
    setSelected(selectedVal);
  };

  return (
    <FormControl {...formControlProps}>
      {inputLabel && <InputLabel id={id}>{inputLabel}</InputLabel>}

      <Select
        IconComponent={(props) => (
          <img
            src="/src/assets/image/arrow-down.svg"
            alt="icon"
            {...props}
            style={{ top: "unset" }}
          />
        )}
        {...(selectProps as Omit<typeof selectProps, "onChange">)}
        labelId={id}
        value={selected}
        onChange={handleChange}
        input={inputLabel ? <OutlinedInput label={inputLabel} /> : undefined}
      >
        {items.map(({ label, value, menuItemProps }) => (
          <MenuItem
            key={value}
            {...menuItemProps}
            value={value}
            className={`${menuItemProps?.className || ""} selected`}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
