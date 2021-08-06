import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/user';
import Swal from 'sweetalert2'
import userApi from '../../api/userApi';
import { useState } from 'react';

function Profile(props) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false)
    const onLogout = () => {
        Swal.fire({
            title: 'Đăng Xuất Khỏi Hệ Thống',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, vẫn tiếp tục',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                    userApi.logOut()
                        .then(response => {
                            if (response.status === 204){
                                setLoading(false)
                                dispatch(logout())
                            }
                        }).catch(error => {
                            console.error(error)
                        })
            }
        })
    }
    return (
        <li className="profile">
            {loading ?
                <div id="preloder">
                    <div className="loader"></div>
                </div>
                :
                <div></div>
            }
            <div className="profile-details">
                <div className="name_job">
                    <div className="name">{user?.name}</div>
                    <div className="job">Web designer</div>
                </div>
            </div>
            <i className="bx bx-log-out" id="log_out" onClick={onLogout} />
        </li>
    );
}

export default Profile;