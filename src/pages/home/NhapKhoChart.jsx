import React from "react";

import ReactApexChart from "react-apexcharts";

const NhapKhoChart = (props) => {
  const { data } = props;
  const today = new Date();
  let arrNhapHang = JSON.parse(data["import"]).map((i) => Number(i));
  let arrTraHang = JSON.parse(data["reimport"]).map((i) => Number(i));
  let arrNhapHangFormat = [];
  let arrTraHangFormat = [];
  for (let i = 0; i < today.getMonth() + 1; i++) {
    arrNhapHangFormat.push(arrNhapHang[i])
    arrTraHangFormat.push(arrTraHang[i])
  }
  
  const series = [
    {
      name: "Nhập hàng",
      data: arrNhapHangFormat,
    },
    {
      name: "Trả hàng ",
      data: arrTraHangFormat,
    },
  ];

  const options = {
    chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
    colors: ["#28a745", "#dc3545"],
    dataLabels: { enabled: !0 },
    stroke: { width: [3, 3], curve: "straight" },
    title: { text: "SL", align: "left" },
    grid: {
      row: { colors: ["transparent", "transparent"], opacity: 0.2 },
      borderColor: "#f1f1f1",
    },
    markers: { style: "inverted", size: 6 },
    xaxis: {
      categories: [
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
      ],
      title: { text: "" },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: !0,
      offsetY: -25,
      offsetX: -5,
    },
    responsive: [
      {
        breakpoint: 600,
        options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="380"
      // className="apexcharts-canvas apexchartscq310u9c apexcharts-theme-light"
    />
  );
};

export default NhapKhoChart;
