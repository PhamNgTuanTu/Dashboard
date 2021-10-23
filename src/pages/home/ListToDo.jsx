import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";

ListToDo.propTypes = {};

function ListToDo(props) {
  const { storeDataOrder, loading } = props;
  const countValue = (data, id) => {
    let arr = [];
    if (data && JSON.stringify(data) !== "[]") {
      data.forEach((val, i) => {
        if (Number(val.status) === Number(id)) {
          arr.push(val);
        }
      });
    }
    return arr.length;
  };

  return (
    <div className="row mb-3">
      <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mb-3">
        <Link to={`/order?loai=cho-xac-nhan`} className="link_home">
          <div className="counter bg-warning">
            <p>
              <i className="fas fa-spinner" />
            </p>
            {loading ? (
              <Spinner color="light" className="mt-1 mb-1"/>
            ) : (
              <h3>
                {countValue(storeDataOrder, 1) > 99
                  ? "99+"
                  : countValue(storeDataOrder, 1)}
              </h3>
            )}
            <p>Chờ xác nhận</p>
          </div>
        </Link>
      </div>
      <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mb-3">
        <Link to={`/order?loai=da-xac-nhan`} className="link_home-1">
          <div className="counter bg-primary">
            <p>
              <i className="fas fa-tasks" />
            </p>
            {loading ? (
              <Spinner color="light" className="mt-1 mb-1"/>
            ) : (
              <h3>
                {countValue(storeDataOrder, 2) > 99
                  ? "99+"
                  : countValue(storeDataOrder, 2)}
              </h3>
            )}
            <p>Đã xác nhận</p>
          </div>
        </Link>
      </div>
      <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mb-3">
        <Link to={`/order?loai=dang-van-chuyen`} className="link_home-2">
          <div className="counter bg-light-custom">
            <p>
              <i className="fas fa-bug" />
            </p>
            {loading ? (
              <Spinner color="light" className="mt-1 mb-1"/>
            ) : (
              <h3>
                {countValue(storeDataOrder, 3) > 99
                  ? "99+"
                  : countValue(storeDataOrder, 3)}
              </h3>
            )}
            <p>Đang vận chuyển</p>
          </div>
        </Link>
      </div>
      <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mb-3">
        <Link to={`/order?loai=da-hoan-thanh`} className="link_home-3">
          <div className="counter bg-success">
            <p>
              <i className="fas fa-check-circle" />
            </p>
            {loading ? (
              <Spinner color="light" className="mt-1 mb-1"/>
            ) : (
              <h3>
                {countValue(storeDataOrder, 4) > 99
                  ? "99+"
                  : countValue(storeDataOrder, 4)}
              </h3>
            )}
            <p>Đơn hoàn thành</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ListToDo;
