import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const WeatherGraph = ({ dayRange, selectedSerialNo, clicked }) => {
const [weatherData, setWeatherData] = useState([]);
 

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const series = [
    {
      name: "temp",
      data: weatherData?.map((data) => ({
        x: new Date(data.TimeStamp).getTime(),
        y: data.temp,
      })),
    },
    {
      name: "humidity",
      data: weatherData?.map((data) => ({
        x: new Date(data.TimeStamp).getTime(),
        y: data.humidity,
      })),
    },
  ];

  const [chartWidth, setChartWidth] = useState(
    window.innerWidth > 800 ? 800 : window.innerWidth
  );

  const handleWindowResize = () => {
    const newWidth = window.innerWidth > 800 ? 800 : window.innerWidth;
    setChartWidth(newWidth);
  };

  useEffect(() => {
    // Attach event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Clean up by removing event listener on unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

 

  const localFrom = dayRange?.[0];
  const localTo = dayRange?.[1];
  let from;
  let to;
  // Get the time zone offset in minutes
  if (localFrom && localTo) {
    const timeZoneOffset = localFrom?.getTimezoneOffset();

    // Adjust the local dates by subtracting the offset in minutes
    const utcFrom = new Date(localFrom?.getTime() - timeZoneOffset * 60000); // Convert offset to milliseconds
    const utcTo = new Date(localTo?.getTime() - timeZoneOffset * 60000);

    // Convert to ISO 8601 format for UTC

    from = utcFrom?.toISOString();
    to = utcTo?.toISOString();
  }
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}getTempAndHumidity`,
        {
          params: {
            from,
            to,
            serialNo: selectedSerialNo,
          },
        }
      );
      if(data.success){
         setWeatherData(data.weatherData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [clicked, selectedSerialNo]);

  return (
    <div className="flex justify-center h-full mt-16">
      <Chart
        options={options}
        series={series}
        type="area"
        width={chartWidth}
        height={350}
      />
    </div>
  );
};

export default WeatherGraph