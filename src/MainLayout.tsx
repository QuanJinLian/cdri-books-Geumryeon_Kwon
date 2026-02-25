import { TabItem, useTabs } from "@/components";
import { LikeBooks, Logo, SearchBooks } from "@/pages";

export function MainLayout() {
  const { Tabs } = useTabs({
    tabs,
    selectedTab: "search",
    tabListProps: {
      centered: true,
    },
  });

  return (
    <>
      <Logo />
      <Tabs />
    </>
  );
}

const tabs: TabItem[] = [
  {
    id: "search",
    label: "도서 검색",
    component: <SearchBooks />,
  },
  {
    id: "like",
    label: "내가 찜한 책",
    component: <LikeBooks />,
  },
];
