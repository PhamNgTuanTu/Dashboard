import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

Table.propTypes = {
    onRemoveClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onViewClick: PropTypes.func,
    searchValue: PropTypes.string,
    authors: PropTypes.array,
};

Table.defaultProps = {
    onRemoveClick: null,
    onEditClick: null,
    searchValue: '',
    authors: null,
    onViewClick: null,
}

function Table(props) {

    let { authors } = props;

    const { loadingPage } = useSelector(state => state.author)

    const { onRemoveClick, onEditClick, searchValue, onViewClick } = props;

    const handleRemoveClick = (author) => {
        if (onRemoveClick) onRemoveClick(author)
    }
    const handleEditClick = (author) => {
        if (onEditClick) onEditClick(author)
    }
    const handleViewClick = (author) => {
        if (onViewClick) onViewClick(author)
    }

    authors.sort((a, b) => b.id - a.id);

    //search
    if (searchValue.length > 0) {
        authors = authors.filter((i) => {
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
                            authors.map((author, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td >{author.name}</td>
                                        <td className="min-width-170">
                                            <button onClick={() => handleEditClick(author.id)}
                                                type="button"
                                                className="btn btn-success mr-2"
                                            ><i className='bx bxs-edit'></i></button>
                                            <button onClick={() => handleRemoveClick(author.id)}
                                                type="button"
                                                className="btn btn-danger mr-2"
                                            ><i className='bx bx-trash' ></i></button>
                                            <button onClick={() => handleViewClick(author.id)}
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