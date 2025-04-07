import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { Card, CardContent } from "@mui/material";

const FinancialOverview = () => {
  const options = {
    series: [44, 55, 41, 17, 15],
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <Card>
      <CardContent>
        <Chart
          options={options}
          series={options.series}
          type="donut"
          height={350}
          width={320}
        />
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
