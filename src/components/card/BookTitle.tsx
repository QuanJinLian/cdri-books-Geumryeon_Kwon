type Props = {
  className?: string;
  title: string;
  subTitle?: string;
};

export function BookTitle({ title, subTitle }: Props) {
  return (
    <div className="book-title-container">
      <span className="title">{title}</span>
      {subTitle && <span className="subTitle">{subTitle}</span>}
    </div>
  );
}
