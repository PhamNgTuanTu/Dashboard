import React, { useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Badge, Col, Row, Table } from "reactstrap";
import filterFactory, {
  selectFilter,
  textFilter,
} from "react-bootstrap-table2-filter";

PaneTableHoanThanh.propTypes = {};

let statusFilterHoanThanh = () => {};
let nameFilterHoanThanh = () => {};
let phoneFilterHoanThanh = () => {};
let emailFilterHoanThanh = () => {};
let orderIdFilter = () => {};

const optionTrangThai = [
  { value: 0, label: "Người dùng hủy đơn" },
  { value: 1, label: "Chờ xác nhận" },
  { value: 2, label: "Đã xác nhận" },
  { value: 3, label: "Đang vận chuyển" },
  { value: 4, label: "Hoàn thành" },
  { value: 5, label: "Giao thất bại" },
  { value: 6, label: "Quản trị viên hủy đơn" },
];

function PaneTableHoanThanh(props) {
  let { value, defaultSorted, setArrChoose, setModal, params } = props;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: value.length,
    custom: true,
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

  const columnsOrderPane = [
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
          nameFilterHoanThanh = filter;
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
          phoneFilterHoanThanh = filter;
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
          emailFilterHoanThanh = filter;
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
          {Number(status) === 4 ? (
            <Badge color="success">Hoàn thành</Badge>
          ) : null}
        </>
      ),
      filter: selectFilter({
        options: optionTrangThai,
        getFilter: (filter) => {
          statusFilterHoanThanh = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
  ];

  useEffect(() => {
    if (typeof statusFilterHoanThanh == "function" && value.length > 0) {
      statusFilterHoanThanh(params.status);
      nameFilterHoanThanh(params.name);
      phoneFilterHoanThanh(params.phone);
      emailFilterHoanThanh(params.email);
      orderIdFilter(params.order);
    }
    // eslint-disable-next-line
  }, [params]);

  return (
    <Row>
      <Col sm="12">
        {value.length > 0 ? (
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField="id"
            columns={columnsOrderPane}
            data={value}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                data={value}
                columns={columnsOrderPane}
                bootstrap4
                search
              >
                {(toolkitProps) => (
                  <React.Fragment>
                    <div className="table-responsive">
                      <BootstrapTable
                        {...toolkitProps.baseProps}
                        {...paginationTableProps}
                        keyField="id"
                        defaultSorted={defaultSorted}
                        filter={filterFactory()}
                        classes={
                          "table align-middle table-nowrap table-hover bg-select-row"
                        }
                        noDataIndication={() => (
                          <div style={{ textAlign: "center" }}>
                            Không tìm thấy đơn hàng phù hợp với tìm kiếm.
                          </div>
                        )}
                        selectRow={selectRowDonHang}
                        bordered={false}
                        striped={false}
                        responsive
                      />
                    </div>
                    <div className="pagination pagination-rounded justify-content-end mb-2">
                      <PaginationListStandalone {...paginationProps} />
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
                <th scope="col">Email</th>
                <th scope="col">Tổng cộng</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Không có đơn hàng loại này.
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default PaneTableHoanThanh;
