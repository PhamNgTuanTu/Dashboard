import PropTypes from "prop-types";
import React from "react";
import { Col, Row, Table } from "reactstrap";

View.propTypes = {
  data: PropTypes.object,
};
View.defaultProps = {
  data: null,
};

function View(props) {
  const { data } = props;
  const getTotalPrice = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += Number(data[i].import_unit_price * data[i].quantity);
    }
    return total;
  };
  return (
    <div
      className="modal fade"
      id="viewInfoware"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Chi tiết phiếu nhập
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <Row>
              <Col md="12">
                {data ? (
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>Hình Thức :</td>
                        <td colSpan="3">
                          <strong>
                            {data.formality === 1 ? "Nhập hàng" : "Đổi trả"}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Trạng thái :</td>
                        <td colSpan="3">
                          <strong>
                            {data.status === 1 ? "Đã nhập kho" : "Đã hủy"}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Nhà cung cấp :</td>
                        <td colSpan="3">{data.supplier}</td>
                      </tr>
                      <tr>
                        <td>Tổng tiền nhập :</td>
                        <td colSpan="3">
                          {data.total.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td>Ghi chú :</td>
                        <td colSpan="3">{data.note}</td>
                      </tr>
                      <tr>
                        <td>Ngày tạo :</td>
                        <td colSpan="3">{data.created_at}</td>
                      </tr>
                      <tr>
                        <th colSpan="6" style={{ textAlign: "center" }}>
                          Danh sách sách nhập kho
                        </th>
                      </tr>
                      <tr>
                        <td></td>
                        <th scope="row">#</th>
                        <td>Tên Sách</td>
                        <td>Số lượng nhập</td>
                        <td>Giá nhập</td>
                        <td>Tổng tiền</td>
                        <td></td>
                      </tr>
                      {data.items.length > 0
                        ? data.items.map((val, i) => {
                            return (
                              <React.Fragment key={i}>
                                <tr>
                                  <td></td>
                                  <th scope="row">{i + 1}</th>
                                  <td>{val.book}</td>
                                  <td>{val.quantity}</td>
                                  <td>
                                    {val.import_unit_price.toLocaleString(
                                      "it-IT",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                      }
                                    )}
                                  </td>
                                  <td>
                                    {Number(
                                      val.quantity * val.import_unit_price
                                    ).toLocaleString("it-IT", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </td>
                                  <td></td>
                                </tr>
                              </React.Fragment>
                            );
                          })
                        : null}
                      <tr>
                        <td></td>
                        <th scope="row" colSpan="2">
                          Tổng cộng
                        </th>
                        <td colSpan="4">
                          {getTotalPrice(data.items).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ) : null}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
