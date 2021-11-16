import classnames from "classnames";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  selectFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  Badge,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";
import Swal from "sweetalert2";
import orderApi from "../../api/orderApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import PaneTableChoXacNhan from "../../components/paneOrder/PaneTableChoXacNhan";
import PaneTableDangGiao from "../../components/paneOrder/PaneTableDangGiao";
import PaneTableDaXacNhan from "../../components/paneOrder/PaneTableDaXacNhan";
import PaneTableGiaoThatBai from "../../components/paneOrder/PaneTableGiaoThatBai";
import PaneTableHoanThanh from "../../components/paneOrder/PaneTableHoanThanh";
import InputSearch from "../../components/search/inputSearch";
import SelectSearch from "../../components/search/selectSearch";
import { setDataOder, setLoadingData, setStatusOder } from "../../store/order";
import View from "./ViewDetail";
import warehouseApi from "../../api/warehouseApi";
import { addWareHouse } from "../../store/warehouse";

Order.propTypes = {};

const optionTrangThai = [
  { value: 0, label: "Người dùng hủy đơn" },
  { value: 1, label: "Chờ xác nhận" },
  { value: 2, label: "Đã xác nhận" },
  { value: 3, label: "Đang vận chuyển" },
  { value: 4, label: "Hoàn thành" },
  { value: 5, label: "Giao thất bại" },
  { value: 6, label: "Quản trị viên hủy đơn" },
];

const nameTabsHeader = [
  { id: 0, name: "Tất cả đơn", color: "#007bff" },
  { id: 1, name: "Chờ xác nhận", color: "#ffc107" },
  { id: 2, name: "Đã xác nhận", color: "#17a2b8" },
  { id: 3, name: "Đang vận chuyển", color: "#6c757d" },
  { id: 4, name: "Đơn hoàn thành", color: "#28a745" },
  { id: 5, name: "Đơn thất bại", color: "#dc3545" },
];

let statusFilter = () => {};
let nameFilter = () => {};
let orderIdFilter = () => {};
let phoneFilter = () => {};
let emailFilter = () => {};

