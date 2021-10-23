import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";

Table.propTypes = {
  onRemoveClick: PropTypes.func,
  onEditClick: PropTypes.func,
  searchValue: PropTypes.string,
  discount: PropTypes.array,
  onViewClick: PropTypes.func,
};

Table.defaultProps = {
  onRemoveClick: null,
  onEditClick: null,
  searchValue: "",
  discount: null,
  onViewClick: null,
};

function Table(props) {
  let { discount, params } = props;

  const { loadingPage } = useSelector((state) => state.discount);

  const { onRemoveClick, onEditClick } = props;

  const handleRemoveClick = (dis) => {
    if (onRemoveClick) onRemoveClick(dis);
  };
  const handleEditClick = (dis) => {
    if (onEditClick) onEditClick(dis);
  };

  //search
  if (params.name !== "") {
    discount = discount.filter((i) => {
      return i.book.name === params.name;
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
            <th scope="col">Tên sách</th>
            <th scope="col">Mức giảm giá</th>
            <th scope="col">Số lượng sách còn lại</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {discount.map((dis, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{dis.book.name}</td>
                <td>
                  <Badge color="primary">{dis.percent}%</Badge>
                </td>
                <td>{dis.quantity}</td>
                <td>
                  <button
                    onClick={() => handleRemoveClick(dis.id)}
                    type="button"
                    disabled={false}
                    className="btn btn-danger mr-2"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                  <button
                    onClick={() => handleEditClick(dis.id)}
                    type="button"
                    disabled={false}
                    className="btn btn-success"
                  >
                    <i className="bx bx-edit"></i>
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
