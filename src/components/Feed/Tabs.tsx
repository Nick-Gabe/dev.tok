import { useTranslation } from "react-i18next";

const tabs = ["popular", "for_you", "latest"] as const;
export type Tab = (typeof tabs)[number];

type TabsProps = {
  selectedTab: Tab;
  onSelectTab: (tab: Tab) => void;
};

export const Tabs = ({ onSelectTab, selectedTab }: TabsProps) => {
  const { t } = useTranslation();

  return (
    <div role="tablist" className="tabs tabs-border fixed top-4 z-40">
      {tabs.map((tab) => (
        <a
          key={tab}
          role="tab"
          className={`tab text-white w-28 ${
            selectedTab === tab ? "tab-active" : ""
          }`}
          style={{
            textShadow: "0 0 2px rgba(0, 0, 0, 1)",
          }}
          onClick={() => onSelectTab(tab)}
        >
          {t(`tabs.${tab}`)}
        </a>
      ))}
    </div>
  );
};
