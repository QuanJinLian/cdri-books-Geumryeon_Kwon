import { TabItem, useTabs } from "@/components";
import { Box } from "@mui/material";
import { Logo } from "@/pages";

export function MainLayout() {
  const { Tabs } = useTabs({
    tabs,
    selectedTab: "search",
    tabListProps: {
      centered: true,
    },
  });

  return (
    <Box className="main-container">
      <Logo />
      <Tabs />
    </Box>
  );
}

const tabs: TabItem[] = [
  {
    id: "search",
    label: "도서 검색",
    component: <div>도서 검색</div>,
  },
  {
    id: "like",
    label: "찜한 책",
    component: <div>찜한 책</div>,
  },
];
