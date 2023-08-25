import React from 'react'
import DataTable, { createTheme } from "react-data-table-component";


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

const SummaryData = () => {

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];


  return (
    <div className="mt-10 w-screen flex flex-col">
      <div className="flex flex-col md:flex-row justify-center gap-20 w-5/6  mx-auto">
        <div className="bg-blue-300 h-fit md:w-1/3 rounded-2xl">
          <p className="text-center font-bold pt-3">Capacity</p>
          <p className="text-center text-5xl font-bold pt-3 pb-5">1878</p>
        </div>
        <div className="bg-blue-500 h-fit md:w-1/3 rounded-2xl">
          <p className="text-center font-bold pt-3">Units</p>
          <p className="text-center text-5xl font-bold pt-3 pb-5">190.5633</p>
        </div>
        <div className="bg-blue-900 h-fit md:w-1/3 rounded-2xl">
          <p className="text-center font-bold pt-3">Efficiency</p>
          <p className="text-center text-5xl font-bold pt-3 pb-5">40.2323</p>
        </div>
      </div>
      <div className="w-5/6 my-3 mx-auto">
        <DataTable columns={columns} data={data} theme="solarized" pagination />
      </div>
    </div>
  );
}

export default SummaryData