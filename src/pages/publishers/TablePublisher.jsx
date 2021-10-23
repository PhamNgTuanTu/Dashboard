import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

Table.propTypes = {
    onRemoveClick: PropTypes.func,
    onEditClick: PropTypes.func,
    searchValue: PropTypes.string,
    publisher: PropTypes.array,
    onViewClick: PropTypes.func,
};

Table.defaultProps = {
    onRemoveClick: null,
    onEditClick: null,
    searchValue: '',
    publisher: null,
    onViewClick: null,
}

function Table(props) {

    let { publisher } = props;

    const { loadingPage } = useSelector(state => state.publisher)

    const { onRemoveClick, onEditClick, searchValue, onViewClick } = props;

    const handleRemoveClick = (publishe) => {
        if (onRemoveClick) onRemoveClick(publishe)
    }
    const handleEditClick = (publishe) => {
        if (onEditClick) onEditClick(publishe)
    }
    const handleViewClick = (author) => {
        if (onViewClick) onViewClick(author)
    }

    //search
    if (searchValue.length > 0) {
        publisher = publisher.filter((i) => {
            return i.name.toLowerCase().match(searchValue.toLowerCase());
        })
    }


    return (
        <>
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
                        </tr>
                    </tbody>
                </table> : null}
            <table className={loadingPage ? "d-none" : "table table-hover table-bordered"}>
                <thead className="thead-dark">
                    <tr>
                    <th scope="col" className="w-25">#</th>
                        <th scope="col" className="w-50">Tên</th>
                        <th scope="col" className="w-25">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        publisher.map((publishe, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td >{publishe.name}</td>
                                    <td >
                                        <button onClick={() => handleEditClick(publishe.id)}
                                            type="button"
                                            className="btn btn-success mr-2"
                                        ><i className='bx bxs-edit'></i></button>
                                        <button onClick={() => handleRemoveClick(publishe.id)}
                                            type="button"
                                            className="btn btn-danger mr-2"
                                        ><i className='bx bx-trash' ></i></button>
                                        <button onClick={() => handleViewClick(publishe.id)}
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
        </>
    );
}

export default Table;