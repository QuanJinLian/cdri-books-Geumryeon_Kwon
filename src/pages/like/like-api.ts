import { UndefinedInitialDataInfiniteOptions } from "@tanstack/react-query";
import { BE_BookItem } from "@/types";
import { converterBooks, ReturnBookItem } from "@/pages";

export const getLikeList: UndefinedInitialDataInfiniteOptions<ReturnBookItem>["queryFn"] =
  async ({ queryKey, pageParam = 1 }) => {
    const likedList = queryKey[1] as BE_BookItem[];
    const pageSize = 10;
    const start = ((pageParam as number) - 1) * pageSize;
    const end = start + pageSize;

    const items = converterBooks(likedList.slice(start, end));

    return {
      documents: items,
      meta: {
        pageable_count: likedList.length, //??
        total_count: likedList.length,
        is_end: end >= likedList.length, // 데이터가 끝났는지 확인
      },
    } as ReturnBookItem;
  };
