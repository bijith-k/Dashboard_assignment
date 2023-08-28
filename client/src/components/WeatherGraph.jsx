import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const WeatherGraph = ({ dayRange, selectedSerialNo, clicked }) => {
const [weatherData, setWeatherData] = useState([]);

  console.log(dayRange);
  const dateFromObject = new Date(
    dayRange?.from?.year,
    dayRange?.from?.month - 1,
    dayRange?.from?.day
  );
  const dateToObject = new Date(
    dayRange?.to?.year,
    dayRange?.to?.month - 1,
    dayRange?.to?.day
  );
  console.log(dateFromObject);
  const unixTimestampFrom = dateFromObject?.getTime();
  const unixTimestampTo = dateToObject?.getTime();

const fromDateString = `${dayRange?.from?.year}-${String(dayRange?.from?.month).padStart(
  2,
  "0"
)}-${String(dayRange?.from?.day).padStart(2, "0")}T00:00:00`;
const toDateString = `${dayRange?.to?.year}-${String(dayRange?.to?.month).padStart(2, "0")}-${String(
  dayRange?.to?.day
).padStart(2, "0")}T23:59:59`;

// URL-encode date-time strings
const fromEncoded = encodeURIComponent(fromDateString);
const toEncoded = encodeURIComponent(toDateString);
 const dateObjects = weatherData?.map((data) => {
   const [datePart, timePart] = data.TimeStamp.split(" ");
   const [day, month, year] = datePart.split("-");
   const [hours, minutes] = timePart.split(":");
   return new Date(year, month - 1, day, hours, minutes);
 });

 console.log(dateObjects)

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
      categories: dateObjects,
      // labels: {
      //   datetimeFormatter: {
      //     year: "yyyy",
      //     month: "MMM 'yy",
      //     day: "dd MMM",
      //     hour: "HH:mm",
      //   },
      // },
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
      data: weatherData?.map((data) => data.temp),
    },
    {
      name: "humidity",
      data: weatherData?.map((data) => data.humidity),
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

  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}getTempAndHumidity`,
        {
          params: {
            from: dayRange?.from,
            to: dayRange?.to,
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