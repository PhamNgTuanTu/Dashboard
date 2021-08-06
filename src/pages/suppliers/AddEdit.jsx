import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import InputFieldBootstrap from '../../components/custom-fields/InputFieldBootstrap';
import textAriaField from '../../components/custom-fields/textAriaField';

AddEdit.propTypes = {
    nameModal: PropTypes.string,
    initialValues: PropTypes.object,
};
AddEdit.defaultProps = {
    nameModal: "Thêm Nhà Cung Cấp",
    initialValues: null,
}

function AddEdit(props) {
    var { initialValues, isLoading, isAddMode } = props;
    const phoneRegex = RegExp(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    );
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng nhập trường này')
            .max(100, "Vui lòng nhập nhỏ hơn 100 kí tự"),
        address: Yup.string()
            .min(10, "Vui lòng nhập 10 -> 100 kí tự")
            .max(100, "Vui lòng nhập 10 -> 100 kí tự")
            .required('Vui lòng nhập trường này'),
        phone: Yup.string()
            .max(20, "Vui lòng nhập ít hơn 20 ký tự ")
            .matches(phoneRegex, 'Số điện thoại không hợp lệ')
            .required('Vui lòng nhập trường này'),
        email: Yup.string()
            .max(100, "Vui lòng nhập ít hơn 100 ký tự ")
            .required('Vui lòng nhập trường này'),
        description: Yup.string()
            .max(1000, "Vui lòng nhập ít hơn 1000 ký tự ")
            .required('Vui lòng nhập trường này')
    })

    return (
        <div className="modal fade" id="addAndEditSuppliers" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{isAddMode ? "Thêm Nhà Cung Cấp" : "Sửa Nhà Cung Cấp"}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={props.onSubmit}
                            validationSchema={validationSchema}
                            enableReinitialize
                        >
                            {formikProps => {
                                return (
                                    <Form>
                                        <FastField
                                            name="name"
                                            component={InputFieldBootstrap}

                                            label="Tên Nhà Cung Cấp"
                                            placeholder="Nhập tên nhà cung cấp"
                                            type="text"
                                            autoFocus={true}
                                        />
                                        <FastField
                                            name="address"
                                            component={InputFieldBootstrap}

                                            label="Địa Chỉ"
                                            placeholder="Nhập địa chỉ"
                                            type="text"
                                            autoFocus={false}
                                        />
                                        <FastField
                                            name="phone"
                                            component={InputFieldBootstrap}

                                            label="Số Điện Thoại"
                                            placeholder="Nhập số điện thoại"
                                            type="text"
                                            autoFocus={false}
                                        />
                                        <FastField
                                            name="email"
                                            component={InputFieldBootstrap}

                                            label="Email"
                                            placeholder="Nhập email"
                                            type="email"
                                            autoFocus={false}
                                        />
                                        <FastField
                                            name="description"
                                            component={textAriaField}

                                            label="Mô tả"
                                            placeholder="Nhập Mô Tả"
                                            autoFocus={false}
                                            rows={3}
                                        />
                                        <div className="form-group form-group-btn">
                                            <button onClick={e => formikProps.resetForm()} type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                            <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? "Đang lưu ..." : "Lưu Lại"}</button>
                                        </div>
                                    </Form>
                                )
                            }}

                        </Formik>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEdit;