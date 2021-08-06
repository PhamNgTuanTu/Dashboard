import React from 'react';

Search.propTypes = {};

function Search(props) {
    var {SearchCaption } = props;
    return (
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Tìm Kiếm</label>
            <input type="text"
                className="form-control"
                placeholder={`Nhập tên ${SearchCaption}`}
                onChange={props.handleSearchChange}
                value={props.searchValue}
            />
            <small className="form-text text-muted">Nhập tên {SearchCaption} bạn muốn tìm kiếm.</small>
        </div>
    );
}

export default Search;