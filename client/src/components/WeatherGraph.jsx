import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeatherGraph = ({ dayRange, selectedSerialNo, clicked }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
      if (data.success) {
        setLoading(false);
        setWeatherData(data.weatherData);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [clicked, selectedSerialNo]);

  const [temp, setTemp] = useState(true)
  const [humidity, setHumidity] = useState(true)

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {formatDate(payload.value)}
        </text>
      </g>
    );
  };

  return (
    <div className="flex justify-center h-full mt-16">
      {loading ? (
        <div className="flex flex-col items-center gap-4 overflow-y-hidden">
          <p className="font-semibold text-xl "> Graph is loading... </p>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <div width="100%" height="100%">
          <AreaChart
            width={chartWidth}
            height={400}
            data={weatherData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="TimeStamp" tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            {humidity && (
              <Area
                type="monotone"
                dataKey="humidity"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
            )}
            {temp && (
              <Area
                type="monotone"
                dataKey="temp"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            )}
          </AreaChart>
          <div className="flex justify-center gap-5 pb-10 pt-4">
            <button
              className={`bg-green-500 p-2 text-white rounded-md ${
                temp ? "opacity-100" : "opacity-70"
              }`}
              onClick={() => setTemp(!temp)}
            >
              temp
            </button>
            <button
              className={`bg-blue-500 p-2 text-white rounded-md ${
                humidity ? "opacity-100" : "opacity-70"
              }`}
              onClick={() => setHumidity(!humidity)}
            >
              humidity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherGraph;
