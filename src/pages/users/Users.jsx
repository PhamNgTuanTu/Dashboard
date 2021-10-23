import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import userApi from '../../api/userApi';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import { GetPageFromUrl } from '../../components/convert-url/GetPageFromUrl';
import { useDocTitle } from '../../components/custom-title-page/CustomTitlePage';
import modalError from '../../components/modal/Error';
import modalSuccess from '../../components/modal/Success';
import Pagination from '../../components/paginate/Pagination';
import Search from '../../components/search/SearchTable';
import { setDataUser, setLoadingData, setPageUser, setStatus } from '../../store/user';
import TableUser from './TableUser';

Users.propTypes = {};

function Users(props) {
    const nameTitleInitial = 'Quản Lý Tài Khoản';
    const [, setDocTitle] = useDocTitle(nameTitleInitial);

    const dispatch = useDispatch();
    // const [Loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    //lấy danh sách user từ store
    const { listUser } = useSelector(state => state.user);

    // loading
    const { loadingPage } = useSelector(state => state.user)

    // lấy numberPage trên url 
    const location = useLocation();

    //lấy ra số page từ store
    const { page } = useSelector(state => state.user)

    //paginate
    let [PageSize, setPageSize] = useState(page);
    const [currentPage, setCurrentPage] = useState(1);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentItems = listUser.slice(firstPageIndex, lastPageIndex);

    //get page từ url
    const pageFromUrl = GetPageFromUrl(location.search);

    //load data lên store
    useEffect(() => {
        async function LoadData() {
            try {
                const response = await userApi.getAll();
                dispatch(setDataUser(response.data));
                dispatch(setLoadingData(false))
                if (pageFromUrl !== undefined) {
                    setCurrentPage(Number(pageFromUrl))
                    setDocTitle(`Trang ${pageFromUrl} - ${nameTitleInitial}`)
                }
            } catch (error) {
                console.error(error)
            }
        }
        LoadData();
        // eslint-disable-next-line
    }, []);

    //search
    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value)
    }

    //set item trên 1 table
    const selectItem = [3, 5, 10, 20, 50]
    const handleAddrTypeChange = (e) => {
        setPageSize(Number(e.target.value))
        dispatch(setPageUser(Number(e.target.value)))
    }

    const onChangeStatus = (status, id) => {
        if (status === 1) {
            Swal.fire({
                title: 'Khóa Tài Khoản ?',
                text: "Bạn có muốn khóa tài khoản này",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    userApi.editStatus({ status: 0 }, id)
                        .then(response => {
                            if (response.success) {
                                dispatch(setStatus(0, id))
                                modalSuccess(response.message);
                            }
                        }).catch(error => {
                            if (error.response.status === 422) {
                                modalError(error.response.data.message);
                            }
                            if (error.response.status === 404) {
                                modalError(error.response.data.message);
                            }
                        })
                }
            })
        } else {
            userApi.editStatus({ status: 1 }, id)
                .then(response => {
                    if (response.success) {
                        dispatch(setStatus(1, id))
                        modalSuccess(response.message);
                    }
                }).catch(error => {
                    if (error.response.status === 422) {
                        modalError(error.response.data.message);
                    }
                    if (error.response.status === 404) {
                        modalError(error.response.data.message);
                    }
                })
        }
    }


    return (
        <section className="home-section">
            <BreadCrumb nameControl={nameTitleInitial} />
            <div className='row'>
                <div className="col-6">
                    <Search handleSearchChange={handleSearchChange} searchValue={searchValue} SearchCaption={"tài khoản hoặc email"} />
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Số Item Hiển Thị Trong Bảng</label>
                        <select className="form-control"
                            onChange={handleAddrTypeChange}
                            value={PageSize}
                        >
                            {
                                selectItem.map((item, index) =>
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3>
                                Bảng {nameTitleInitial}
                            </h3>
                        </div>
                        <div className="tableWrapper card-content">
                            <TableUser
                                searchValue={searchValue}
                                users={currentItems}
                                onChangeStatus={onChangeStatus}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {loadingPage ? null :
                        <Pagination
                            currentPage={currentPage}
                            totalCount={listUser.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                            title={nameTitleInitial}
                            setTitle={setDocTitle}
                        />
                    }
                </div>
            </div>
        </section>
    );
}

export default Users;