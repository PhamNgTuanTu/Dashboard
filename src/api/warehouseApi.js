import axiosClient from "./axiosClient";

const warehouseApi = {
  getAll: () => {
    const url = '/api/goods-received-notes';
    return axiosClient.get(url);
  },
  addWare: (data) => {
    const url = `/api/goods-received-notes`;
    return axiosClient.post(url, data);
  },
  editWare: (id) => {
    const url = `/api/goods-received-notes/${id}`;
    return axiosClient.put(url);
  },
  removeWare: (id) => {
    const url = `/api/goods-received-notes/${id}`;
    return axiosClient.delete(url);
  }
}

export default warehouseApi;