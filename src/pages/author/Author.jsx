import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Table } from "reactstrap";
import Swal from "sweetalert2";
import authorApi from "../../api/authorApi";
import imageApi from "../../api/imageApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import InputSearch from "../../components/search/inputSearch";
import {
  addAuthor,
  editAuthor,
  removeAuthor,
  setDataAuthor,
  setLoadingData,
} from "../../store/author";
import AddEdit from "./AddEdit";
import View from "./View";
let nameFilter = () => {};

Author.propTypes = {};

function Author(props) {
  const nameTitleInitial = "Quản lý tác Giả";
  useDocTitle(nameTitleInitial);

  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [description, setDescription] = useState();
  const [hideText, setHideText] = useState(false);

  const [params, setParams] = useState({
    name: "",
  });
  // id author edit
  const [idEdit, setIdEdit] = useState();

  //lấy danh sách tác giả từ store
  const { authors } = useSelector((state) => state.author);

  const defaultSorted = [
    {
      dataField: `${Number("id")}`,
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: authors.length,
    custom: true,
  };

  const columnDisplay = [
    {
      text: "",
      dataField: "id",
      sort: true,
      formatter: (id, storeDataOrder, row) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{row + 1}</p>
        </>
      ),
      classes: "d-none",
      headerClasses: "table-light d-none",
    },
    {
      text: "#",
      dataField: "stt",
      sort: true,
      formatter: (id, storeDataOrder, row) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{row + 1}</p>
        </>
      ),
      headerClasses: "table-light",
    },
    {
      text: "Tên tác giả",
      dataField: "name",
      sort: true,
      formatter: (name, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{name}</p>
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          nameFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
    {
      text: "",
      dataField: "",
      formatter: (id, storeDataOrder) => (
        <div className="d-flex align-items-center justify-content-center">
          <Button
            color="primary"
            onClick={() => handleEditClick(storeDataOrder.id)}
          >
            <i className="bx bxs-edit"></i>
          </Button>
          <Button
            color="danger"
            className="mr-2 ml-2"
            onClick={() => handleRemoveClick(storeDataOrder.id)}
          >
            <i className="bx bx-trash"></i>
          </Button>
          <Button
            color="info"
            onClick={() => handleViewClick(storeDataOrder.id)}
          >
            <i className="bx bx-show"></i>
          </Button>
        </div>
      ),
      headerClasses: "table-light",
    },
  ];

  useEffect(() => {
    if (typeof nameFilter == "function" && authors.length > 0) {
      nameFilter(params.name);
    }
    // eslint-disable-next-line
  }, [params]);

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

  //load data lên store
  useEffect(() => {
    async function LoadData() {
      try {
        const response = await authorApi.getAll();
        dispatch(setDataAuthor(response.data));
        dispatch(setLoadingData(false));
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
    setIsAddMode(false);
    setIdEdit(id);
    window.$("#addAndEditAuthor").modal("show");
  };

  // mở modal lên sau đó load data
  const handleViewClick = (id) => {
    const authorsView = authors.find((x) => x.id === id);
    setDescription(authorsView);
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
          <Col md="12">
            <InputSearch
              value={params}
              setValues={setParams}
              label="Tên tác giả"
              placeholder="nhập tên tác giả"
              name="name"
              type="text"
            />
          </Col>
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
                <div className="table-responsive">
                  {authors && authors.length > 0 ? (
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columnDisplay}
                      data={authors}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          data={authors}
                          columns={columnDisplay}
                          bootstrap4
                          search
                        >
                          {(toolkitProps) => (
                            <React.Fragment>
                              <div className="table-responsive">
                                <BootstrapTable
                                  keyField="id"
                                  {...toolkitProps.baseProps}
                                  {...paginationTableProps}
                                  defaultSorted={defaultSorted}
                                  filter={filterFactory()}
                                  classes={
                                    "table align-middle table-nowrap table-hover bg-select-row"
                                  }
                                  noDataIndication={() => (
                                    <div
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      {loadingPage
                                        ? "Đang tải dữ liệu vui lòng chờ ..."
                                        : "Không tìm thấy dữ liệu."}
                                    </div>
                                  )}
                                  bordered={false}
                                  striped={false}
                                  responsive
                                  // selectRow={selectRow}
                                />
                              </div>
                              <div>
                                {" "}
                                {loadingPage ? (
                                  <table className="tg"></table>
                                ) : null}
                              </div>
                              <div className="custom-pagination pagination pagination-rounded justify-content-end mb-2">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </div>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  ) : (
                    <Table>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên tác giả</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {loadingPage ? (
                        <tbody>
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
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
                              Không tìm thấy tác giả.
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </Table>
                  )}
                </div>
              </div>
            </div>
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
