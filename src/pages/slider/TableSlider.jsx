import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";


Table.propTypes = {
  onRemoveClick: PropTypes.func,
  onEditClick: PropTypes.func,
  searchValue: PropTypes.string,
  suppliers: PropTypes.array,
  onViewClick: PropTypes.func,
};

Table.defaultProps = {
  onRemoveClick: null,
  onEditClick: null,
  searchValue: "",
  suppliers: null,
  onViewClick: null,
};

function Table(props) {
  let { slider } = props;

  slider.sort((a, b) => b.id - a.id);

  const { loadingPage } = useSelector((state) => state.slider);

  const { onRemoveClick, onEditClick, searchValue } = props;

  const handleRemoveClick = (supplier) => {
    if (onRemoveClick) onRemoveClick(supplier);
  };
  const handleEditClick = (supplier) => {
    if (onEditClick) onEditClick(supplier);
  };

  //search
  if (searchValue.length > 0) {
    slider = slider.filter((i) => {
      return i.book.name.toLowerCase().match(searchValue.toLowerCase());
    });
  }

  const formatDate = (date) => {
    let dateResult = moment(date, "YYYY-MM-DD");
    return dateResult.format("DD/MM/YYYY");
  };

  return (
    <div className="table-responsive">
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
            <th scope="col">Ngày bắt đầu khuyến mãi</th>
            <th scope="col">Ngày kết thúc khuyến mãi</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {slider.map((slider, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{slider.book.name}</td>
                <td>{formatDate(slider.start_date)}</td>
                <td>{formatDate(slider.end_date)}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/${slider.image}`}
                    alt="Đang tải ..."
                    height={100}
                    width="auto"
                  />
                </td>
                <td className="min-width-170">
                  <button
                    onClick={() => handleEditClick(slider.id)}
                    type="button"
                    className="btn btn-success mr-2"
                  >
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button
                    onClick={() => handleRemoveClick(slider.id)}
                    type="button"
                    className="btn btn-danger mr-2"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
