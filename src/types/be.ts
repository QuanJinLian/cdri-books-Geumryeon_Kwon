import { FieldValues } from "react-hook-form";

type Meta = {
  total_count: number;
  pageable_count: boolean;
  is_end: boolean;
};

export type BE_Response<T extends FieldValues> = {
  meta: Meta;
  documents: T[];
};

export type BE_BookItem = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
};
