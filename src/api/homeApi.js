import axiosClient from "./axiosClient";

const homeApi = {
  getDoanhThu: () => {
    const url = `/api/dashboards/orders/statistic`;
    return axiosClient.get(url);
  },
  getSLNguoiDung: () => {
    const url = `/api/dashboards/users/statistic`;
    return axiosClient.get(url);
  },
  getSachBanChay: (limit, month, year) => {
    const url = `/api/dashboards/books/selling?limit=${limit}&month=${month}&year=${year}`;
    return axiosClient.get(url);
  },
  getSachNhapKho: () => {
    const url = `/api/dashboards/books/statistic`;
    return axiosClient.get(url);
  },
  getSLNhapKho: () => {
    const url = `/api/dashboards/grn/statistic`;
    return axiosClient.get(url);
  },
  getHoaDonTheoLoai: (month, year) => {
    const url = `/api/dashboards/orders/total?month=${month}&year=${year}`;
    return axiosClient.get(url);
  }
}

export default homeApi;