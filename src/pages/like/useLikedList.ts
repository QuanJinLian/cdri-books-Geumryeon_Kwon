import { useEffect, useMemo, useState } from "react";
import { BE_BookItem, DeepNonNullable } from "@/types";
import { BookCardItemProps } from "@/components";

export type LikedListObj = Record<BE_BookItem["isbn"], BE_BookItem>;
const KEY = "liked-list";

export function useLikedList() {
  // obj 형식
  const [likedListObj, setLikedListObj] = useState(getLikedList());
  // array 형식
  const likedList = useMemo(() => Object.values(likedListObj), [likedListObj]);

  // localStorage 동기화
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(likedListObj));
  }, [likedListObj]);

  function addLiked(id: string, item: BE_BookItem) {
    if (!id) return;
    setLikedListObj((pre) => ({ ...likedListObj, [id]: item }));
  }

  function removeLiked(id: string, item: BE_BookItem) {
    if (!id) return;

    setLikedListObj((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }

  const onLikeChange: DeepNonNullable<
    BookCardItemProps<BE_BookItem>
  >["heart"]["onChange"] = ({ data, checked, id }) => {
    if (!id || !data) return;

    if (checked) {
      addLiked(id, data);
    } else {
      removeLiked(id, data);
    }
  };

  return {
    likedListObj,
    likedList,
    setLikedListObj,
    addLiked,
    removeLiked,
    onLikeChange,
  };
}

function getLikedList() {
  return JSON.parse(localStorage.getItem(KEY) || "{}") as LikedListObj;
}
