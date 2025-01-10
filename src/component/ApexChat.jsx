import { useState, useRef, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import FullScreen from "../assets/FullScreenIcon";
import PlusIcon from "../assets/PlusIcon";

// Function to generate random data
const generateRandomData = (startDate, numDays) => {
  const data = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < numDays; i++) {
    const randomValue = Math.floor(Math.random() * 100) + 1; // Random value between 1 and 100
    data.push([new Date(currentDate), randomValue]);

    // Increment date by 1 day
    currentDate.setDate(currentDate.getDate() + 2);
  }

  return data;
};

const ApexChartComponents = () => {
  const allData = generateRandomData("2024-01-01", 200);
  const chartContainerRef = useRef(null);

  const [filteredData, setFilteredData] = useState(allData); // Default to all data
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isActive, setIsActive] = useState("6m");

  const [isChartData, setIsChartData] = useState({
    series: [
      {
        name: "Flies",
        data: filteredData,
      },
    ],
    options: {
      chart: {
        id: "chart2",
        type: "line",
        height: 300,
        toolbar: {
          show: false,
          tools: {
            download: true, // Allows downloading the chart
          },
        },
      },
      colors: ["#4B40EE"],
      stroke: {
        width: 2,
        curve: "straight", // Smooth curve for the line
        shadow: {
          enabled: true,
          color: "#4B40EE", // Line shadow color
          blur: 5, // Blur effect
          opacity: 0.8, // Shadow opacity
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 0,
      },
      grid: {
        show: false, // Hide all gridlines
      },
      yaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          show: false,
        },
      },
    },
  });

  // Full-Screen Toggle
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      chartContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const filterData = (type) => {
    setIsActive(type);
    const now = new Date();
    let filtered;

    if (type === "1d") {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(now.getDate() - 1);
      filtered = allData.filter(([date]) => date >= oneDayAgo);
    } else if (type === "3d") {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(now.getDate() - 3);
      filtered = allData.filter(([date]) => date >= threeDaysAgo);
    } else if (type === "1w") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = allData.filter(([date]) => date >= oneWeekAgo);
    } else if (type === "1m") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filtered = allData.filter(([date]) => date >= oneMonthAgo);
    } else if (type === "6m") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      filtered = allData.filter(([date]) => date >= sixMonthsAgo);
    } else if (type === "1y") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      filtered = allData.filter(([date]) => date >= oneYearAgo);
    } else {
      filtered = allData; // Default to all data
    }

    setFilteredData(filtered);
    setIsChartData((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: filtered,
        },
      ],
    }));
  };

  const filterOptions = [
    { label: "1d", value: "1d" },
    { label: "3d", value: "3d" },
    { label: "1w", value: "1w" },
    { label: "1m", value: "1m" },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "max", value: "max" },
  ];

  // Set default filter to 1 month data
  useEffect(() => {
    filterData("1m");
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className={`relative bg-white ${isFullScreen ? "p-10" : ""}`}
    >
      {/* Chart Header */}
      <div className="flex justify-between items-center gap-4 mb-10 flex-wrap">
        <div className="flex items-center justify-start w-full sm:w-auto gap-5 mb-4 sm:mb-0">
          <button
            className="flex items-center gap-2 text-base md:text-lg font-normal"
            onClick={toggleFullScreen}
          >
            <FullScreen />
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}
          </button>
          <button className="flex items-center gap-2 text-base md:text-lg font-normal">
            <PlusIcon />
            Compare
          </button>
        </div>

        <div className="flex items-center justify-start w-full sm:w-auto gap-3 md:gap-5">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`text-base md:text-lg font-normal ${
                isActive === option.value
                  ? "text-[#fff] bg-[#4B40EE] rounded px-3 py-1"
                  : "text-[#6F7177]"
              }`}
              onClick={() => filterData(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ReactApexChart
        options={isChartData.options}
        series={isChartData.series}
        type="line"
        height={isFullScreen ? 600 : 300} // Adjust chart height for full-screen mode
      />
    </div>
  );
};

export default ApexChartComponents;
