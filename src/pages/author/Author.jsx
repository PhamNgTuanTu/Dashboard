import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import authorApi from "../../api/authorApi";
import imageApi from "../../api/imageApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { GetPageFromUrl } from "../../components/convert-url/GetPageFromUrl";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import Pagination from "../../components/paginate/Pagination";
import Search from "../../components/search/SearchTable";
import {
  addAuthor,
  editAuthor,
  removeAuthor,
  setDataAuthor,
  setLoadingData,
  setPageAuthor,
} from "../../store/author";
import AddEdit from "./AddEdit";
import Table from "./TableAuthor";
import View from "./View";

Author.propTypes = {};

function Author(props) {
  const nameTitleInitial = "Quản lý tác Giả";
  const [, setDocTitle] = useDocTitle(nameTitleInitial);

  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // id author edit
  const [idEdit, setIdEdit] = useState();

  //lấy danh sách tác giả từ store
  const { authors } = useSelector((state) => state.author);

  // loading
  const { loadingPage } = useSelector((state) => state.author);

  // kiểm tra tính năng add hay edit
  const [isAddMode, setIsAddMode] = useState(true);

  // lấy id từ button edit
  const authorsEdit = authors.find((x) => x.id === idEdit);

  // giá trị ban đầu của form
  let initialValues = isAddMode
    ? {
        name: "",
        description: "",
        image: "",
      }
    : authorsEdit;

  // nếu xóa thì initialValues trả giá trị mặc định
  if (initialValues) {
  } else {
    initialValues = {
      name: "",
      description: "",
      image: "",
    };
  }

  // lấy numberPage trên url
  const location = useLocation();

  //lấy ra số page từ store
  const { page } = useSelector((state) => state.author);

  //paginate
  let [PageSize, setPageSize] = useState(page);
  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = authors.slice(firstPageIndex, lastPageIndex);

  //get page từ url
  const pageFromUrl = GetPageFromUrl(location.search);

  //load data lên store
  useEffect(() => {
    async function LoadData() {
      try {
        const response = await authorApi.getAll();
        dispatch(setDataAuthor(response.data));
        dispatch(setLoadingData(false));
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
    window.$("#addAndEditAuthor").modal("show");
    setIsAddMode(true);
  };

  const isFile = (input) => "File" in window && input instanceof File;

  // submit data add and edit suppliers
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    if (isAddMode) {
      try {
        let Image = "";
        try {
          let resImage = await imageApi.addImageApi(values.image, 2);
          Image = resImage.data;
        } catch (error) {
          if (error.response.status === 422) {
            modalError(error.response.data.errors["image"]);
          }
        }
        let arr = {
          name: values.name,
          image: Image,
          description: values.description,
        };
        const response = await authorApi.addAuthorApi(arr);
        setLoading(false);
        dispatch(addAuthor(response.data));
        resetForm(initialValues);
        modalSuccess(response.message);
        window.$("#addAndEditAuthor").modal("hide");
      } catch (error) {
        if (error.response.status === 422) {
          const arrError = Object.keys(initialValues);
          for (let i = 0; i < arrError.length; i++) {
            if (error.response.data.errors[`${arrError[i]}`]) {
              modalError(error.response.data.errors[`${arrError[i]}`]);
              setLoading(false);
            }
          }
        }
        if (error.response.status === 500) {
          modalError(error.response.data.message);
          setLoading(false);
        }
      }
    } else {
      try {
        let ImageForm = "";
        if (isFile(values.image)) {
          try {
            let resImage = await imageApi.addImageApi(values.image, 2);
            ImageForm = resImage.data;
          } catch (error) {
            if (error.response.status === 422) {
              modalError(error.response.data.errors["image"]);
            }
          }
        } else {
          ImageForm = values.image;
        }
        let arr = {
          name: values.name,
          image: ImageForm,
          description: values.description,
        };
        const response = await authorApi.editAuthorApi(arr, idEdit);
        dispatch(editAuthor(response.data));
        setLoading(false);
        modalSuccess(response.message);
        window.$("#addAndEditAuthor").modal("hide");
      } catch (error) {
        if (error.response.status === 422) {
          const arrError = Object.keys(initialValues);
          for (let i = 0; i < arrError.length; i++) {
            if (error.response.data.errors[`${arrError[i]}`]) {
              modalError(error.response.data.errors[`${arrError[i]}`]);
              setLoading(false);
            }
          }
        }
        if (error.response.status === 500) {
          modalError(error.response.data.message);
          setLoading(false);
        }
      }
    }
  };

  //xóa author
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
        authorApi
          .removeAuthorApi(id)
          .then((response) => {
            if (response.status === 204) {
              dispatch(removeAuthor(id));
              setLoadingDelete(false);
              modalSuccess("Xóa Thành Công !");
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              modalError(error.response.data.message);
              setLoadingDelete(false);
            }
          });
      }
    });
  };

  // mở modal lên sau đó load data
  const handleEditClick = (id) => {
    window.$("#addAndEditAuthor").modal("show");
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
    dispatch(setPageAuthor(Number(e.target.value)));
  };

  const [description, setDescription] = useState();
  const [hideText, setHideText] = useState(false);

  const handleViewClick = (id) => {
    const authorsView = authors.find((x) => x.id === id);
    setDescription(authorsView);
    setHideText(false);
    window.$("#viewInfoAuthor").modal("show");
  };

  const handelView = () => {
    setHideText(!hideText);
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
              SearchCaption={"tác giả"}
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
                  Thêm Tác Giả
                </button>
              </div>
              <div className="tableWrapper card-content">
                <Table
                  onRemoveClick={handleRemoveClick}
                  onEditClick={handleEditClick}
                  onViewClick={handleViewClick}
                  searchValue={searchValue}
                  authors={currentItems}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {loadingPage ? null : (
              <Pagination
                currentPage={currentPage}
                totalCount={authors.length}
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
        isLoading={Loading}
        isAddMode={isAddMode}
      />
      <View
        description={description}
        handelView={handelView}
        hideText={hideText}
      />
    </>
  );
}

export default Author;
