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

PaneTableDaXacNhan.propTypes = {};

const optionTrangThai = [
  { value: 0, label: "Đã hủy" },
  { value: 1, label: "Chờ xác nhận" },
  { value: 2, label: "Đã tiếp nhận" },
  { value: 3, label: "Đang giao hàng" },
  { value: 4, label: "Hoàn thành" },
  { value: 5, label: "Giao thất bại" },
];

let statusFilterDaXacNhan = () => {};
let nameFilterDaXacNhan = () => {};
let phoneFilterDaXacNhan = () => {};
let emailFilterDaXacNhan = () => {};

function PaneTableDaXacNhan(props) {
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
          nameFilterDaXacNhan = filter;
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
          phoneFilterDaXacNhan = filter;
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
          emailFilterDaXacNhan = filter;
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
          <p className="d-inline-block text-truncate mb-0">{total_payment}</p>
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
          {status === 1 ? <Badge color="primary">Chờ xác nhận</Badge> : null}
          {status === 2 ? <Badge color="success">Đã xác nhận</Badge> : null}
          {status === 3 ? <Badge color="light">Đang giao</Badge> : null}
          {status === 4 ? <Badge color="success">Hoàn thành</Badge> : null}
          {status === 5 ? <Badge color="danger">Giao thất bại</Badge> : null}
        </>
      ),
      filter: selectFilter({
        options: optionTrangThai,
        getFilter: (filter) => {
          statusFilterDaXacNhan = filter;
        },
        style: { display: "none" },
      }),
      headerClasses: "table-light",
    },
  ];

  useEffect(() => {
    if (typeof statusFilterDaXacNhan == "function" && value.length > 0) {
      statusFilterDaXacNhan(params.status);
      nameFilterDaXacNhan(params.name);
      phoneFilterDaXacNhan(params.phone);
      emailFilterDaXacNhan(params.email);
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
                        noDataIndication={() => (
                          <div style={{ textAlign: "center" }}>
                            Không tìm thấy đơn hàng phù hợp với tìm kiếm.
                          </div>
                        )}
                        classes={
                          "table align-middle table-nowrap table-hover bg-select-row"
                        }
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
              </tr>
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default PaneTableDaXacNhan;
