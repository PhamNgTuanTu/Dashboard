import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import bookApi from "../../api/bookApi";
import discountApi from "../../api/disCountApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { GetPageFromUrl } from "../../components/convert-url/GetPageFromUrl";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import Pagination from "../../components/paginate/Pagination";
import SelectSearch from "../../components/search/selectSearch";
import { setDataBook, setLoadingData as setLoadingDataBook } from "../../store/book";
import {
  addDisCount,
  editDisCount,
  removeDisCount,
  setDataDisCount,
  setLoadingData
} from "../../store/discount";
import { setPagePublissher } from "../../store/publisher";
import AddEdit from "./AddEdit";
import Table from "./TableDisCount";

DisCount.propTypes = {};

function DisCount(props) {
  const nameTitleInitial = "Quản lý giảm giá";
  const [, setDocTitle] = useDocTitle(nameTitleInitial);

  let {
    storeBook,
    storeDisCount,
    storePageDiscount,
    loadingDisCount,
    loadingBooks,
  } = useSelector((state) => ({
    storeBook: state.book.books,
    storeDisCount: state.discount.discount,
    storePageDiscount: state.discount.page,
    loadingPage: state.discount.loadingPage,
    loadingBooks: state.book.loadingPage,
  }));

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    name: "",
  });
  //mở modal
  const [modal, setModal] = useState(false);

  // id discount edit
  const [idEdit, setIdEdit] = useState();

  // kiểm tra tính năng add hay edit
  const [isAddMode, setIsAddMode] = useState(true);

  // lấy id từ button edit
  const discountEdit = storeDisCount.find((x) => x.id === idEdit);

  // giá trị ban đầu của form
  let initialValues = isAddMode
    ? {
        book_id: "",
        percent: "",
      }
    : {
        book_id: discountEdit.book.id,
        percent: discountEdit.percent,
      };

  // nếu xóa thì initialValues trả giá trị mặc định
  if (initialValues) {
  } else {
    initialValues = {
      name: "",
      description: "",
    };
  }

  // lấy numberPage trên url
  const location = useLocation();

  //paginate
  let [PageSize, setPageSize] = useState(storePageDiscount);
  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = storeDisCount.slice(firstPageIndex, lastPageIndex);

  //get page từ url
  const pageFromUrl = GetPageFromUrl(location.search);

  const getArrBooks = (data) => {
    let arr = [];
    if (data && JSON.stringify(data) !== "{}") {
      arr = data.map((val, i) => {
        return {
          id: val.id,
          name: val.name,
        };
      });
    }
    return arr;
  };

  //load data lên store
  useEffect(() => {
    async function LoadData() {
      try {
        const response = await discountApi.getAll();
        const books = await bookApi.getAll();
        dispatch(setDataDisCount(response.data));
        dispatch(setLoadingData(false));
        dispatch(setDataBook(books.data));
        dispatch(setLoadingDataBook(false));
        if (pageFromUrl !== undefined) {
          setCurrentPage(Number(pageFromUrl));
          setDocTitle(`Trang ${pageFromUrl} - ${nameTitleInitial}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
    LoadData();
    // eslint-disable-next-line
  }, []);

  //open moadal
  const openModal = () => {
    setModal(!modal);
    setIsAddMode(true);
  };

  // submit data add and edit publisher
  const onSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    if (isAddMode) {
      discountApi
        .addDisCount(values)
        .then((response) => {
          if (response.success) {
            setLoading(false);
            dispatch(addDisCount(response.data));
            modalSuccess(response.message);
            setSubmitting(false);
            setModal(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            const arrError = Object.keys(initialValues);
            for (let i = 0; i < arrError.length; i++) {
              if (error.response.data.errors[`${arrError[i]}`]) {
                modalError(error.response.data.errors[`${arrError[i]}`]);
                setLoading(false);
                setSubmitting(false);
              }
            }
          }
          if (error.response.status === 500) {
            modalError(error.response.data.message);
            setLoading(false);
            setSubmitting(false);
          }
        });
    } else {
      discountApi
        .editDisCount(values, idEdit)
        .then((response) => {
          if (response.success) {
            dispatch(editDisCount(response.data));
            setLoading(false);
            modalSuccess(response.message);
            setSubmitting(false);
            setModal(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setLoading(false);
            modalError(error.response.data.message);
          }
          if (error.response.status === 422) {
            const arrError = Object.keys(initialValues);
            for (let i = 0; i < arrError.length; i++) {
              if (error.response.data.errors[`${arrError[i]}`]) {
                modalError(error.response.data.errors[`${arrError[i]}`]);
                setLoading(false);
                setSubmitting(false);
              }
            }
          }
          if (error.response.status === 500) {
            modalError(error.response.data.message);
            setLoading(false);
            setSubmitting(false);
          }
        });
    }
  };

  //xóa publisher
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
            setLoading(true)
            discountApi.removeDisCount(id)
                .then(response => {
                    if (response.status === 204) {
                        dispatch(removeDisCount(id))
                        setLoading(false)
                        modalSuccess("Xóa Thành Công !");
                    }
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        modalError(error.response.data.message);
                        setLoading(false)
                    }
                })
        }
    })
  };

  // mở modal lên sau đó load data
  const handleEditClick = (id) => {
    setModal(!modal);
    setIsAddMode(false);
    setIdEdit(id);
  };

  //set item trên 1 table
  const selectItem = [3, 5, 10, 20, 50];
  const handleAddrTypeChange = (e) => {
    setPageSize(Number(e.target.value));
    dispatch(setPagePublissher(Number(e.target.value)));
  };

  return (
    <>
      {loading ? (
        <div id="preloder">
          <div className="loader"></div>
        </div>
      ) : (
        <div></div>
      )}
      <section className="home-section">
        <BreadCrumb nameControl={nameTitleInitial} />
        <div className="row">
          <div className="col-6">
            <SelectSearch
              values={params}
              setValues={setParams}
              label="Lọc theo tên sách"
              placeholder="Chọn sách ..."
              name="name"
              options={getArrBooks(storeBook)}
              getLabel={true}
              loading={loadingBooks}
            />
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">
                Số Item Hiển Thị Trong Bảng
              </label>
              <select
                className="form-control"
                onChange={handleAddrTypeChange}
                value={PageSize}
              >
                {selectItem.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>Bảng {nameTitleInitial}</h3>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openModal}
                >
                  Tạo giảm giá
                </button>
              </div>
              <div className="tableWrapper card-content">
                <Table
                  onRemoveClick={handleRemoveClick}
                  onEditClick={handleEditClick}
                  discount={currentItems}
                  params={params}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {loadingDisCount ? null : (
              <Pagination
                currentPage={currentPage}
                totalCount={storeDisCount.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
                title={nameTitleInitial}
                setTitle={setDocTitle}
              />
            )}
          </div>
        </div>
      </section>
      <AddEdit
        onSubmit={onSubmit}
        initialValues={initialValues}
        isAddMode={isAddMode}
        modal={modal}
        setModal={setModal}
        books={storeBook}
        loadingBook={loadingBooks}
      />
    </>
  );
}

export default DisCount;
