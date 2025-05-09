import { Card } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ title, subtitle, width, height, color }) => {
  // Sample data based on your `series.monthDataSeries1`
  const series = [
    {
      name: "STOCK ABC",
      data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
    },
  ];

  const dates = [
    "2023-01-01",
    "2023-01-02",
    "2023-01-03",
    "2023-01-04",
    "2023-01-05",
    "2023-01-06",
    "2023-01-07",
    "2023-01-08",
    "2023-01-09",
    "2023-01-10",
    "2023-01-11",
  ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: title,
      align: "left",
    },
    subtitle: {
      text: subtitle,
      align: "left",
    },
    labels: dates,
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#898989",
      },
    },
  };

  return (
    <Card
      sx={{
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        flexGrow: "1",
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        width={width}
        height={height}
      />
    </Card>
  );
};

export default AreaChart;
