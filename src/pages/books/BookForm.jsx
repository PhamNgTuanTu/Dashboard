import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, Form, Formik } from 'formik';
import InputFieldBootstrap from '../../components/custom-fields/InputFieldBootstrap';
import InputFieldSize from '../../components/custom-fields/InputFieldSize';
import SelectField from '../../components/custom-fields/SelectField';
import InputFile from '../../components/custom-fields/InputFile';
import tinyMCE from '../../components/custom-fields/tinyMCE';
import InputYearField from '../../components/custom-fields/inputYearField';
import * as Yup from 'yup';

BookForm.propTypes = {
    initialValues: PropTypes.object,
    dataSelect: PropTypes.object,
};
BookForm.defaultProps = {
    initialValues: '',
    dataSelect: '',
}
function BookForm(props) {
    const { initialValues, dataSelect } = props;

    var currentTime = new Date();
    var year = currentTime.getFullYear();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng nhập trường này')
            .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
        code: Yup.string()
            .required('Vui lòng nhập trường này')
            .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
        unit_price: Yup.number()
            .integer('vui lòng nhập số nguyên')
            .positive('Vui lòng nhập số dương')
            .typeError('Vui lòng nhập dạng số')
            .required('Vui lòng nhập trường này'),
        weight: Yup.number()
            .positive('Vui lòng nhập số dương')
            .typeError('Vui lòng nhập dạng số')
            .min(0.00, "giá trị lớn hơn 0.00")
            .max(999.99, "giá trị nhỏ hơn 999.99")
            .required('Vui lòng nhập trường này'),
        format: Yup.string()
            .required('Vui lòng nhập trường này'),
        release_date: Yup.number()
            .typeError('Vui lòng nhập hoặc chọn năm tương ứng')
            .required('Vui lòng nhập hoặc chọn năm tương ứng')
            .min(1900, "Năm phát hành phải lớn hơn 1900")
            .max(year, "Năm phát hành phải nhỏ hơn năm hiện tại")
            .nullable(),
        language: Yup.string()
            .required('Vui lòng nhập trường này'),
        size: Yup.string()
            .required('Vui lòng nhập trường này'),
        num_pages: Yup.number()
            .integer('vui lòng nhập số nguyên')
            .positive('Vui lòng nhập số dương')
            .typeError('Vui lòng nhập dạng số')
            .required('Vui lòng nhập trường này'),
        category_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
        author_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
        publisher_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
        supplier_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
        front_cover: Yup.mixed()
            .required("Vui lòng chọn hình ảnh")
            .test("fileSize", "Kích thước file phải nhỏ hơn 2mb", (value) => {
                return value && value.size <= 2000000;
            }),
        back_cover: Yup.mixed()
            .required("Vui lòng chọn hình ảnh")
            .test("fileSize", "Kích thước file phải nhỏ hơn 2mb", (value) => {
                return value && value.size <= 2000000;
            }),
        description: Yup.string()
            .required('Vui lòng nhập trường này')
    })
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={props.handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formikProps => {
                const { isSubmitting, values, errors, touched } = formikProps;
                // console.log({ values, errors, touched });
                return (
                    <Form>
                        <div className="row">
                            <div className="col-6">
                                <FastField
                                    name="name"
                                    component={InputFieldBootstrap}

                                    label="Tên Sách"
                                    placeholder="Nhập Tên Sách"
                                    type="text"
                                    autoFocus={true}
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="code"
                                    component={InputFieldBootstrap}

                                    label="Mã Sách"
                                    placeholder="Nhập Mã Sách"
                                    type="text"
                                    autoFocus={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FastField
                                    name="unit_price"
                                    component={InputFieldBootstrap}

                                    label="Đơn Giá"
                                    placeholder="Nhập Đơn Giá"
                                    type="text"
                                    autoFocus={false}
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="language"
                                    component={InputFieldBootstrap}

                                    label="Ngôn Ngữ"
                                    placeholder="Nhập Ngôn Ngữ"
                                    type="text"
                                    autoFocus={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FastField
                                    name="format"
                                    component={InputFieldBootstrap}

                                    label="Định Dạng Bìa"
                                    placeholder="Nhập Định Dạng Bìa"
                                    type="text"
                                    autoFocus={false}
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="release_date"
                                    component={InputYearField}

                                    label="Năm Phát Hành"
                                    placeholder="Nhập Năm Phát Hành"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FastField
                                    name="weight"
                                    component={InputFieldBootstrap}

                                    label="Khối Lượng"
                                    placeholder="Nhập Khối Lượng Sách (gam)"
                                    type="text"
                                    autoFocus={false}
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="size"
                                    component={InputFieldSize}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FastField
                                    name="num_pages"
                                    component={InputFieldBootstrap}

                                    label="Tổng Số Trang"
                                    placeholder="Nhập Tổng Số Trang"
                                    type="text"
                                    autoFocus={false}
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="translator"
                                    component={InputFieldBootstrap}

                                    label="Dịch Giả"
                                    placeholder="Nhập Dịch Giả"
                                    type="text"
                                    autoFocus={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Field
                                    name="category_id"
                                    component={SelectField}

                                    label="Chọn Thể Loại"
                                    placeholder="Chọn Thể Loại ... "
                                    options={dataSelect && dataSelect.category}
                                />
                            </div>
                            <div className="col-6">
                                <Field
                                    name="author_id"
                                    component={SelectField}

                                    label="Chọn Tác Giả"
                                    placeholder="Chọn Tác Giả ... "
                                    options={dataSelect && dataSelect.author}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Field
                                    name="publisher_id"
                                    component={SelectField}

                                    label="Chọn Nhà Xuất Bản"
                                    placeholder="Chọn Nhà Xuất Bản ... "
                                    options={dataSelect && dataSelect.publisher}
                                />
                            </div>
                            <div className="col-6">
                                <Field
                                    name="supplier_id"
                                    component={SelectField}

                                    label="Chọn Nhà Cung Cấp"
                                    placeholder="Chọn Nhà Cung Cấp ... "
                                    options={dataSelect && dataSelect.supplier}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <FastField
                                name="front_cover"
                                component={InputFile}

                                label="Ảnh Mặt Trước"
                                placeholder="Vui lòng chọn tệp (jpg,jpeg,bmp,png)"
                                type="file"
                            />
                            <FastField
                                name="back_cover"
                                component={InputFile}

                                label="Ảnh Mặt Sau"
                                placeholder="Vui lòng chọn tệp (jpg,jpeg,bmp,png)"
                                type="file"
                            />
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <FastField
                                    name="description"
                                    component={tinyMCE}

                                    label="Mô tả"
                                    placeholder="Nhập Mô Tả"
                                    autoFocus={false}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting ? true : false}>{isSubmitting ? "Đang Lưu ..." : "Lưu Thông Tin"}</button>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default BookForm;