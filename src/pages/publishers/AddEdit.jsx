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
    nameModal: "Thêm Nhà Xuất Bản",
    initialValues: null,
}

function AddEdit(props) {
    var { initialValues, isLoading,isAddMode } = props;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng nhập trường này')
            .max(100, "Vui lòng nhập nhỏ hơn 100 kí tự"),
        description: Yup.string()
            .required('Vui lòng nhập trường này')
    })

    return (
        <div className="modal fade" id="addAndEditPublissher" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{isAddMode ? "Thêm Nhà Xuất Bản" : "Sửa Nhà Xuất Bản"}</h5>
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

                                            label="Tên Nhà Xuất Bản"
                                            placeholder="Nhập tên Nhà Xuất Bản"
                                            type="text"
                                            autoFocus={true}
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
                                            <button onClick={ e => formikProps.resetForm()} type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
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