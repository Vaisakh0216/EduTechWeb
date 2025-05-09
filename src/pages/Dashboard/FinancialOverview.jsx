import { Card } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ title, subtitle }) => {
  const series = [25, 15, 44, 55, 41, 17];

  const options = {
    chart: {
      type: "pie",
    },
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    theme: {
      monochrome: {
        enabled: true,
        color: "#898989",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      formatter: function (val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
    title: {
      text: title,
      align: "left",
    },
    subtitle: {
      text: subtitle,
      align: "left",
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
        type="pie"
        width={490}
      />
    </Card>
  );
};

export default PieChart;
