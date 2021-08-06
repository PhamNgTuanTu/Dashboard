import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React from 'react';

View.propTypes = {
    arrInfoBook: PropTypes.object,
    hideText: PropTypes.bool,
};
View.defaultProps = {
    arrInfoBook: null,
    hideText : false,
}

function View(props) {
    let { arrInfoBook,hideText } = props;
    return (
        <div className="modal fade" id="viewInfoBook" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Chi Tiết Sách {arrInfoBook ? arrInfoBook.name : null}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            arrInfoBook ?

                                <div className="container">
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Mã Sách:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.code}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Tên Sách:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.name}.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Đơn Giá:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.unit_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Khối Lượng:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.weight} g.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Định Dạng:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.format}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Năm Sản Xuất:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.release_date}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Ngôn Ngữ:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.language}.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Kích Thước:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.size}.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Tổng Số Trang:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.num_pages} trang.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Url:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.slug}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Dịch Giả:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.translator ? arrInfoBook.translator : "Chờ nhập .."}.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Tác Giả:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.author}.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Nhà Xuất Bản:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.publisher}.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Nhà Cung Cấp:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.supplier}.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Số Lượng Tồn:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.inventory.available_quantity}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Thể Loại:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.category.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Ngày Tạo:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p>Ngày Sửa:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{arrInfoBook.updated_at}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="show-img-modal">
                                                <p>Ảnh Mặt Trước:</p>
                                                <img src={`${process.env.REACT_APP_API_URL}/images/${arrInfoBook.image.front_cover}`}
                                                    alt={arrInfoBook.image.front_cover} height={300}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="show-img-modal">
                                                <p>Ảnh Mặt Sau:</p>
                                                <img src={`${process.env.REACT_APP_API_URL}/images/${arrInfoBook.image.back_cover}`}
                                                    alt={arrInfoBook.image.back_cover} height={300}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h5>Mô Tả:</h5>
                                            <span className={hideText ? "" : "view-hide-text"} >{parse(arrInfoBook.description)}</span>
                                            <div className="view-content" onClick={props.handelView}>{hideText ? "Ẩn Mô Tả" : "Xem Thêm"}</div>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default View;