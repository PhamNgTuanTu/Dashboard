import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

Table.propTypes = {
    onRemoveClick: PropTypes.func,
    onEditClick: PropTypes.func,
    searchValue: PropTypes.string,
    suppliers: PropTypes.array,
    onViewClick: PropTypes.func,
};

Table.defaultProps = {
    onRemoveClick: null,
    onEditClick: null,
    searchValue: '',
    suppliers: null,
    onViewClick: null,
}

function Table(props) {

    let { suppliers } = props;

    const { loadingPage } = useSelector(state => state.supplier)

    const { onRemoveClick, onEditClick, searchValue, onViewClick } = props;

    const handleRemoveClick = (supplier) => {
        if (onRemoveClick) onRemoveClick(supplier)
    }
    const handleEditClick = (supplier) => {
        if (onEditClick) onEditClick(supplier)
    }
    const handleViewClick = (author) => {
        if (onViewClick) onViewClick(author)
    }

    //search
    if (searchValue.length > 0) {
        suppliers = suppliers.filter((i) => {
            return i.name.toLowerCase().match(searchValue.toLowerCase());
        })
    }


    return (
        <div className="table-responsive">
            {loadingPage ?
                <table className="tg">
                    <tbody>
                        <tr>
                            <th className="tg-cly1">
                                <div className="line" />
                            </th>
                            <th className="tg-cly1">
                                <div className="line" />
                            </th>
                            <th className="tg-cly1">
                                <div className="line" />
                            </th>
                            <th className="tg-cly1">
                                <div className="line" />
                            </th>
                            <th className="tg-cly1">
                                <div className="line" />
                            </th>
                            <th className="tg-cly1">
                                <div className="line" />
                            </th>
                        </tr>
                        <tr>
                            <td className="tg-cly1">
                                <div className="line" />
                            </td>
                            <td className="tg-cly1">
                                <div className="line" />
                            </td>
                            <td className="tg-cly1">
                                <div className="line" />
                            </td>
                            <td className="tg-cly1">
                                <div className="line" />
                            </td>
                            <td className="tg-cly1">
                                <div className="line" />
                            </td>
                            <td className="tg-cly1">
                                <div className="line" />
                            </td>
                        </tr>
                    </tbody>
                </table> : null}
            <table className={loadingPage ? "d-none" : "table table-hover table-bordered"}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Địa Chỉ</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        suppliers.map((supplier, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td >{supplier.name}</td>
                                    <td >{supplier.phone}</td>
                                    <td >{supplier.email}</td>
                                    <td >{supplier.address}</td>
                                    <td >
                                        <button onClick={() => handleEditClick(supplier.id)}
                                            type="button"
                                            className="btn btn-success mr-2"
                                        ><i className='bx bxs-edit'></i></button>
                                        <button onClick={() => handleRemoveClick(supplier.id)}
                                            type="button"
                                            className="btn btn-danger mr-2"
                                        ><i className='bx bx-trash' ></i></button>
                                        <button onClick={() => handleViewClick(supplier.id)}
                                            type="button"
                                            className="btn btn-primary"
                                        ><i className='bx bx-show'></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;