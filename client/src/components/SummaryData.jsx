import axios from "axios";
import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Spinner, useToast } from "@chakra-ui/react";

createTheme(
  "solarized",
  {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      whiteSpace: "unset", // allow text to wrap
      overflow: "visible", // prevent overflow
    },
  },
};

const SummaryData = ({ dayRange, clicked, selectedCity }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.Capacity,
      sortable: true,
    },
    {
      name: "Efficiency",
      selector: (row) => row.Efficiency,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: "Units",
      selector: (row) => row.Units,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
      width: "400px",
      cell: (row) => <span>{row.Description}</span>,
    },
    {
      name: "Recommendation",
      selector: (row) => row.Recommendation,
      sortable: true,
      width: "400px",
      cell: (row) => <span>{row.Recommendation}</span>,
    },
    {
      name: "Date",
      selector: (row) => {
        const dateObject = new Date(row.Date);
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return dateObject.toLocaleString("en-US", options);
      },
      sortable: true,
    },
  ];

  const [data, setData] = useState([]);

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
        `${import.meta.env.VITE_BASE_URL}equipments-data`,
        {
          params: {
            from,
            to,
            city: selectedCity,
          },
        }
      );

      if (data.success) {
        setLoading(false);
        setData(data.equipments);
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [clicked, selectedCity]);

  const sumCapacity = data?.reduce((sum, item) => sum + item.Capacity, 0);
  const sumUnits = data?.reduce((sum, item) => sum + item.Units, 0);
  const sumEfficiency = data?.reduce((sum, item) => sum + item.Efficiency, 0);

  return (
    <div className="mt-10 w-screen flex flex-col">
      <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20 w-5/6  mx-auto">
        <div className="bg-blue-300 h-fit md:w-1/3 rounded-2xl">
          <p className="text-center font-bold pt-3">Capacity</p>
          <p className="text-center text-5xl font-bold pt-3 pb-5">
            {sumCapacity ? sumCapacity : 0}
          </p>
        </div>
        <div className="bg-blue-500 h-fit md:w-1/3 rounded-2xl">
          <p className="text-center font-bold pt-3">Units</p>
          <p className="text-center text-5xl font-bold pt-3 pb-5">
            {sumUnits ? sumUnits.toFixed(4) : 0}
          </p>
        </div>
        <div className="bg-blue-300 h-fit md:w-1/3 rounded-2xl">
          <p className="text-center font-bold pt-3">Efficiency</p>
          <p className="text-center text-5xl font-bold pt-3 pb-5">
            {sumEfficiency ? sumEfficiency.toFixed(4) : 0}
          </p>
        </div>
      </div>
      <div className="w-full mt-3 h-full">
        {loading ? (
          <div className="flex flex-col items-center gap-4 overflow-y-hidden mt-2">
            <p className="font-semibold text-xl "> Table is loading... </p>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            theme="solarized"
            customStyles={customStyles}
            pagination
          />
        )}
      </div>
    </div>
  );
};

export default SummaryData;
