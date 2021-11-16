import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = (props) => {
  const { data } = props;
  // console.log("data: ", data);
  const totalData = (data) => {
    let total = 0;
    data.forEach((element) => {
      total += Number(element);
    });
    return total;
  };
  const series = data;

  const options = {
    labels: [
      "Chờ xác nhận",
      "Đã xác nhận",
      "Đang vận chuyển",
      "Hoàn thành",
      "Thất bại/ đã hủy",
    ],
    colors: ["#ffc107", "#007bff", "#6c757d", "#28a745", "#dc3545"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <>
      {totalData(data) > 0 ? (
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          height="380"
        />
      ) : (
        <div className="mt-3">
          <h5>Không tồn tại đơn hàng.</h5>
        </div>
      )}
    </>
  );
};

export default PieChart;
