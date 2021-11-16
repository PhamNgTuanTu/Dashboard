import { FastField, Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import * as Yup from "yup";
import InputDate from "../../components/custom-fields/inputDate";
import InputFieldBootstrap from "../../components/custom-fields/InputFieldBootstrap";
import InputFile from "../../components/custom-fields/InputFile";
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
  const today = new Date(Date.now() - 43200000);
  today.setHours(0, 0, 0, 0);

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

  const validationSchema = isAddMode
    ? Yup.object().shape({
        name: Yup.string().required("Vui lòng chọn trường này").nullable(),
        book_id: Yup.number().required("Vui lòng chọn trường này").nullable(),
        start_date: Yup.date()
          .min(
            today,
            "Ngày bắt đầu khuyến mãi không được nhỏ hơn ngày hiện tại"
          )
          .typeError("Vui lòng chọn ngày bắt đầu khuyến mãi")
          .required("Vui lòng chọn ngày bắt đầu khuyến mãi"),
        end_date: Yup.date()
          .typeError("Vui lòng chọn ngày kết thúc khuyến mãi")
          .required("Vui lòng chọn ngày kết thúc khuyến mãi")
          .min(
            today,
            "Ngày kết thúc khuyến mãi không được nhỏ hơn ngày bắt đầu khuyến mãi"
          )
          .when("start_date", (start_date) => {
            if (start_date) {
              return Yup.date()
                .min(
                  start_date,
                  "Ngày kết thúc khuyến mãi không được nhỏ hơn ngày bắt đầu khuyến mãi"
                )
                .required("Vui lòng chọn ngày kết thúc khuyến mãi")
                .typeError("Vui lòng chọn ngày kết thúc khuyến mãi");
            }
          }),
        image: Yup.mixed().required("Vui lòng chọn hình ảnh").nullable(),
      })
    : Yup.object().shape({
        name: Yup.string().required("Vui lòng chọn trường này").nullable(),
        book_id: Yup.number().required("Vui lòng chọn trường này").nullable(),
        start_date: Yup.date()
          .typeError("Vui lòng chọn ngày bắt đầu khuyến mãi")
          .required("Vui lòng chọn ngày bắt đầu khuyến mãi"),
        end_date: Yup.date()
          .typeError("Vui lòng chọn ngày kết thúc khuyến mãi")
          .required("Vui lòng chọn ngày kết thúc khuyến mãi")
          .when("start_date", (start_date) => {
            if (start_date) {
              return Yup.date()
                .min(
                  start_date,
                  "Ngày kết thúc khuyến mãi không được nhỏ hơn ngày bắt đầu khuyến mãi"
                )
                .required("Vui lòng chọn ngày kết thúc khuyến mãi")
                .typeError("Vui lòng chọn ngày kết thúc khuyến mãi");
            }
          }),
        image: Yup.mixed().required("Vui lòng chọn hình ảnh").nullable(),
      });

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {isAddMode ? "Tạo Slide" : "Sửa Slide"}
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
                    <FastField
                      name="name"
                      component={InputFieldBootstrap}
                      label="Tên slide"
                      placeholder="Nhập tên silde"
                      type="text"
                      autoFocus={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Field
                      name="book_id"
                      component={SelectField}
                      label="Chọn Sách tạo slide"
                      placeholder="Chọn sách ... "
                      options={getArrBooks(books)}
                      loading={loadingBook}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Field
                      name="start_date"
                      component={InputDate}
                      label="Ngày bắt đầu khuyến mãi"
                      placeholder="Chọn ngày bắt đầu"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Field
                      name="end_date"
                      component={InputDate}
                      label="Ngày kết thúc khuyến mãi"
                      placeholder="Chọn ngày kết thúc"
                    />
                  </Col>
                </Row>
                <Row>
                  <Field
                    name="image"
                    component={InputFile}
                    label="Ảnh slide"
                    placeholder="Vui lòng chọn tệp (jpg,jpeg,png)"
                    type="file"
                    isLarge={true}
                  />
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
