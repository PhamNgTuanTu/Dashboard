import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Badge, Button, Table } from "reactstrap";
import Swal from "sweetalert2";
import bookApi from "../../api/bookApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import InputSearch from "../../components/search/inputSearch";
import { removeBooks } from "../../store/book";
import View from "./View";

let nameFilter = () => {};

Books.propTypes = {};

function Books(props) {
  const nameTitleInitial = "Quản lý sách";
  useDocTitle(nameTitleInitial);

  const dispatch = useDispatch();
  const history = useHistory();
  let { path } = useRouteMatch();
  const [loadingDelete, setLoadingDelete] = useState(false);

  //lấy danh sách suppliers từ store lên form edit
  const { books } = useSelector((state) => state.book);

  // loading
  const { loadingPage } = useSelector((state) => state.book);

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
    totalSize: books.length,
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
      text: "Tên sách",
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
      text: "Giảm giá",
      dataField: "discount",
      sort: true,
      formatter: (discount, storeDataOrder) => (
        <>
          {Number(discount) > 0 ? (
            <Badge color="primary">{`${discount}%`}</Badge>
          ) : (
            <Badge color="light">{`${discount}%`}</Badge>
          )}
        </>
      ),
      headerClasses: "table-light",
    },
    {
      text: "Số lượng tồn",
      dataField: "quantity",
      sort: true,
      formatter: (quantity, storeDataOrder) => <>{storeDataOrder.quantity}</>,
      headerClasses: "table-light",
    },
    {
      text: "Tên thể loại",
      dataField: "category.name",
      sort: true,
      formatter: (category, storeDataOrder) => <>{category}</>,
      headerClasses: "table-light",
    },
    {
      text: "Tên tác giả",
      dataField: "author.name",
      sort: true,
      formatter: (author, storeDataOrder) => <>{author}</>,
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
    if (typeof nameFilter == "function" && books.length > 0) {
      nameFilter(params.name);
    }
    // eslint-disable-next-line
  }, [params]);

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
        bookApi
          .removeBookApi(id)
          .then((response) => {
            if (response.status === 204) {
              dispatch(removeBooks(id));
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

  //xem thông tin sách
  const [arrInfoBook, setArrInfoBook] = useState();
  const [hideText, setHideText] = useState(false);
  const handleViewClick = (id) => {
    const bookView = books.find((x) => x.id === id);
    setArrInfoBook(bookView);
    setHideText(false);
    window.$("#viewInfoBook").modal("show");
  };
  const handelView = () => {
    setHideText(!hideText);
  };

  const handleEditClick = (id) => {
    const booksEdit = books.find((x) => x.id === id);
    const editBookUrl = `${path}/edit-${booksEdit.slug}-${id}.html`;
    history.push(editBookUrl);
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
              label="Tên sách"
              placeholder="nhập tên sách"
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
                <Link to={`${path}/add-book`} className="btn btn-primary">
                  Thêm Sách
                </Link>
              </div>
              <div className="tableWrapper card-content">
                <div className="table-responsive">
                  {books && books.length > 0 ? (
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columnDisplay}
                      data={books}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          data={books}
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
                          <th scope="col">Tên</th>
                          <th scope="col">Giảm giá</th>
                          <th scope="col">Đơn Giá</th>
                          <th scope="col">Tồn</th>
                          <th scope="col">Thể Loại</th>
                          <th scope="col">Tác Giả</th>
                          <th scope="col">Action</th>
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
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
                              Không tìm thấy sách.
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </Table>
                  )}
                </div>
                {/* <Table
                  onRemoveClick={handleRemoveClick}
                  onEditClick={handleEditClick}
                  onViewClick={handleViewClick}
                  searchValue={searchValue}
                  books={currentItems}
                /> */}
              </div>
            </div>
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
