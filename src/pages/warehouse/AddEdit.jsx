import { FastField, Field, FieldArray, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import * as Yup from "yup";
import InputFieldArrayNumber from "../../components/custom-fields/FieldArray/InputFieldArrayNumber";
import SelectFieldArray from "../../components/custom-fields/FieldArray/SelectFieldArray";
import SelectField from "../../components/custom-fields/SelectField";
import textAriaField from "../../components/custom-fields/textAriaField";

AddEdit.propTypes = {
  nameModal: PropTypes.string,
  initialValues: PropTypes.object,
};
AddEdit.defaultProps = {
  nameModal: "Thêm Sản Phẩm Vào Kho",
  initialValues: null,
};

function AddEdit(props) {
  const { initialValues, modal, setModal, dataSelect, books } = props;

  const getArrBooks = (data) => {
    let arr = [];
    if (data && JSON.stringify(data) !== "{}") {
      arr = data.map((val, i) => {
        return {
          id: val.id,
          name: val.name,
        };
      });
    }
    return arr;
  };

  const toggle = () => setModal(!modal);

  const validationSchema = Yup.object().shape({
    supplier_id: Yup.number().required("Vui lòng chọn trường này").nullable(),
    note: Yup.string().required("Vui lòng nhập trường này"),
    items: Yup.array()
      .of(
        Yup.object().shape({
          book_id: Yup.number().required("Vui lòng chọn trường này").nullable(),
          quantity: Yup.number()
            .integer("vui lòng nhập số nguyên")
            .min(1, "số lượng sách phải lớn hơn 1")
            .positive("Vui lòng nhập số dương")
            .typeError("Vui lòng nhập dạng số")
            .required("Vui lòng nhập trường này"),
          import_unit_price: Yup.number()
            .integer("vui lòng nhập số nguyên")
            .positive("Vui lòng nhập số dương")
            .typeError("Vui lòng nhập dạng số")
            .required("Vui lòng nhập trường này"),
        })
      )
      .required("Vui lòng nhập biểu mẩu này"),
  });

  const getTotalPrice = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += Number(data[i].import_unit_price * data[i].quantity);
    }
    return total;
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        Phiếu nhập kho
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          onSubmit={props.onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formikProps) => {
            const { isSubmitting, values, touched, errors } = formikProps;
            return (
              <Form>
                <FieldArray
                  name="items"
                  render={({ insert, remove, push }) => (
                    <>
                      <Row>
                        <Col md="12">
                          <Field
                            name="supplier_id"
                            component={SelectField}
                            label="Chọn Nhà Cung Cấp"
                            placeholder="Chọn Nhà Cung Cấp ... "
                            options={dataSelect.supplier}
                          />
                        </Col>
                      </Row>
                      {values.items.length > 0 &&
                        values.items.map((friend, index) => (
                          <React.Fragment key={index}>
                            <Row className="mt-3">
                              <Col md="12">
                                <Row>
                                  <Col md="12">
                                    <Field
                                      name={`items.${index}.book_id`}
                                      component={SelectFieldArray}
                                      label="Chọn Sách"
                                      placeholder="Chọn Sách ... "
                                      options={getArrBooks(books)}
                                      showError={
                                        errors &&
                                        errors[`items`] &&
                                        errors[`items`][index] &&
                                        errors[`items`][index].book_id &&
                                        touched &&
                                        touched[`items`] &&
                                        touched[`items`][index] &&
                                        touched[`items`][index].book_id
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <FastField
                                      name={`items.${index}.quantity`}
                                      component={InputFieldArrayNumber}
                                      label="Số lượng"
                                      placeholder="Nhập số lượng sách nhập kho"
                                      type="text"
                                      autoFocus={false}
                                      showError={
                                        errors &&
                                        errors[`items`] &&
                                        errors[`items`][index] &&
                                        errors[`items`][index].quantity &&
                                        touched &&
                                        touched[`items`] &&
                                        touched[`items`][index] &&
                                        touched[`items`][index].quantity
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <FastField
                                      name={`items.${index}.import_unit_price`}
                                      component={InputFieldArrayNumber}
                                      label="Giá"
                                      placeholder="Nhập giá nhập kho"
                                      type="text"
                                      autoFocus={false}
                                      showError={
                                        errors &&
                                        errors[`items`] &&
                                        errors[`items`][index] &&
                                        errors[`items`][index]
                                          .import_unit_price &&
                                        touched &&
                                        touched[`items`] &&
                                        touched[`items`][index] &&
                                        touched[`items`][index]
                                          .import_unit_price
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="d-flex align-items-center justify-content-center">
                                    <Button
                                      style={{ padding: ".375rem .75rem" }}
                                      type="button"
                                      color="danger"
                                      outline
                                      onClick={() => remove(index)}
                                    >
                                      X
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </React.Fragment>
                        ))}
                      <Row className="mt-3">
                        <Col className="d-flex align-items-center justify-content-start">
                          <Button
                            type="button"
                            color="primary"
                            outline
                            onClick={() =>
                              push({
                                book_id: "",
                                quantity: "",
                                import_unit_price: "",
                              })
                            }
                          >
                            Thêm sách
                          </Button>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col md="12">
                          <FastField
                            name="note"
                            component={textAriaField}
                            label="Ghi chú"
                            placeholder="Nhập Ghi Chú"
                            autoFocus={false}
                            rows={3}
                          />
                        </Col>
                      </Row>
                    </>
                  )}
                />
                <Row className="mt-3">
                  <Col>
                    <div>
                      <strong>
                        {`Tổng thành tiền: ${getTotalPrice(
                          values.items
                        ).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}`}
                      </strong>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md="12">
                    <div className="d-flex">
                      <Button
                        type="reset"
                        style={{ marginRight: "1rem" }}
                        color="secondary"
                        onClick={() => setModal(!modal)}
                      >
                        Hủy bỏ
                      </Button>{" "}
                      <Button
                        className="custom-btn-save"
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                        style={isSubmitting ? { width: "max-content" } : null}
                      >
                        {isSubmitting ? "Đang lưu ... " : "Lưu"}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
}

export default AddEdit;
