import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";

TablePane.propTypes = {
  onRemoveClick: PropTypes.func,
  onEditClick: PropTypes.func,
  searchValue: PropTypes.string,
  order: PropTypes.array,
  onViewClick: PropTypes.func,
};

TablePane.defaultProps = {
  onRemoveClick: null,
  onEditClick: null,
  searchValue: "",
  order: null,
  onViewClick: null,
};

function TablePane(props) {
  let { order, params, loading } = props;

  //search
  // if (params.name !== "") {
  //   order = order.filter((i) => {
  //     return i.name.toLowerCase().match(params.name.toLowerCase());
  //   });
  // }
  // if (params.phone !== "") {
  //   order = order.filter((i) => {
  //     return i.phone.toLowerCase().match(params.phone.toLowerCase());
  //   });
  // }
  // if (params.status !== "") {
  //   order = order.filter((i) => {
  //     return Number(i.status) === Number(params.status);
  //   });
  // }

  return (
    <>
      {loading ? (
        <table className="tg">
          <tbody>
            <tr>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
            </tr>
            <tr>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
      <table
        className={loading ? "d-none" : "table table-hover table-bordered"}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên khách hành</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Phí vận chuyển</th>
            <th scope="col">Tổng giá sách</th>
            <th scope="col">Tổng cộng</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {order.length > 0 ? (
            order.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{val.name}</td>
                  <td>{val.phone}</td>
                  <td>
                    {val.shipping_fee.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {val.total.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {val.total_payment.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {val.status === 1 ? (
                      <Badge color="primary">Chờ xác nhận</Badge>
                    ) : null}
                    {val.status === 2 ? (
                      <Badge color="primary">Đã xác nhận</Badge>
                    ) : null}
                  </td>
                  <td>
                  <button
                    // onClick={() => handleViewClick(ware.id)}
                    type="button"
                    className="btn btn-primary mr-2"
                  >
                    <i className="bx bx-detail"></i>
                  </button>
                </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td style={{ textAlign: "center" }} colSpan="7">
                Không tồn tại đơn hàng
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TablePane;
