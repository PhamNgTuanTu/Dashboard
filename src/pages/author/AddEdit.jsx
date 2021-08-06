import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import InputFieldBootstrap from '../../components/custom-fields/InputFieldBootstrap';
import tinyMCE from '../../components/custom-fields/tinyMCE';

AddEdit.propTypes = {
    nameModal: PropTypes.string,
    initialValues: PropTypes.object,
};
AddEdit.defaultProps = {
    nameModal: "Thêm Tác Giả",
    initialValues: null,
}

function AddEdit(props) {
    var { initialValues, isLoading, isAddMode } = props;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng nhập trường này')
            .max(100, "Vui lòng nhập nhỏ hơn 100 kí tự"),
        description: Yup.string()
            .required('Vui lòng nhập trường này')
    })

    // cho phép focus vào input Image, link khi mở modal bootstrap 
    window.$(document).on('focusin', function(e) {
        if (window.$(e.target).closest(".tox").length) {
            e.stopImmediatePropagation();
        }
    });

    return (
        <div className="modal fade" id="addAndEditAuthor" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog-centered modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{isAddMode ? "Thêm Tác Giả" : "Sửa Tác Giả"}</h5>
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
                                // const { isSubmitting,values, errors, touched } = formikProps;
                                // console.log({ values, errors, touched });
                                return (
                                    <Form>
                                        <FastField
                                            name="name"
                                            component={InputFieldBootstrap}

                                            label="Tên Tác Giả"
                                            placeholder="Nhập tên Tác Giả"
                                            type="text"
                                            autoFocus={true}
                                        />
                                        <FastField
                                            name="description"
                                            component={tinyMCE}

                                            label="Mô tả"
                                            placeholder="Nhập Mô Tả"
                                            autoFocus={false}
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