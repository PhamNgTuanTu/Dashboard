import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import bookApi from "../../api/bookApi";
import imageApi from "../../api/imageApi";
import sliderApi from "../../api/sliderApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { GetPageFromUrl } from "../../components/convert-url/GetPageFromUrl";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import Pagination from "../../components/paginate/Pagination";
import Search from "../../components/search/SearchTable";
import {
  setDataBook,
  setLoadingData as setLoadingDataBook,
} from "../../store/book";
import {
  addSliderNha,
  editSliderNha,
  setDataSlider,
  setLoadingData,
  setPageSlider,
  removeSliderNha,
} from "../../store/slider";
import AddEdit from "./AddEdit";
import Table from "./TableSlider";

Slider.propTypes = {};

function Slider(props) {
  const nameTitleInitial = "Quản lý slider";
  const [, setDocTitle] = useDocTitle(nameTitleInitial);

  const dispatch = useDispatch();

  let { storeBook, storeSlider, storePageSlider, loadingSlider, loadingBooks } =
    useSelector((state) => ({
      storeBook: state.book.books,
      storeSlider: state.slider.sliders,
      storePageSlider: state.slider.page,
      loadingSlider: state.slider.loadingPage,
      loadingBooks: state.book.loadingPage,
    }));
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  //mở modal
  const [modal, setModal] = useState(false);

  // id sliders edit
  const [idEdit, setIdEdit] = useState();

  // kiểm tra tính năng add hay edit
  const [isAddMode, setIsAddMode] = useState(true);

  // lấy id từ button edit
  const slidersEdit = storeSlider.find((x) => x.id === idEdit);

  // giá trị ban đầu của form
  let initialValues = isAddMode
    ? {
        name: "",
        start_date: "",
        end_date: "",
        book_id: "",
        image: "",
      }
    : {
        name: slidersEdit.name,
        start_date: slidersEdit.start_date,
        end_date: slidersEdit.end_date,
        book_id: Number(slidersEdit.book.id),
        image: slidersEdit.image,
      };
  // nếu xóa thì initialValues trả giá trị mặc định
  if (initialValues) {
  } else {
    initialValues = {
      name: "",
      start_date: "",
      end_date: "",
      book_id: "",
      image: "",
    };
  }

  // lấy numberPage trên url
  const location = useLocation();

  //paginate
  let [PageSize, setPageSize] = useState(storePageSlider);
  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = storeSlider.slice(firstPageIndex, lastPageIndex);

  //get page từ url
  const pageFromUrl = GetPageFromUrl(location.search);

  //open moadal
  const openModal = () => {
    setModal(!modal);
    setIsAddMode(true);
  };

  //load data lên store
  useEffect(() => {
    async function LoadData() {
      try {
        const response = await sliderApi.getAll();
        const books = await bookApi.getAll();
        dispatch(setDataSlider(response.data));
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

  const isFile = (input) => "File" in window && input instanceof File;

  const onSubmit = async (values) => {
    if (isAddMode) {
      try {
        let imageSlider = "";
        try {
          let resImage = await imageApi.addImageApi(values.image, 4);
          imageSlider = resImage.data;
        } catch (error) {
          if (error.response.status === 422) {
            modalError(error.response.data.errors["image"]);
          }
        }
        let arr = {
          name: values.name,
          start_date: values.start_date,
          end_date: values.end_date,
          book_id: values.book_id,
          image: imageSlider,
        };
        const res = await sliderApi.addSlider(arr);
        dispatch(addSliderNha(res.data));
        modalSuccess(res.message);
        setModal(false);
      } catch (error) {
        if (error.response.status === 422) {
          if (error.response.data.errors["book_id"]) {
            modalError("Sách đã tồn tại slide");
          } else {
            const arrError = Object.keys(initialValues);
            for (let i = 0; i < arrError.length; i++) {
              if (error.response.data.errors[`${arrError[i]}`]) {
                modalError(error.response.data.errors[`${arrError[i]}`]);
              }
            }
          }
        }
        if (error.response.status === 500) {
          modalError(error.response.data.message);
        }
      }
    } else {
      try {
        let imageSlider = "";
        if (isFile(values.image)) {
          try {
            let resImage = await imageApi.addImageApi(values.image, 4);
            imageSlider = resImage.data;
          } catch (error) {
            if (error.response.status === 422) {
              modalError(error.response.data.errors["image"]);
            }
          }
        } else {
          imageSlider = values.image;
        }

        let arr = {
          name: values.name,
          start_date: values.start_date,
          end_date: values.end_date,
          book_id: values.book_id,
          image: imageSlider,
        };
        const res = await sliderApi.editSlider(arr, idEdit);
        dispatch(editSliderNha(res.data));
        modalSuccess(res.message);
        setModal(false);
      } catch (error) {
        if (error.response.status === 422) {
          const arrError = Object.keys(initialValues);
          for (let i = 0; i < arrError.length; i++) {
            if (error.response.data.errors[`${arrError[i]}`]) {
              modalError(error.response.data.errors[`${arrError[i]}`]);
            }
          }
        }
        if (error.response.status === 500) {
          modalError(error.response.data.message);
        }
      }
    }
  };

  //xóa suppliers
  const handleRemoveClick = (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa ?",
      text: "Bạn sẽ không thể khôi phục dữ liệu !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, vẫn xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingDelete(true);
        sliderApi
          .removeSlider(id)
          .then((response) => {
            if (response.status === 204) {
              dispatch(removeSliderNha(id));
              setLoadingDelete(false);
              modalSuccess("Xóa Thành Công !");
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              modalError(error.response.data.message);
              setLoadingDelete(false);
            }
            if (error.response.status === 409) {
              modalError(error.response.data.message);
              setLoadingDelete(false);
            }
          });
      }
    });
  };

  // mở modal lên sau đó load data
  const handleEditClick = (id) => {
    setModal(!modal);
    setIsAddMode(false);
    setIdEdit(id);
  };

  //search
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  //set item trên 1 table
  const selectItem = [3, 5, 10, 20, 50];
  const handleAddrTypeChange = (e) => {
    setPageSize(Number(e.target.value));
    dispatch(setPageSlider(Number(e.target.value)));
  };

  return (
    <>
      {loadingDelete ? (
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
            <Search
              handleSearchChange={handleSearchChange}
              searchValue={searchValue}
              SearchCaption={"sách"}
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
                  Thêm slide
                </button>
              </div>
              <div className="tableWrapper card-content">
                <Table
                  onRemoveClick={handleRemoveClick}
                  onEditClick={handleEditClick}
                  searchValue={searchValue}
                  slider={currentItems}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {loadingSlider ? null : (
              <Pagination
                currentPage={currentPage}
                totalCount={storeSlider.length}
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

export default Slider;
