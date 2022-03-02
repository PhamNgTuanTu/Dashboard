import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";
import Swal from "sweetalert2";
import categoryApi from "../../api/categoryApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import InputSearch from "../../components/search/inputSearch";
import {
  addCategory,
  editCategory,
  removeCategory,
  setDataCate,
  setLoadingData
} from "../../store/category";
import AddEdit from "./AddEdit";
import View from "./View";
let nameFilter = () => {};

Category.propTypes = {};

function Category(props) {
  const nameTitleInitial = "Quản lý thể loại";
  useDocTitle(nameTitleInitial);

  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // id category edit
  const [idEdit, setIdEdit] = useState();

  //lấy danh sách category từ store lên form edit
  const { category } = useSelector((state) => state.category);

  // loading
  const { loadingPage } = useSelector((state) => state.category);

  // kiểm tra tính năng add hay edit
  const [isAddMode, setIsAddMode] = useState(true);

  // lấy id từ button edit
  const categoryEdit = category.find((x) => x.id === idEdit);

  // giá trị ban đầu của form
  let initialValues = isAddMode
    ? {
        name: "",
        description: "",
      }
    : categoryEdit;

  // nếu xóa thì initialValues trả giá trị mặc định
  if (initialValues) {
  } else {
    initialValues = {
      name: "",
      description: "",
    };
  }

  const [params, setParams] = useState({
    name: "",
  });

  const defaultSorted = [
    {
      dataField: `${Number("id")}`,
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: category.length,
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
      text: "Tên thể loại",
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
    if (typeof nameFilter == "function" && category.length > 0) {
      nameFilter(params.name);
    }
    // eslint-disable-next-line
  }, [params]);


  //load data lên store
  useEffect(() => {
    async function LoadData() {
      try {
        const response = await categoryApi.getAll();
        dispatch(setDataCate(response.data));
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
    window.$("#addAndEditCategory").modal("show");
    setIsAddMode(true);
  };

  // submit data add and edit category
  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    if (isAddMode) {
      categoryApi
        .addCate(values)
        .then((response) => {
          if (response.success) {
            setLoading(false);
            dispatch(addCategory(response.data));
            resetForm(initialValues);
            modalSuccess(response.message);
            window.$("#addAndEditCategory").modal("hide");
          }
        })
        .catch((error) => {
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
        });
      return;
    } else {
      categoryApi
        .editCate(values, idEdit)
        .then((response) => {
          if (response.success) {
            dispatch(editCategory(response.data));
            setLoading(false);
            modalSuccess(response.message);
            window.$("#addAndEditCategory").modal("hide");
          }
        })
        .catch((error) => {
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
        });
    }
  };

  //xóa category
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
        categoryApi
          .removeCate(id)
          .then((response) => {
            if (response.status === 204) {
              dispatch(removeCategory(id));
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
    window.$("#addAndEditCategory").modal("show");
    setIsAddMode(false);
    setIdEdit(id);
  };

  //view
  const [dataView, setDataView] = useState();
  const handleViewClick = (id) => {
    const authorsView = category.find((x) => x.id === id);
    setDataView(authorsView);
    window.$("#viewInfocate").modal("show");
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
          <div className="col-12">
            <InputSearch
              value={params}
              setValues={setParams}
              label="Tên thể loại"
              placeholder="nhập tên thể loại"
              name="name"
              type="text"
            />
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
                  Thêm Thể Loại
                </button>
              </div>
              <div className="tableWrapper card-content">
                <div className="table-responsive">
                  {category && category.length > 0 ? (
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columnDisplay}
                      data={category}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          data={category}
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
                          <th scope="col">Tên thể loại</th>
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
                              Không tìm thấy thể loại.
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
      <View data={dataView} />
    </>
  );
}

export default Category;
