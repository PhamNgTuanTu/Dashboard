import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Swal from "sweetalert2";
import bookApi from "../../api/bookApi";
import listDataAddBookApi from "../../api/listDataAddBookApi";
import warehouseApi from "../../api/warehouseApi";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { GetPageFromUrl } from "../../components/convert-url/GetPageFromUrl";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import Pagination from "../../components/paginate/Pagination";
import SelectSearch from "../../components/search/selectSearch";
import {
  setDataBook,
  setLoadingData as setLoadingDataBook,
} from "../../store/book";
import { setDataSelect, setLoadingDataSelect } from "../../store/select";
import {
  addWareHouse,
  setDataWare,
  setLoadingData,
  setPageWare,
  setStatus,
} from "../../store/warehouse";
import AddEdit from "./AddEdit";
import Table from "./TableWareHouse";
import View from "./View";

WareHouse.propTypes = {};

const optionTrangThai = [
  { id: 1, name: "Đã nhập kho" },
  { id: 0, name: "Đã hủy" },
];

const optionHinhThuc = [
  { id: 1, name: "Nhập mới" },
  { id: 2, name: "Trả hàng" },
];

function WareHouse(props) {
  const nameTitleInitial = "Quản lý nhập kho";
  const [, setDocTitle] = useDocTitle(nameTitleInitial);

  const dispatch = useDispatch();
  const [loadingDelete, setLoadingDelete] = useState(false);

  let {
    storeBook,
    storeWareHouse,
    storePageWare,
    loadingWare,
    storeDataSelect,
    loadingDataSelect
  } = useSelector((state) => ({
    storeBook: state.book.books,
    storeWareHouse: state.warehouse.warehouse,
    storePageWare: state.warehouse.page,
    loadingWare: state.warehouse.loadingPage,
    storeDataSelect: state.select.dataSelect,
    loadingDataSelect : state.select.loadingPage,
  }));


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

  // lấy numberPage trên url
  const location = useLocation();


  //paginate
  let [PageSize, setPageSize] = useState(storePageWare);
  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = storeWareHouse.slice(firstPageIndex, lastPageIndex);

  //get page từ url
  const pageFromUrl = GetPageFromUrl(location.search);

  //mở modal
  const [modal, setModal] = useState(false);

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

  //set item trên 1 table
  const selectItem = [3, 5, 10, 20, 50];
  const handleAddrTypeChange = (e) => {
    setPageSize(Number(e.target.value));
    dispatch(setPageWare(Number(e.target.value)));
  };

  //view
  const [dataView, setDataView] = useState();
  const handleViewClick = (id) => {
    const warehouseView = storeWareHouse.find((x) => x.id === id);
    setDataView(warehouseView);
    window.$("#viewInfoware").modal("show");
  };

  const [params, setParams] = useState({
    status: "",
    hinh_thuc: "",
    nha_cung_cap: "",
  });

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
              options={optionTrangThai}
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
              options={optionHinhThuc}
              getLabel={false}
            />
          </Col>
        </Row>
        <div className="row">
          <div className="col-6">
            <SelectSearch
              values={params}
              setValues={setParams}
              label="Lọc theo nhà cung cấp"
              placeholder="Chọn nhà cung cấp ..."
              name="nha_cung_cap"
              options={storeDataSelect.supplier}
              getLabel={true}
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
                  Nhập kho
                </button>
              </div>
              <div className="tableWrapper card-content">
                <Table
                  onRemoveClick={handleRemoveClick}
                  onEditClick={handleEditClick}
                  onViewClick={handleViewClick}
                  warehouse={currentItems}
                  params={params}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {loadingWare ? null : (
              <Pagination
                currentPage={currentPage}
                totalCount={storeWareHouse.length}
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
        dataSelect={storeDataSelect}
        books={storeBook}
      />
      <View data={dataView} />
    </>
  );
}

export default WareHouse;
