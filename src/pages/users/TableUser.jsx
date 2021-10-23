import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

TableUser.propTypes = {
    onCateRemoveClick: PropTypes.func,
    onCateEditClick: PropTypes.func,
    searchValue: PropTypes.string,
    publisher: PropTypes.array,
};

TableUser.defaultProps = {
    onCateRemoveClick: null,
    onCateEditClick: null,
    searchValue: '',
    publisher: null,
}

function TableUser(props) {

    const { loadingPage } = useSelector(state => state.user)
    let { users, searchValue } = props;

    // //search
    if (searchValue.length > 0) {
        // search theo tên
        if (!isNaN(searchValue)) {
            users = users.filter((i) => {
                return i.phone.toLowerCase().match(searchValue.toLowerCase());
            })
        }
        //search theo email
        if (isNaN(searchValue)) {
            users = users.filter((i) => {
                return i.name.toLowerCase().match(searchValue.toLowerCase());
            })
        }

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
                        <th scope="col">Địa Chỉ</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td >{user.name}</td>
                                    <td >{user.address}</td>
                                    <td >{user.phone}</td>
                                    <td >{user.email}</td>
                                    <td >
                                        <span onClick={() => props.onChangeStatus(user.status, user.id)} className={user.status === 0 ? "badge badge-danger status-user" : "badge badge-primary status-user"}>
                                            {user.status === 0 ? 'Khóa' : 'Hoạt động'}
                                        </span>
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

export default TableUser;