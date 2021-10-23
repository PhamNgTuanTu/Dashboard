import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Swal from 'sweetalert2';
import bookApi from '../../api/bookApi';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import { GetPageFromUrl } from '../../components/convert-url/GetPageFromUrl';
import { useDocTitle } from '../../components/custom-title-page/CustomTitlePage';
import modalError from '../../components/modal/Error';
import modalSuccess from '../../components/modal/Success';
import Pagination from '../../components/paginate/Pagination';
import Search from '../../components/search/SearchTable';
import { removeBooks, setPageBooks } from '../../store/book';
import Table from './TableBook';
import View from './View';

Books.propTypes = {};

function Books(props) {
    const nameTitleInitial = 'Quản lý sách';
    const [, setDocTitle] = useDocTitle(nameTitleInitial);

    const dispatch = useDispatch();
    const history = useHistory();
    let { path } = useRouteMatch();
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    //lấy danh sách suppliers từ store lên form edit
    const { books } = useSelector(state => state.book);

    // loading
    const { loadingPage } = useSelector(state => state.book)

    // lấy numberPage trên url 
    const location = useLocation();

    //lấy ra số page từ store
    const { page } = useSelector(state => state.book)

    //paginate
    let [PageSize, setPageSize] = useState(page);
    const [currentPage, setCurrentPage] = useState(1);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentItems = books.slice(firstPageIndex, lastPageIndex);

    //get page từ url
    const pageFromUrl = GetPageFromUrl(location.search);

    //load data lên store
    useEffect(() => {
        if (pageFromUrl !== undefined) {
            setCurrentPage(Number(pageFromUrl))
            setDocTitle(`Trang ${pageFromUrl} - ${nameTitleInitial}`)
        }
        // eslint-disable-next-line
    }, []);


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
                bookApi.removeBookApi(id)
                    .then(response => {
                        if (response.status === 204) {
                            dispatch(removeBooks(id))
                            setLoadingDelete(false)
                            modalSuccess("Xóa Thành Công !");
                        }
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            modalError(error.response.data.message);
                            setLoadingDelete(false)
                        }
                    })
            }
        })
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
        dispatch(setPageBooks(Number(e.target.value)))
    }

    //xem thông tin sách
    const [arrInfoBook, setArrInfoBook] = useState()
    const [hideText, setHideText] = useState(false);
    const handleViewClick = (id) => {
        const bookView = books.find(x => x.id === id);
        setArrInfoBook(bookView)
        setHideText(false)
        window.$('#viewInfoBook').modal('show')
    }
    const handelView = () => {
        setHideText(!hideText)
    }

    const handleEditClick = (id) => {
        const booksEdit = books.find(x => x.id === id);
        const editBookUrl = `${path}/edit-${booksEdit.slug}-${id}.html`;
        history.push(editBookUrl);
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
                        <Search handleSearchChange={handleSearchChange} searchValue={searchValue} SearchCaption={"sách"} />
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
                                <Link to={`${path}/add-book`} className="btn btn-primary" >Thêm Sách</Link>
                            </div>
                            <div className="tableWrapper card-content">
                                <Table
                                    onRemoveClick={handleRemoveClick}
                                    onEditClick={handleEditClick}
                                    onViewClick={handleViewClick}
                                    searchValue={searchValue}
                                    books={currentItems}
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
                                totalCount={books.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                                title={nameTitleInitial}
                                setTitle={setDocTitle}
                            />
                        }
                    </div>
                </div>
            </section>
            <View
                arrInfoBook={arrInfoBook}
                handelView={handelView}
                hideText={hideText}
            />
        </>
    );
}

export default Books;