import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import orderApi from "../../api/orderApi";
import { setDataOder, setLoadingData } from "../../store/order";
import ListToDo from "./ListToDo";
import PieChart from "./PieChart";
import Select from "react-select";
import homeApi from "../../api/homeApi";
import {
  setDataPie,
  setDataSachBanChay,
  setDataSachNhap,
  setDataUserHome,
  setDataDonhangKho,
  setLoading1,
  setLoading2,
  setLoading3,
  setLoading4,
  setLoading5,
  setLoading6,
  setDataDoanhThu,
} from "../../store/home";
import TotalUserChart from "./TotalUserChart";
import TableSachBanChay from "./TableSachBanChay";
import TableSachNhapKho from "./TableSachNhapKho";
import NhapKhoChart from "./NhapKhoChart";

const optionsMonth = [
  { value: 1, label: "Tháng 1" },
  { value: 2, label: "Tháng 2" },
  { value: 3, label: "Tháng 3" },
  { value: 4, label: "Tháng 4" },
  { value: 5, label: "Tháng 5" },
  { value: 6, label: "Tháng 6" },
  { value: 7, label: "Tháng 7" },
  { value: 8, label: "Tháng 8" },
  { value: 9, label: "Tháng 9" },
  { value: 10, label: "Tháng 10" },
  { value: 11, label: "Tháng 11" },
  { value: 12, label: "Tháng 12" },
];

