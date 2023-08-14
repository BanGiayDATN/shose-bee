import React from "react";
// import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Ngày 1", "Ngày 2", "Ngày 3" /* ... */, , "Ngày cuối cùng"],
  datasets: [
    {
      label: "Số lượng hóa đơn bán được",
      data: [10, 15, 20 /* ... */, , 8],
      backgroundColor: "rgba(75,192,192,0.4)", // Màu nền của cột
      borderColor: "rgba(75,192,192,1)", // Màu viền của cột
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const SalesChart = () => {
  return <div>{/* <Bar data={data} options={options} /> */}</div>;
};

export default SalesChart;
