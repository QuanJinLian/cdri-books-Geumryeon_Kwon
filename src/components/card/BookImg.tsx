import { FieldValues } from "react-hook-form";

export type BookImgProps<T extends FieldValues> = {
  id: string;
  imgSrc: string;
  alt: string;
  heart?: {
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
  const { checked = false, onChange, data } = heart || {};

  return (
    <div className="book-image-container">
      <img
        className="book-img"
        src={imgSrc || "src/assets/image/empty-img.webp"}
        alt={alt}
        loading="lazy"
      />
      {heart && (
        <img
          className="heart-img"
          src={
            checked
              ? "/src/assets/image/like-fill.svg"
              : "/src/assets/image/like-line.svg"
          }
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
