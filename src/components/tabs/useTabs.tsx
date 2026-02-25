import { Box, Tab } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export type TabItem = {
  id: string; //value
  label: string;
  component: ReactNode;
  tabProps?: Parameters<typeof Tab>[0];
  tabPanelProps?: Parameters<typeof TabPanel>[0];
};

export type UseTabsProps = {
  tabs: TabItem[];
  selectedTab?: UseTabsProps["tabs"][number]["id"];
  onChange?: (event: SyntheticEvent, newValue: string) => void;
  tabListBoxProps?: Parameters<typeof Box>[0];
  tabListProps?: Parameters<typeof TabList>[0];
};

export function useTabs({
  tabs,
  selectedTab,
  tabListBoxProps,
  tabListProps,
  onChange,
}: UseTabsProps) {
  const [selectedId, setSelectedId] = useState(selectedTab || "");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    onChange?.(e, newValue);
    setSelectedId(newValue);
  };
  const Tabs = () => {
    return (
      <TabContext value={selectedId}>
        <Box
          {...(tabListBoxProps || {})}
          className={`tabs-list-container ${tabListBoxProps?.className || ""}`}
        >
          <TabList
            {...(tabListProps || {})}
            sx={{
              "& .MuiTabs-indicator": {
                height: "1px", // 선택 사항 border 얇게 만들기
                backgroundColor: "var(--primary)",
              },
              ...(tabListProps?.sx || {}),
            }}
            onChange={handleChange}
          >
            {tabs?.map(({ label, id, tabProps }) => (
              <Tab key={id} {...tabProps} label={label} value={id} />
            ))}
          </TabList>
        </Box>
        <Box className="tabs-panel-container">
          {tabs?.map(({ component, id, tabPanelProps }) => (
            <TabPanel key={id} {...tabPanelProps} value={id}>
              {component}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    );
  };

  return {
    Tabs,
    selectedId,
  };
}
