import { FastField, Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import * as Yup from "yup";
import InputFieldNumber from "../../components/custom-fields/InputFieldNumber";
import SelectField from "../../components/custom-fields/SelectField";

AddEdit.propTypes = {
  nameModal: PropTypes.string,
  initialValues: PropTypes.object,
};
AddEdit.defaultProps = {
  nameModal: "Thêm Sản Phẩm Vào Kho",
  initialValues: null,
};

function AddEdit(props) {
  const { initialValues, modal, setModal, books, isAddMode, loadingBook } =
    props;

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
    book_id: Yup.number().required("Vui lòng chọn trường này").nullable(),
    percent: Yup.number()
      .integer("vui lòng nhập số nguyên")
      .min(1, "Phần trăm phải lớn hơn 1")
      .max(100, "Tối đa 100%")
      .positive("Vui lòng nhập số dương")
      .typeError("Vui lòng nhập dạng số")
      .required("Vui lòng nhập trường này"),
  });

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {isAddMode ? "Tạo Giảm Giá" : "Sửa Giảm Giá"}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          onSubmit={props.onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formikProps) => {
            const { isSubmitting } = formikProps;
            return (
              <Form>
                <Row>
                  <Col md="12">
                    <Field
                      name="book_id"
                      component={SelectField}
                      label="Chọn Sách tạo giảm gá"
                      placeholder="Chọn sách ... "
                      options={getArrBooks(books)}
                      loading={loadingBook}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FastField
                      name="percent"
                      component={InputFieldNumber}
                      label="Giảm giá"
                      placeholder="Nhập giảm giá"
                      type="text"
                      autoFocus={false}
                    />
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
