import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import suppliersApi from '../../api/suppliersApi';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import { GetPageFromUrl } from '../../components/convert-url/GetPageFromUrl';
import { useDocTitle } from '../../components/custom-title-page/CustomTitlePage';
import modalError from '../../components/modal/Error';
import modalSuccess from '../../components/modal/Success';
import Pagination from '../../components/paginate/Pagination';
import Search from '../../components/search/SearchTable';
import { addSuppliers, editSuppliers, removeSuppliers, setDataSuppliers, setLoadingData, setPageSuppliers } from '../../store/supplier';
import AddEdit from './AddEdit';
import Table from './TableSuppliers';
import View from './View';

Suppliers.propTypes = {};

function Suppliers(props) {
    const nameTitleInitial = 'Quản lý nhà cung cấp';
    const [, setDocTitle] = useDocTitle(nameTitleInitial);

    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // id suppliers edit
    const [idEdit, setIdEdit] = useState();

    //lấy danh sách suppliers từ store lên form edit
    const { suppliers } = useSelector(state => state.supplier);

    // loading
    const { loadingPage } = useSelector(state => state.supplier)

    // kiểm tra tính năng add hay edit
    const [isAddMode, setIsAddMode] = useState(true)

    // lấy id từ button edit 
    const suppliersEdit = suppliers.find(x => x.id === idEdit);

    // giá trị ban đầu của form
    let initialValues = isAddMode ?
        {
            name: '',
            address: '',
            phone: '',
            email: '',
            description: ''
        } : suppliersEdit;

    // nếu xóa thì initialValues trả giá trị mặc định
    if (initialValues) {
    } else {
        initialValues = {
            name: '',
            address: '',
            phone: '',
            email: '',
            description: ''
        }
    }

    // lấy numberPage trên url 
    const location = useLocation();

    //lấy ra số page từ store
    const { page } = useSelector(state => state.supplier)

    //paginate
    let [PageSize, setPageSize] = useState(page);
    const [currentPage, setCurrentPage] = useState(1);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentItems = suppliers.slice(firstPageIndex, lastPageIndex);

    //get page từ url
    const pageFromUrl = GetPageFromUrl(location.search);

    //load data lên store
    useEffect(() => {
        async function LoadData() {
            try {
                const response = await suppliersApi.getAll();
                dispatch(setDataSuppliers(response.data));
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


    //open moadal
    const openModal = () => {
        window.$('#addAndEditSuppliers').modal('show')
        setIsAddMode(true);
    }

    // submit data add and edit suppliers
    const onSubmit = (values, { resetForm }) => {
        setLoading(true)
        if (isAddMode) {
            suppliersApi.addSupplie(values)
                .then(response => {
                    if (response.success) {
                        setLoading(false)
                        dispatch(addSuppliers(response.data))
                        resetForm(initialValues)
                        modalSuccess(response.message);
                        window.$('#addAndEditSuppliers').modal('hide');
                    }
                }).catch(error => {
                    if (error.response.status === 422) {
                        const arrError = Object.keys(initialValues);
                        for (let i = 0; i <arrError.length; i++) {
                            if (error.response.data.errors[`${arrError[i]}`]) {
                                modalError(error.response.data.errors[`${arrError[i]}`]);
                                setLoading(false)
                            }
                        }
                    }
                    if (error.response.status === 500) {
                        modalError(error.response.data.message);
                        setLoading(false)
                    }
                });
            return;
        } else {
            suppliersApi.editSupplie(values, idEdit)
                .then(response => {
                    if (response.success) {
                        dispatch(editSuppliers(response.data))
                        setLoading(false)
                        modalSuccess(response.message);
                        window.$('#addAndEditSuppliers').modal('hide');
                    }
                }).catch(error => {
                    if (error.response.status === 404) {
                        setLoading(false)
                        modalError(error.response.data.message);
                    }
                    if (error.response.status === 422) {
                        const arrError = Object.keys(initialValues);
                        for (let i = 0; i <arrError.length; i++) {
                            if (error.response.data.errors[`${arrError[i]}`]) {
                                modalError(error.response.data.errors[`${arrError[i]}`]);
                                setLoading(false)
                            }
                        }
                    }
                    if (error.response.status === 500) {
                        modalError(error.response.data.message);
                        setLoading(false)
                    }
                })
        }
    }

    //xóa suppliers
    const handleRemoveClick = (id) => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa ?',
            text: "Bạn sẽ không thể khôi phục dữ liệu !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, vẫn xóa',
            cancelButtonText: 'Hủy'

        }).then((result) => {
            if (result.isConfirmed) {
                setLoadingDelete(true)
                suppliersApi.removeSupplie(id)
                    .then(response => {
                        if (response.status === 204) {
                            dispatch(removeSuppliers(id))
                            setLoadingDelete(false)
                            modalSuccess("Xóa Thành Công !");
                        }
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            modalError(error.response.data.message);
                            setLoadingDelete(false)
                        }
                        if (error.response.status === 409) {
                            modalError(error.response.data.message);
                            setLoadingDelete(false);
                          }
                    })
            }
        })
    }

    // mở modal lên sau đó load data
    const handleEditClick = (id) => {
        window.$('#addAndEditSuppliers').modal('show')
        setIsAddMode(false);
        setIdEdit(id)
    }

    //search
    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value)
    }

    //set item trên 1 table
    const selectItem = [3, 5, 10, 20, 50]
    const handleAddrTypeChange = (e) => {
        setPageSize(Number(e.target.value))
        dispatch(setPageSuppliers(Number(e.target.value)))
    }

    //view
    const [dataView, setDataView] = useState();
    const handleViewClick = (id) => {
        const psuppliersView = suppliers.find(x => x.id === id);
        setDataView(psuppliersView)
        window.$('#viewInfoSuppliers').modal('show')
    }
    return (
        <>
            {
                loadingDelete ?
                    <div id="preloder">
                        <div className="loader"></div>
                    </div>
                    :
                    <div></div>
            }
            <section className="home-section">
                <BreadCrumb nameControl={nameTitleInitial} />
                <div className='row'>
                    <div className="col-6">
                        <Search handleSearchChange={handleSearchChange} searchValue={searchValue} SearchCaption={"nhà Cung Cấp"} />
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
                                <button type="button" className="btn btn-primary" onClick={openModal}>Thêm Nhà Cung Cấp</button>
                            </div>
                            <div className="tableWrapper card-content">
                                <Table
                                    onRemoveClick={handleRemoveClick}
                                    onEditClick={handleEditClick}
                                    onViewClick={handleViewClick}
                                    searchValue={searchValue}
                                    suppliers={currentItems}
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
                                totalCount={suppliers.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                                title={nameTitleInitial}
                                setTitle={setDocTitle}
                            />
                        }
                    </div>
                </div>
            </section>
            <AddEdit onSubmit={onSubmit} initialValues={initialValues} isLoading={Loading} isAddMode={isAddMode} />
            <View data={dataView} />
        </>
    );
}

export default Suppliers;