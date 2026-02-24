import { UsePopover } from "@/components";

// 프로젝트 공통 popover 셋팅 값 모음
export const popoverSettings = {
  bottomCenter: {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: { vertical: "top", horizontal: "center" },
    slotProps: {
      paper: {
        sx: {
          marginTop: "10px",
        },
      },
    },
  },
  topCenter: {}, // ... 다른 방향 popover 셋팅값
} as const satisfies Record<string, UsePopover["popoverProps"]>;
