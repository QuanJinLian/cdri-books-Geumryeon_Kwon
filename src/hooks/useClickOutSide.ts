import { MutableRefObject, type RefObject, useEffect, useRef } from "react";

type Props<T extends HTMLElement> = {
  ref?: MutableRefObject<T | null>;
  callback?: (() => void) | null;
  ignoreDomList?: (Element | null | RefObject<Element | null>)[] | null;
};

export function useClickOutSide<T extends HTMLElement>({
  ref,
  callback,
  ignoreDomList,
}: Props<T>) {
  const _ref = ref ?? useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ignoreDomList) {
        for (const dom of ignoreDomList) {
          /* ref 일 경우 */
          if (
            dom &&
            "current" in dom &&
            dom.current &&
            "contains" in dom.current &&
            dom.current?.contains(e.target as Node)
          )
            return;

          /* element 일 경우 */
          if (dom && "contains" in dom && dom?.contains(e.target as Node))
            return;
        }
      }

      if (_ref.current && !_ref.current.contains(e.target as Node)) {
        callback?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return { ref: _ref };
}
