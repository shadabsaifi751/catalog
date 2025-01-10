import { useState } from "react";
import ApexChartComponents from "./ApexChat";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Chart");

  const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

  const tabHandle = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="px-3 sm:px-10 md:px-20 lg:px-40 pb-10 sm:pb-15 pt-10">
      <h1 className="font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A243A] flex items-start mb-2">
        63,179.71
        <span className="text-xl sm:text-2xl font-normal text-[#BDBEBF]">
          USD
        </span>
      </h1>
      <p className="text-[#67BF6B] text-base sm:text-lg font-normal mb-6 sm:mb-10">
        + 2,161.42 (3.54%)
      </p>

      <div className="space-x-3 sm:space-x-6 md:space-x-8 mb-10 sm:mb-16">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-base sm:text-lg font-normal transition-all duration-300 ease-in-out pb-1 ${
              activeTab === tab
                ? "text-[#1A243A] border-b-2 border-[#4B40EE] transform scale-105"
                : "text-[#6F7177]"
            }`}
            onClick={() => tabHandle(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-container">
        {activeTab === "Chart" ? <ApexChartComponents /> : ""}
      </div>
    </div>
  );
};

export default Home;
