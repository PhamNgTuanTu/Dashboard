import React from "react";
import { Badge } from "reactstrap";

TableSachBanChay.propTypes = {};

function TableSachBanChay(props) {
  const { label, data, loading } = props;
  return (
    <div className="card h-100">
      <div className="card-header">
        <h3>{label}</h3>
        <i className="fas fa-ellipsis-h" />
      </div>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sách</th>
              <th style={{ textAlign: "center" }}>Số lượng bán</th>
              <th style={{ textAlign: "center" }}>Số lượng tồn</th>
            </tr>
          </thead>
          {loading ? (
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
              </tr>
            </tbody>
          ) : (
            <tbody>
              {data
                ? data.map((val, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{val.name}</td>
                        <td style={{ textAlign: "center" }}>
                          <Badge style={{ fontSize: "18px" }} color="success">
                            {val.sold}
                          </Badge>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Badge color="primary">{val.quantity_in_stock}</Badge>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default TableSachBanChay;
