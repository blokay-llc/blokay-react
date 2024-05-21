import { useState } from "react";
import { AppIcon } from "./Index";
const AppTabs = ({ tabs, defaultTab = 0 }: any) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  return (
    <div>
      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2 overflow-x-scroll">
        {tabs.map((t: any, index: number) => (
          <div
            onClick={() => {
              setSelectedTab(index);
            }}
            key={index}
            className={`p-1 rounded-lg border-2 cursor-pointer  border-transparent flex gap-3 items-center ${
              index === selectedTab
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100 hover:border-gray-200 "
            }`}
          >
            {t.icon ? (
              <AppIcon
                className="w-6 h-6"
                icon={t.icon}
                style={index === selectedTab ? { fill: "white" } : {}}
              />
            ) : null}

            <div>{t.title}</div>
          </div>
        ))}
      </div>

      <div className="mt-5">{tabs[selectedTab].render}</div>
    </div>
  );
};

export default AppTabs;
