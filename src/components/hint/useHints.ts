import { useEffect, useState } from "react";
import { HintItemProps } from "@/components";
import { DeepNonNullable } from "@/types";

export type UseHintProps = {
  hintKey: string;
  limit?: number;
};

type HintType = Parameters<DeepNonNullable<HintItemProps>["onClick"]>[1];

export function useHints({ hintKey, limit = 8 }: UseHintProps) {
  const [hints, setHints] = useState(
    JSON.parse(localStorage.getItem(hintKey) || "[]") as HintType[],
  );

  // 동기화
  useEffect(() => {
    const string = JSON.stringify(hints);

    if (string === localStorage.getItem(hintKey)) return;
    localStorage.setItem(hintKey, string);
  }, [hints]);

  const addHint: DeepNonNullable<HintItemProps>["onClick"] = (e, hint) => {
    setHints((prevHints) => {
      const filtered = prevHints.filter((item) => item.id !== hint.id);
      const updated = [hint, ...filtered];
      return updated.slice(0, 8);
    });
  };

  const removeHint: DeepNonNullable<HintItemProps>["button"]["onClick"] = (
    e,
    hint,
  ) => {
    setHints((prevHints) => {
      return prevHints.filter((item) => item.id !== hint.id);
    });
  };

  return {
    hints,
    setHints,
    addHint,
    removeHint,
  };
}
