import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Table } from "reactstrap";

TableSachNhapKho.propTypes = {};

function TableSachNhapKho(props) {
  const { label, data, loading } = props;

  const defaultSorted = [
    {
      dataField: `${Number("import")}`,
      order: "asc",
    },
  ];
  const pageOptions = {
    sizePerPage: 10,
    totalSize: data ? data.length : 0,
    custom: true,
  };
  const columnsOrder = [
    {
      text: "#",
      dataField: "stt",
      sort: true,
      formatter: (name, data, row) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{row + 1}</p>
        </>
      ),
      headerClasses: "table-light",
    },
    {
      text: "Tên Sách",
      dataField: "name",
      sort: true,
      formatter: (name, data) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{name}</p>
        </>
      ),
      headerClasses: "table-light",
    },
    {
      text: "Số lượng nhập",
      dataField: "import",
      sort: true,
      formatter: (item, data) => (
        <>
          <p className="d-inline-block text-truncate mb-0">
            {item}
          </p>
        </>
      ),
      headerClasses: "table-light",
    },
    {
      text: "Số lượng tồn",
      dataField: "quantity_in_stock",
      sort: true,
      formatter: (quantity_in_stock, data) => (
        <>
          <p className="d-inline-block text-truncate mb-0">{quantity_in_stock}</p>
        </>
      ),
      headerClasses: "table-light",
    },
  ];
  return (
    <div className="card h-100">
      <div className="card-header">
        <h3>{label}</h3>
        <i className="fas fa-ellipsis-h" />
      </div>
      <div className="card-content">
        {data && data.length > 0 ? (
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField="id"
            columns={columnsOrder}
            data={data}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                data={data}
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
                            {loading
                              ? "Đang tải dữ liệu vui lòng chờ ..."
                              : "Không tìm thấy đơn hàng."}
                          </div>
                        )}
                        bordered={false}
                        striped={false}
                        responsive
                      />
                    </div>
                    <div className="custom-pagination pagination pagination-rounded justify-content-end mb-2">
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
                <th scope="col">#</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Số lượng nhập</th>
                <th scope="col">Số lượng tồn</th>
              </tr>
            </thead>
            {loading ? (
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
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Không tìm thấy đơn hàng.
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        )}
      </div>
    </div>
  );
}

export default TableSachNhapKho;
