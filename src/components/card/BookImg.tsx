export type BookImgProps = {
  id: string;
  imgSrc: string;
  alt: string;
  heart?: {
    checked: boolean;
    onChange?: (id: string, checked: boolean) => void;
  };
};

export function BookImg({ id, imgSrc, alt, heart }: BookImgProps) {
  const { checked = false, onChange } = heart || {};

  return (
    <div className="book-image-container">
      <img className="book-img" src={imgSrc} alt={alt} />
      {heart && (
        <img
          className="heart-img"
          src={
            checked
              ? "/src/assets/image/like-fill.svg"
              : "/src/assets/image/like-line.svg"
          }
          alt={`heart-${checked ? "checked" : ""}`}
          onClick={() => onChange?.(id, !checked)}
        />
      )}
    </div>
  );
}
