import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React from 'react';

View.propTypes = {
    data: PropTypes.object,
};
View.defaultProps = {
    data: null,
}

function View(props) {
    const { data } = props;
    return (
        <div className="modal fade" id="viewInfocate" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{data ? data.name : null}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            data ?
                                <div className="container">
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Tên Thể Loại:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{data.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>URL:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{data.slug}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Thời Gian Tạo:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{data.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Thời Gian Sửa:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{data.updated_at}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h5>Mô Tả:</h5>
                                            <span className="view-hide-text" >{parse(data.description)}</span>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default View;