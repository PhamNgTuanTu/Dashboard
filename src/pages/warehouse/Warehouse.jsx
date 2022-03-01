import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  selectFilter
} from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Col, Row, Table } from "reactstrap";
import Swal from "sweetalert2";
import bookApi from "../../api/bookApi";
import listDataAddBookApi from "../../api/listDataAddBookApi";
import warehouseApi from "../../api/warehouseApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import SelectSearch from "../../components/search/selectSearch";
import {
  setDataBook,
  setLoadingData as setLoadingDataBook
} from "../../store/book";
import { setDataSelect, setLoadingDataSelect } from "../../store/select";
import {
  addWareHouse,
  setDataWare,
  setLoadingData, setStatus
} from "../../store/warehouse";
import AddEdit from "./AddEdit";
import View from "./View";

let statusFilter = () => {};
let hinhthucFilter = () => {};

WareHouse.propTypes = {};

const optionTrangThai = [
  { value: 0, label: "Đã hủy" },
  { value: 1, label: "Đã nhập kho" },
];

const optionHinhThuc = [
  { value: 1, label: "Nhập mới" },
  { value: 2, label: "Trả hàng" },
];

function WareHouse(props) {
  const nameTitleInitial = "Quản lý nhập kho";
  useDocTitle(nameTitleInitial);

  const dispatch = useDispatch();
  const [loadingDelete, setLoadingDelete] = useState(false);

  let {
    storeBook,
    storeWareHouse,
    loadingWare,
    storeDataSelect,
    loadingDataSelect,
  } = useSelector((state) => ({
    storeBook: state.book.books,
    storeWareHouse: state.warehouse.warehouse,
    loadingWare: state.warehouse.loadingPage,
    storeDataSelect: state.select.dataSelect,
    loadingDataSelect: state.select.loadingPage,
  }));
  // console.log("storeDataSelect: ", storeDataSelect);

  // kiểm tra tính năng add hay edit
  const [isAddMode, setIsAddMode] = useState(true);

  // giá trị ban đầu của form
  let initialValues = {
    formality: 1,
    supplier_id: "",
    total: "",
    note: "",
    items: [
      {
        book_id: "",
        quantity: "",
        import_unit_price: "",
      },
    ],
  };

  // nếu xóa thì initialValues trả giá trị mặc định
  if (initialValues) {
  } else {
    initialValues = {
      name: "",
      description: "",
    };
  }


  //mở modal
  const [modal, setModal] = useState(false);

  const [params, setParams] = useState({
    status: "",
    hinh_thuc: "",
    nha_cung_cap: "",
  });

  const covertArray = (dara) => {
    let arr =
      dara &&
      dara.map((val) => {
        return {
          id: val.value,
          name: val.label,
        };
      });
    return arr;
  };

  const defaultSorted = [
    {
      dataField: `${Number("id")}`,
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: storeWareHouse.length,
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
      text: "Hình thức",
      dataField: "formality",
      sort: true,
      formatter: (formality, storeDataOrder) => (
        <>
          {Number(formality) === 1 ? (
            <Badge color="primary">Nhập mới</Badge>
          ) : (
            <Badge color="secondary">Trả hàng</Badge>
          )}
        </>
      ),
      filter: selectFilter({
        options: optionHinhThuc,
        getFilter: (filter) => {
          hinhthucFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
    {
      text: "Người tạo",
      dataField: "by_admin",
      sort: true,
      formatter: (by_admin, storeDataOrder) => <>{by_admin}</>,
      headerClasses: "table-light",
    },
    {
      text: "Nhà cung cấp",
      dataField: "supplier",
      sort: true,
      formatter: (supplier, storeDataOrder) => <>{supplier}</>,
      headerClasses: "table-light",
    },
    {
      text: "Tổng giá nhập",
      dataField: "total",
      sort: true,
      formatter: (total, storeDataOrder) => (
        <>
          {Number(total).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
      headerClasses: "table-light",
    },
    {
      text: "Trạng thái",
      dataField: "status",
      sort: true,
      formatter: (status, storeDataOrder) => (
        <>
          {Number(status) === 1 ? (
            <Badge color="success">Đã nhập kho</Badge>
          ) : (
            <Badge color="light">Đã hủy</Badge>
          )}
        </>
      ),
      filter: selectFilter({
        options: optionTrangThai,
        getFilter: (filter) => {
          statusFilter = filter;
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
            color="danger"
            onClick={() => handleRemoveClick(storeDataOrder.id)}
            disabled={Number(storeDataOrder.status) === 1 ? false : true}
          >
            <i className="bx bx-trash"></i>
          </Button>
          <Button
            color="info"
            className="mr-2 ml-2"
            onClick={() => handleViewClick(storeDataOrder.id)}
          >
            <i className="bx bx-show"></i>
          </Button>
          <Button
            color="info"
            onClick={() => handleEditClick(storeDataOrder.id)}
            disabled={Number(storeDataOrder.status) === 1 ? true : false}
          >
            <i className="bx bx-reset"></i>
          </Button>
        </div>
      ),
      headerClasses: "table-light",
    },
  ];

  useEffect(() => {
    if (typeof statusFilter == "function" && storeWareHouse.length > 0) {
      statusFilter(params.status);
      hinhthucFilter(params.hinh_thuc);
    }
    // eslint-disable-next-line
  }, [params]);

  //load data lên store
  useEffect(() => {
    async function LoadData() {
      try {
        const response = await warehouseApi.getAll();
        const dataSelect = await listDataAddBookApi.getAll();
        const books = await bookApi.getAll();
        dispatch(setDataWare(response.data));
        dispatch(setLoadingData(false));
        dispatch(setDataSelect(dataSelect.data));
        dispatch(setLoadingDataSelect(false));
        dispatch(setDataBook(books.data));
        dispatch(setLoadingDataBook(false));
      } catch (error) {
        console.error(error);
      }
    }
    LoadData();

    // eslint-disable-next-line
  }, [storeWareHouse]);

  //open moadal
  const openModal = () => {
    setModal(!modal);
    setIsAddMode(true);
  };

  //function lọc id sách giống nhau
  const filterItems = (data) => {
    let newobj = data.reduce((a, c) => {
      let filtered = a.filter((el) => el.book_id === c.book_id);
      if (filtered.length > 0) {
        a[a.indexOf(filtered[0])].quantity += +c.quantity;
      } else {
        a.push(c);
      }
      return a;
    }, []);
    return newobj;
  };

  // submit data add and edit WareHouse
  const onSubmit = async (values) => {
    let totalPrice = 0;
    let arrResult = filterItems(values["items"]);
    arrResult.forEach((val) => {
      totalPrice += val.quantity * val.import_unit_price;
    });
    let arr = {
      formality: 1,
      supplier_id: values.supplier_id,
      total: totalPrice,
      note: values.note,
      items: arrResult,
    };
    try {
      const res = await warehouseApi.addWare(arr);
      dispatch(addWareHouse(res.data));
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
  };

  //xóa WareHouse
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
        warehouseApi
          .removeWare(id)
          .then((response) => {
            if (response.status === 204) {
              dispatch(setStatus(0, id));
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
    Swal.fire({
      title: "Hoàn tác phiếu nhập ?",
      text: "Bạn có muốn hoàn tác phiếu nhập này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingDelete(true);
        warehouseApi
          .editWare(id)
          .then((response) => {
            if (response.success) {
              dispatch(setStatus(1, id));
              setLoadingDelete(false);
              modalSuccess(response.message);
            }
          })
          .catch((error) => {
            if (error.response.status === 422) {
              modalError(error.response.data.message);
              setLoadingDelete(false);
            }
            if (error.response.status === 404) {
              modalError(error.response.data.message);
              setLoadingDelete(false);
            }
          });
      }
    });
  };

  //view
  const [dataView, setDataView] = useState();
  const handleViewClick = (id) => {
    const warehouseView = storeWareHouse.find((x) => x.id === id);
    setDataView(warehouseView);
    window.$("#viewInfoware").modal("show");
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
        <Row>
          <Col md="6">
            <SelectSearch
              values={params}
              setValues={setParams}
              label="Lọc theo trạng thái"
              placeholder="Chọn trạng thái ..."
              name="status"
              options={covertArray(optionTrangThai)}
              getLabel={false}
              loading={loadingDataSelect}
            />
          </Col>
          <Col md="6">
            <SelectSearch
              values={params}
              setValues={setParams}
              label="Lọc theo hình thức"
              placeholder="Chọn hình thức ..."
              name="hinh_thuc"
              options={covertArray(optionHinhThuc)}
              getLabel={false}
            />
          </Col>
        </Row>
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
                  Nhập kho
                </button>
              </div>
              <div className="tableWrapper card-content">
                <div className="table-responsive">
                  {storeWareHouse && storeWareHouse.length > 0 ? (
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columnDisplay}
                      data={storeWareHouse}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          data={storeWareHouse}
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
                                      {loadingWare
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
                                {loadingWare ? (
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
                          <th scope="col">Hình thức</th>
                          <th scope="col">Người tạo</th>
                          <th scope="col">Nhà cung cấp</th>
                          <th scope="col">Tổng giá nhập</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      {loadingWare ? (
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
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
                              Không tìm thấy phiếu nhập.
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
        isAddMode={isAddMode}
        modal={modal}
        setModal={setModal}
        dataSelect={storeDataSelect}
        books={storeBook}
      />
      <View data={dataView} />
    </>
  );
}

export default WareHouse;
