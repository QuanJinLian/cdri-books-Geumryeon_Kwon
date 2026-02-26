import { FieldValues } from "react-hook-form";

export type BookImgProps<T extends FieldValues> = {
  id: string;
  imgSrc: string;
  alt: string;
  heart?: {
    icons: { checked: string; unchecked: string };
    checked: boolean;
    data: T;
    onChange?: (props: {
      data: T | undefined;
      id: string;
      checked: boolean;
    }) => void;
  };
};

export function BookImg<T extends FieldValues>({
  id,
  imgSrc,
  alt,
  heart,
}: BookImgProps<T>) {
  const { checked = false, onChange, data, icons } = heart || {};

  return (
    <div className="book-image-container">
      <img className="book-img" src={imgSrc} alt={alt} loading="lazy" />
      {heart && (
        <img
          className="heart-img"
          src={checked ? icons?.checked : icons?.unchecked}
          alt={`heart-${checked ? "checked" : ""}`}
          onClick={() =>
            onChange?.({
              checked: !checked,
              id: id,
              data: data,
            })
          }
          loading="lazy"
        />
      )}
    </div>
  );
}
