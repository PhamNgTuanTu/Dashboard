import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React from 'react';

View.propTypes = {
    description: PropTypes.object,
    hideText: PropTypes.bool,
};
View.defaultProps = {
    description: null,
    hideText: false,
}

function View(props) {
    const { description, hideText } = props;
    return (
        <div className="modal fade" id="viewInfoAuthor" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Tác Giả {description ? description.name : null}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            description ?
                                <div className="container">
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Tên Tác Giả:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{description.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>URL:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{description.slug}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Thời Gian Tạo:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{description.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Thời Gian Sửa:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{description.updated_at}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="show-img-modal">
                                                <p>Ảnh tác giả:</p>
                                                <img src={`${process.env.REACT_APP_API_URL}/images/${description.image}`}
                                                    alt={description.image} height={200} width="auto"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h5>Mô Tả:</h5>
                                            <span className={hideText ? "" : "view-hide-text"} >{parse(description.description)}</span>
                                            <span className="view-content" onClick={props.handelView}>{hideText ? "Ẩn Mô Tả" : "Xem Thêm"}</span>
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