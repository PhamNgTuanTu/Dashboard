import React from "react";
import { Bar } from "react-chartjs-2";

const TotalUserChart = (props) => {
  const { data } = props;
  const arrayMonth = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]
  const today = new Date();
  let arrUser = [];
  let arrMonthFormat = [];
  for (let i = 0; i < today.getMonth() + 1; i++) {
    arrUser.push(data[i])
    arrMonthFormat.push(arrayMonth[i])
  }
  const dataMonth = {
    labels: arrMonthFormat,
    datasets: [
      {
        label: "Số lượng người dùng đăng ký mới",
        backgroundColor: "rgba(52, 195, 143, 0.8)",
        borderColor: "rgba(52, 195, 143, 0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
        hoverBorderColor: "rgba(52, 195, 143, 0.9)",
        data: data,
      },
    ],
  };

  return <Bar width={474} height={300} data={dataMonth} />;
};

export default TotalUserChart;
