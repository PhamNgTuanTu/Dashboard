import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";

Table.propTypes = {
  onRemoveClick: PropTypes.func,
  onEditClick: PropTypes.func,
  searchValue: PropTypes.string,
  warehouse: PropTypes.array,
  onViewClick: PropTypes.func,
};

Table.defaultProps = {
  onRemoveClick: null,
  onEditClick: null,
  searchValue: "",
  warehouse: null,
  onViewClick: null,
};

function Table(props) {
  let { warehouse, params } = props;

  const { loadingPage } = useSelector((state) => state.warehouse);

  const { onRemoveClick, onEditClick, onViewClick } = props;

  const handleRemoveClick = (ware) => {
    if (onRemoveClick) onRemoveClick(ware);
  };
  const handleEditClick = (ware) => {
    if (onEditClick) onEditClick(ware);
  };
  const handleViewClick = (ware) => {
    if (onViewClick) onViewClick(ware);
  };


  //search
  if (params.status !== "") {
    warehouse = warehouse.filter((i) => {
      return Number(i.status) === Number(params.status);
    });
  }
  if (params.hinh_thuc !== "") {
    warehouse = warehouse.filter((i) => {
      return Number(i.formality) === Number(params.hinh_thuc);
    });
  }
  if (params.nha_cung_cap !== "") {
    warehouse = warehouse.filter((i) => {
      return i.supplier.toLowerCase().match(params.nha_cung_cap.toLowerCase());
    });
  }

  return (
    <>
      {loadingPage ? (
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
        className={loadingPage ? "d-none" : "table table-hover table-bordered"}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hình thức</th>
            <th scope="col">Người tạo</th>
            <th scope="col">Nhà cung cấp</th>
            <th scope="col">Tổng giá nhập</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {warehouse.map((ware, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {ware.formality === 1 ? (
                    <Badge color="primary">Nhập mới</Badge>
                  ) : (
                    <Badge color="secondary">Trả hàng</Badge>
                  )}
                </td>
                <td>{ware.by_admin}</td>
                <td>{ware.supplier}</td>
                <td>
                  {ware.total.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>
                  {ware.status === 1 ? (
                    <Badge color="success">Đã nhập kho</Badge>
                  ) : (
                    <Badge color="light">Đã hủy</Badge>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveClick(ware.id)}
                    type="button"
                    disabled={ware.status === 1 ? false : true}
                    className="btn btn-danger mr-2"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                  <button
                    onClick={() => handleViewClick(ware.id)}
                    type="button"
                    className="btn btn-primary mr-2"
                  >
                    <i className="bx bx-show"></i>
                  </button>
                  <button
                    onClick={() => handleEditClick(ware.id)}
                    type="button"
                    disabled={ware.status === 1 ? true : false}
                    className="btn btn-success"
                  >
                    <i className="bx bx-reset"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
