import PropTypes from "prop-types";
import React from "react";
import {
  Badge,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

View.propTypes = {
  data: PropTypes.object,
};
View.defaultProps = {
  data: null,
};

function View(props) {
  const { modal, setModal, arrChoose, onDeleteClick, onUpdateClick } = props;
  const toggle = () => setModal(!modal);

  const handelDelete = (id) => {
    if (onDeleteClick) onDeleteClick(id);
  };
  
  const handleUpdateStatus = (id, status) => {
    if (onUpdateClick) onUpdateClick(id, status);
  };

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} tag="h4">
        Xem chi tiết đơn hàng
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="12">
            <Table borderless>
              <tbody>
                <tr>
                  <th scope="row">Tên</th>
                  <td>{arrChoose ? arrChoose.name : null}</td>
                </tr>
                <tr>
                  <th scope="row">Số điện thoại</th>
                  <td>{arrChoose ? arrChoose.phone : null}</td>
                </tr>
                <tr>
                  <th scope="row">Địa chỉ</th>
                  <td>{arrChoose ? arrChoose.address : null}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{arrChoose ? arrChoose.user : null}</td>
                </tr>
                <tr>
                  <th scope="row">Ghi chú</th>
                  <td>{arrChoose ? arrChoose.note : null}</td>
                </tr>
                {arrChoose ? (
                  <tr>
                    <th scope="row">Trạng thái đơn</th>
                    {arrChoose.status === 1 ? (
                      <td>
                        <Badge color="primary">Chờ xác nhận</Badge>
                      </td>
                    ) : null}
                    {arrChoose.status === 2 ? (
                      <td>
                        <Badge color="success">Đã xác nhận</Badge>
                      </td>
                    ) : null}
                    {arrChoose.status === 3 ? (
                      <td>
                        <Badge color="light">Đang giao</Badge>
                      </td>
                    ) : null}
                    {arrChoose.status === 4 ? (
                      <td>
                        <Badge color="success">Hoàn thành</Badge>
                      </td>
                    ) : null}
                    {arrChoose.status === 5 ? (
                      <td>
                        <Badge color="danger">Giao thất bại</Badge>
                      </td>
                    ) : null}
                  </tr>
                ) : null}
                <tr>
                  <th scope="row">Thời gian tạo</th>
                  <td>{arrChoose ? arrChoose.created_at : null}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Table bordered hover>
              <thead>
                <tr>
                  <th colSpan="5">Chi tiết đơn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">#</th>
                  <th scope="row">Tên sách</th>
                  <th scope="row">Số lượng</th>
                  <th scope="row">Giá khuyến mãi</th>
                  <th scope="row">Giá gốc</th>
                </tr>
                {arrChoose && typeof arrChoose.items !== "undefined"
                  ? arrChoose.items.map((val, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{val.book}</td>
                          <td>{val.quantity}</td>
                          <td>
                            {val.sale_price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td>
                            {val.unit_price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                        </tr>
                      );
                    })
                  : null}
                <tr>
                  <th scope="row" colSpan="4">
                    Phí vận chuyển
                  </th>
                  <td>
                    {arrChoose && typeof arrChoose.shipping_fee !== "undefined"
                      ? arrChoose.shipping_fee.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      : null}
                  </td>
                </tr>
                <tr>
                  <th scope="row" colSpan="4">
                    Tổng cộng
                  </th>
                  <td>
                    {arrChoose && typeof arrChoose.shipping_fee !== "undefined"
                      ? arrChoose.total_payment.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      : null}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {arrChoose ? (
          <Row>
            <Col
              md="12"
              className="d-flex align-items-center justify-content-end "
            >
              {arrChoose.status === 5 || arrChoose.status === 4 ? null : (
                <Button
                  color="danger"
                  className="mr-2"
                  onClick={() => handelDelete(arrChoose.id)}
                >
                  Hủy đơn hàng
                </Button>
              )}
              {arrChoose.status === 1 ? (
                <Button
                  color="primary"
                  onClick={() => handleUpdateStatus(arrChoose.id, 2)}
                >
                  Tiếp nhận đơn hàng
                </Button>
              ) : null}
              {arrChoose.status === 2 ? (
                <Button
                  color="primary"
                  onClick={() => handleUpdateStatus(arrChoose.id, 3)}
                >
                  Chuyển cho đơn vị vận chuyển
                </Button>
              ) : null}
              {arrChoose.status === 3 ? (
                <Button
                  color="primary"
                  onClick={() => handleUpdateStatus(arrChoose.id, 4)}
                >
                  Hoàn tất đơn hàng
                </Button>
              ) : null}
            </Col>
          </Row>
        ) : null}
      </ModalBody>
    </Modal>
  );
}

export default View;