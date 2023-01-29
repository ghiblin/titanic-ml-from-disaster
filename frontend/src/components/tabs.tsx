import React from "react";
import Tab from "./tab";

interface TabsProps {
  tabs: {
    label: string;
    name: string;
    content: React.ReactNode;
  }[];
}
export default function Tabs({ tabs }: TabsProps) {
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);
  function selectTab(name: string) {
    const newTab = tabs.find((tab) => tab.name === name);
    if (newTab) {
      setCurrentTab(newTab);
    }
  }

  return (
    <>
      <ul
        className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        id="tabs-tab"
        role="tablist"
      >
        {tabs.map(({ name, label }, idx) => (
          <Tab
            key={name}
            name={name}
            label={label}
            onSelect={selectTab}
            active={name === currentTab.name}
          />
        ))}
      </ul>
      <div className="tab-content">{currentTab.content}</div>
    </>
  );
}