function Home(props) {
  const nameControl = "Trang Chủ";
  document.title = nameControl;
  const dispatch = useDispatch();

  let {
    storeDataOrder,
    loadingPageOrder,
    storeDataPie,
    storeTotalUser,
    storeSachBanChay,
    storeSachNhap,
    storeDonHang,
    storeDataDoanhThu,
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    loading6,
  } = useSelector((state) => ({
    storeDataOrder: state.orders.order,
    loadingPageOrder: state.orders.loadingPage,
    storeDataPie: state.home.dataPie,
    storeSachBanChay: state.home.dataSachBanChay,
    storeSachNhap: state.home.dataSachNhap,
    storeTotalUser: state.home.dataTotalUser,
    storeDonHang: state.home.dataDonHangKho,
    storeDataDoanhThu: state.home.dataDoanhThu,
    loading1: state.home.loading1,
    loading2: state.home.loading2,
    loading3: state.home.loading3,
    loading4: state.home.loading4,
    loading5: state.home.loading5,
    loading6: state.home.loading6,
  }));
  let today = new Date();
  const [valueSelect, seValueSelect] = useState(today.getMonth() + 1);
  const selectedOption =
    optionsMonth && optionsMonth.find((option) => option.value === valueSelect);
  const handleChange = async (value) => {
    dispatch(setLoading6(true));
    const selectedValue = value ? value.value : value;
    seValueSelect(selectedValue);
  };

  const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
    number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === "undefined" ? "." : thousands_sep,
      dec = typeof dec_point === "undefined" ? "." : dec_point,
      s = "",
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return "" + Math.round(n * k) / k;
      };
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  };

  const convertArray = (data) => {
    let arr = [0, 0, 0, 0, 0];
    if (JSON.stringify(data) !== "[]") {
      for (let i = 0; i < 4; i++) {
        let test = 0;
        data.forEach((val) => {
          if (Number(val.status) === 1) {
            arr[0] = Number(val.total_orders);
          } else if (Number(val.status) === 2) {
            arr[1] = Number(val.total_orders);
          } else if (Number(val.status) === 3) {
            arr[2] = Number(val.total_orders);
          } else if (Number(val.status) === 4) {
            arr[3] = Number(val.total_orders);
          } else {
            if (Number(val.status) === 5) {
              test += Number(val.total_orders);
            }
            if (Number(val.status) === 6) {
              test += Number(val.total_orders);
            }
            if (Number(val.status) === 0) {
              test += Number(val.total_orders);
            }
            arr[4] = test;
          }
        });
      }
    }
    return arr;
  };

  const TotalPrice = (data) => {
    let total = 0;
    let nhapkho = 0;
    let banDuoc = 0;
    if (data) {
      nhapkho =
        Number(storeDataDoanhThu.total_import) +
        Number(storeDataDoanhThu.total_import * 0.1);
      banDuoc =
        Number(storeDataDoanhThu.total_export) -
        Number(storeDataDoanhThu.total_export * 0.1);
      total = banDuoc - nhapkho;
    }
    return Number(total);
  };

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await homeApi.getHoaDonTheoLoai(
          valueSelect,
          today.getFullYear()
        );
        dispatch(setDataPie(response.data));
        dispatch(setLoading6(false));
      } catch (error) {
        console.error(error);
      }
    }
    LoadData();
    // eslint-disable-next-line
  }, [valueSelect]);

  useEffect(() => {
    async function LoadData() {
      try {
        //to do list
        const res1 = await orderApi.getAll();
        dispatch(setDataOder(res1.data));
        dispatch(setLoadingData(false));
        //sách bán chạy
        const res2 = await homeApi.getSachBanChay(
          5,
          today.getMonth() + 1,
          today.getFullYear()
        );
        dispatch(setDataSachBanChay(res2.data));
        dispatch(setLoading1(false));

        // số lượng người dùng
        const res4 = await homeApi.getSLNguoiDung();
        dispatch(setDataUserHome(JSON.parse(res4.data).map((i) => Number(i))));
        dispatch(setLoading2(false));

        //số lượng sách nhập kho
        const res3 = await homeApi.getSachNhapKho();
        dispatch(setDataSachNhap(res3.data));
        dispatch(setLoading3(false));

        //nhập kho
        const res5 = await homeApi.getSLNhapKho();
        dispatch(setDataDonhangKho(res5.data));
        dispatch(setLoading4(false));

        //doanh thu
        const res6 = await homeApi.getDoanhThu();
        dispatch(setDataDoanhThu(res6.data));
        dispatch(setLoading5(false));
      } catch (error) {}
    }
    LoadData();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="home-section">
      <div>
        <ListToDo
          storeDataOrder={
            JSON.stringify(storeDataOrder) !== "[]" ? storeDataOrder : null
          }
          loading={loadingPageOrder}
        />
        <Row>
          <Col md="12" xl="6">
            <Card className="h-100">
              <CardHeader>
                <CardTitle>
                  <h5>Thống kê hóa đơn theo tháng {valueSelect}</h5>
                </CardTitle>
              </CardHeader>
              <CardBody className="d-flex flex-column justify-content-between">
                <Row>
                  <Col md="12">
                    <Select
                      value={selectedOption}
                      name="month"
                      options={optionsMonth}
                      onChange={handleChange}
                      placeholder="Chọn tháng ..."
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    {loading6 ? (
                      <div
                        style={{ height: "350px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Spinner
                          color="primary"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                    ) : (
                      <PieChart data={convertArray(storeDataPie)} />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="12" xl="6" className="mt-4 mt-lg-0">
            <TableSachBanChay
              label="Sách bán chạy trong tháng"
              loading={loading1}
              data={
                JSON.stringify(storeSachBanChay) !== "[]"
                  ? storeSachBanChay
                  : null
              }
            />
          </Col>
        </Row>
        <div className="row mt-4">
          <Col md="12" xl="6">
            <Card className="h-100">
              <CardHeader>
                <CardTitle>
                  <h5>Thống kê số lượng người dùng đăng ký tài khoản</h5>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    {loading2 ? (
                      <div
                        style={{ height: "350px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Spinner
                          color="primary"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                    ) : (
                      <TotalUserChart data={storeTotalUser} />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="12" xl="6" className="mt-4 mt-lg-0">
            <Card className="h-100">
              <CardHeader>
                <CardTitle>
                  <h5>Thống kê nhập kho</h5>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    {loading4 ? (
                      <div
                        style={{ height: "350px" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Spinner
                          color="primary"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                    ) : (
                      <NhapKhoChart data={storeDonHang} />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </div>
        <Row className="mt-4">
          <Col md="12">
            <TableSachNhapKho
              label="Thống kê sách nhập kho"
              loading={loading3}
              data={
                JSON.stringify(storeSachNhap) !== "[]" ? storeSachNhap : null
              }
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card body color="primary" outline>
              <CardTitle tag="h5">
                Tổng tiền nhập kho trong tháng {today.getMonth() + 1}
              </CardTitle>
              {loading5 ? (
                <CardText>Đang tải dữ liệu ...</CardText>
              ) : (
                <>
                  <CardText>{`Tổng tiền : ${moneyFormat(
                    Number(storeDataDoanhThu.total_import)
                  )} VNĐ`}</CardText>
                  <CardText>{`Thuế : ${moneyFormat(
                    Number(storeDataDoanhThu.total_import * 0.1)
                  )} VNĐ`}</CardText>
                  <CardText>{`Tổng cộng : ${moneyFormat(
                    Number(
                      Number(storeDataDoanhThu.total_import) +
                        Number(storeDataDoanhThu.total_import * 0.1)
                    )
                  )} VNĐ`}</CardText>
                </>
              )}
            </Card>
            <Card body color="secondary" outline>
              <CardTitle tag="h5">
                Tổng tiền thu được trong tháng {today.getMonth() + 1}
              </CardTitle>
              {loading5 ? (
                <CardText>Đang tải dữ liệu ...</CardText>
              ) : (
                <>
                  <CardText>{`Tổng tiền : ${moneyFormat(
                    Number(storeDataDoanhThu.total_export)
                  )} VNĐ`}</CardText>
                  <CardText>{`Thuế : ${moneyFormat(
                    Number(storeDataDoanhThu.total_export * 0.1)
                  )} VNĐ`}</CardText>
                  <CardText>{`Tổng cộng : ${moneyFormat(
                    Number(
                      storeDataDoanhThu.total_export -
                        storeDataDoanhThu.total_export * 0.1
                    )
                  )} VNĐ`}</CardText>
                </>
              )}
            </Card>
            <Card body color="success" outline>
              <CardTitle tag="h5">
                Tổng lợi nhuận trong tháng {today.getMonth() + 1} (Đã bao gồm
                VAT)
              </CardTitle>
              {loading5 ? (
                <CardText>Đang tải dữ liệu ...</CardText>
              ) : (
                <>
                  {TotalPrice(storeDataDoanhThu) > 0 ? (
                    <Badge color="success" style={{ fontSize: "40px" }}>
                      {`${moneyFormat(TotalPrice(storeDataDoanhThu))} VNĐ`}
                    </Badge>
                  ) : (
                    <Badge color="danger" style={{ fontSize: "40px" }}>
                      {`${moneyFormat(TotalPrice(storeDataDoanhThu))} VNĐ`}
                    </Badge>
                  )}
                </>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Home;