function Order(props) {
  const nameTitleInitial = "Quản lý đơn hàng";
  useDocTitle(nameTitleInitial);

  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const query = queryString.parse(location.search);
  const value = query.loai;

  let { storeDataOrder, loadingPageOrder } = useSelector((state) => ({
    storeDataOrder: state.orders.order,
    loadingPageOrder: state.orders.loadingPage,
  }));

  const [params, setParams] = useState({
    name: "",
    phone: "",
    status: "",
    email: "",
    order: "",
  });

  const [activeTab, setActiveTab] = useState(0);
  const [modal, setModal] = useState(false);
  const [arrChoose, setArrChoose] = useState([]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    if (tab === 0) {
      history.push("/order");
    } else if (tab === 1) {
      history.push("/order?loai=cho-xac-nhan");
    } else if (tab === 2) {
      history.push("/order?loai=da-xac-nhan");
    } else if (tab === 3) {
      history.push("/order?loai=dang-van-chuyen");
    } else if (tab === 4) {
      history.push("/order?loai=da-hoan-thanh");
    } else {
      history.push("/order?loai=giao-that-bai");
    }
  };

  const selectRowDonHang = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row) => {
      setArrChoose(row);
      setModal(true);
    },
    classes: "đang-chon",
    bgColor: "#eef0fc",
  };

  const defaultSorted = [
    {
      dataField: `${Number("id")}`,
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: storeDataOrder.length,
    custom: true,
  };

  const covertArray = (dara) => {
    let arr = dara.map((val) => {
      return {
        id: val.value,
        name: val.label,
      };
    });
    return arr;
  };

  const columnsOrder = [
    {
      text: "Mã hóa đơn",
      dataField: "id",
      sort: true,
      formatter: (id, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">#{id}</p>
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          orderIdFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
    {
      text: "Tên khách hàng",
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
      text: "Số điện thoại",
      dataField: "phone",
      sort: true,
      formatter: (phone, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{phone}</p>
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          phoneFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
    {
      text: "Email",
      dataField: "user",
      sort: true,
      formatter: (user, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{user}</p>
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          emailFilter = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
    {
      text: "Tổng cộng",
      dataField: "total_payment",
      sort: true,
      formatter: (total_payment, storeDataOrder) => (
        <>
          <p className="d-inline-block text-truncate mb-0">
            {Number(total_payment).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
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
          {Number(status) === 0 ? (
            <Badge color="danger">Người dùng hủy đơn</Badge>
          ) : null}
          {Number(status) === 1 ? (
            <Badge color="warning">Chờ xác nhận</Badge>
          ) : null}
          {Number(status) === 2 ? (
            <Badge color="info">Đã xác nhận</Badge>
          ) : null}
          {Number(status) === 3 ? <Badge color="light">Đang giao</Badge> : null}
          {Number(status) === 4 ? (
            <Badge color="success">Hoàn thành</Badge>
          ) : null}
          {Number(status) === 5 ? (
            <Badge color="danger">Giao thất bại</Badge>
          ) : null}
          {Number(status) === 6 ? (
            <Badge color="danger">Quản trị viên hủy đơn</Badge>
          ) : null}
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
  ];

  const filterValue = (data, id) => {
    let arr = [];
    if (data && JSON.stringify(data) !== "[]") {
      data.forEach((val, i) => {
        if (Number(val.status) === Number(id)) {
          arr.push(val);
        }
      });
    }
    return arr;
  };

  const filterValueFalse = (data) => {
    let arr = [];
    if (data && JSON.stringify(data) !== "[]") {
      data.forEach((val, i) => {
        if (
          Number(val.status) === 0 ||
          Number(val.status) === 5 ||
          Number(val.status) === 6
        ) {
          arr.push(val);
        }
      });
    }
    return arr;
  };

  const functionNhapKho = async (data, id, note) => {
    if (JSON.stringify(data) !== "[]") {
      let arrItems = [];
      data.items.forEach((val) => {
        arrItems.push({
          book_id: val.book_id,
          quantity: Number(val.quantity),
          import_unit_price: Number(val.unit_price),
        });
      });
      let arr = {
        formality: 2,
        supplier_id: "",
        total: 0,
        note: note,
        items: arrItems,
      };
      try {
        const res = await warehouseApi.addWare(arr);
        dispatch(addWareHouse(res.data));
      } catch (error) {}
    }
  };

  const functionUpdateStatus = async (status, id) => {
    setLoading(true);
    try {
      const response = await orderApi.editOrder({ status: Number(status) }, id);
      dispatch(setStatusOder(Number(status), id));
      setLoading(false);
      modalSuccess(response.message);
      setModal(false);
    } catch (error) {
      if (error.response.status === 422) {
        modalError(error.response.data.message);
        setLoading(false);
        setModal(false);
      }
      if (error.response.status === 404) {
        modalError(error.response.data.message);
        setLoading(false);
        setModal(false);
      }
    }
  };

  const handleHuyDon = (id) => {
    Swal.fire({
      title: "Hủy đơn hàng",
      text: "Bạn không thể hoàn tác đơn hàng !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn hủy",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        functionNhapKho(
          arrChoose,
          id,
          `Trả hàng do hóa đơn #${id} bị hủy bởi quản trị viên !`
        );
        functionUpdateStatus(6, id);
      }
    });
  };

  const handleHuyDonShip = (id) => {
    Swal.fire({
      title: "Hủy đơn hàng",
      text: "Xác nhận giao hàng thất bại ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        functionNhapKho(
          arrChoose,
          id,
          `Trả hàng do hóa đơn #${id} giao hàng thất bại !`
        );
        functionUpdateStatus(5, id);
      }
    });
  };

  const handleUpdateStatus = (id, status) => {
    setLoading(true);
    orderApi
      .editOrder({ status: status }, id)
      .then((response) => {
        if (response.success) {
          dispatch(setStatusOder(status, id));
          setLoading(false);
          modalSuccess(response.message);
          setModal(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          modalError(error.response.data.message);
          setLoading(false);
          setModal(false);
        }
        if (error.response.status === 404) {
          modalError(error.response.data.message);
          setLoading(false);
          setModal(false);
        }
      });
  };

  useEffect(() => {
    if (value && typeof value !== "undefined") {
      if (value === "cho-xac-nhan") {
        setActiveTab(1);
      } else if (value === "da-xac-nhan") {
        setActiveTab(2);
      } else if (value === "dang-van-chuyen") {
        setActiveTab(3);
      } else if (value === "da-hoan-thanh") {
        setActiveTab(4);
      } else if (value === "giao-that-bai") {
        setActiveTab(5);
      }
    } else {
      setActiveTab(0);
    }
  }, [value]);

  //load data lên store
  useEffect(() => {
    async function LoadData() {
      try {
        const response = await orderApi.getAll();
        dispatch(setDataOder(response.data));
        dispatch(setLoadingData(false));
      } catch (error) {
        console.error(error);
      }
    }
    LoadData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (typeof statusFilter == "function" && storeDataOrder.length > 0) {
      statusFilter(params.status);
      nameFilter(params.name);
      phoneFilter(params.phone);
      emailFilter(params.email);
      orderIdFilter(params.order);
    }
    // eslint-disable-next-line
  }, [params]);

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
                />
              </Col>
              <Col md="6">
                <InputSearch
                  value={params}
                  setValues={setParams}
                  label="Mã hóa đơn"
                  placeholder="#"
                  name="order"
                  type="text"
                />
              </Col>
            </Row>
          </div>
          <Col md="6">
            <InputSearch
              value={params}
              setValues={setParams}
              label="Email"
              placeholder="Nhập email..."
              name="email"
              type="text"
            />
          </Col>
        </div>
        <Row>
          <Col md="6">
            <InputSearch
              value={params}
              setValues={setParams}
              label="Tên khách hàng"
              placeholder="Nhập tên khách hàng..."
              name="name"
              type="text"
            />
          </Col>
          <Col md="6">
            <InputSearch
              value={params}
              setValues={setParams}
              label="Số điện thoại khách hàng"
              placeholder="Nhập số điện thoại ..."
              name="phone"
              type="number"
            />
          </Col>
        </Row>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>{nameTitleInitial}</h3>
              </div>
              <div className="tableWrapper card-content">
                <div>
                  <Row>
                    <Col xl="12" md="12">
                      <Nav tabs>
                        {nameTabsHeader.map((val, i) => {
                          return (
                            <NavItem style={{ cursor: "pointer" }} key={i}>
                              <NavLink
                                style={{ color: `${val.color}` }}
                                className={classnames({
                                  active: activeTab === val.id,
                                })}
                                onClick={() => {
                                  toggle(val.id);
                                }}
                              >
                                {val.name}
                              </NavLink>
                            </NavItem>
                          );
                        })}
                      </Nav>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="12" md="12">
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId={0}>
                          <Row>
                            <Col sm="12">
                              {storeDataOrder.length > 0 ? (
                                <PaginationProvider
                                  pagination={paginationFactory(pageOptions)}
                                  keyField="id"
                                  columns={columnsOrder}
                                  data={storeDataOrder}
                                >
                                  {({
                                    paginationProps,
                                    paginationTableProps,
                                  }) => (
                                    <ToolkitProvider
                                      keyField="id"
                                      data={storeDataOrder}
                                      columns={columnsOrder}
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
                                                  {loadingPageOrder
                                                    ? "Đang tải dữ liệu vui lòng chờ ..."
                                                    : "Không tìm thấy đơn hàng."}
                                                </div>
                                              )}
                                              bordered={false}
                                              striped={false}
                                              responsive
                                              selectRow={selectRowDonHang}
                                            />
                                          </div>
                                          <div>
                                            {" "}
                                            {loadingPageOrder ? (
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
                                      <th scope="col">Tên khách hành</th>
                                      <th scope="col">Số điện thoại</th>
                                      <th scope="col">Phí vận chuyển</th>
                                      <th scope="col">Tổng giá sách</th>
                                      <th scope="col">Tổng cộng</th>
                                      <th scope="col">Trạng thái</th>
                                    </tr>
                                  </thead>
                                  {loadingPageOrder ? (
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
                                      </tr>
                                    </tbody>
                                  ) : (
                                    <tbody>
                                      <tr>
                                        <td
                                          colSpan="8"
                                          style={{ textAlign: "center" }}
                                        >
                                          Không tìm thấy đơn hàng.
                                        </td>
                                      </tr>
                                    </tbody>
                                  )}
                                </Table>
                              )}
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId={1}>
                          <PaneTableChoXacNhan
                            value={filterValue(storeDataOrder, 1)}
                            pageOptions={pageOptions}
                            defaultSorted={defaultSorted}
                            setArrChoose={setArrChoose}
                            setModal={setModal}
                            params={params}
                          />
                        </TabPane>
                        <TabPane tabId={2}>
                          <PaneTableDaXacNhan
                            value={filterValue(storeDataOrder, 2)}
                            pageOptions={pageOptions}
                            defaultSorted={defaultSorted}
                            setArrChoose={setArrChoose}
                            setModal={setModal}
                            params={params}
                          />
                        </TabPane>
                        <TabPane tabId={3}>
                          <PaneTableDangGiao
                            value={filterValue(storeDataOrder, 3)}
                            pageOptions={pageOptions}
                            defaultSorted={defaultSorted}
                            setArrChoose={setArrChoose}
                            setModal={setModal}
                            params={params}
                          />
                        </TabPane>
                        <TabPane tabId={4}>
                          <PaneTableHoanThanh
                            value={filterValue(storeDataOrder, 4)}
                            pageOptions={pageOptions}
                            defaultSorted={defaultSorted}
                            setArrChoose={setArrChoose}
                            setModal={setModal}
                            params={params}
                          />
                        </TabPane>
                        <TabPane tabId={5}>
                          <PaneTableGiaoThatBai
                            value={filterValueFalse(storeDataOrder)}
                            pageOptions={pageOptions}
                            defaultSorted={defaultSorted}
                            setArrChoose={setArrChoose}
                            setModal={setModal}
                            params={params}
                          />
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <View
        modal={modal}
        setModal={setModal}
        arrChoose={JSON.stringify(arrChoose) !== "null" ? arrChoose : null}
        onDeleteClick={handleHuyDon}
        onDeleteClickShip={handleHuyDonShip}
        onUpdateClick={handleUpdateStatus}
      />
    </>
  );
}

export default Order;
