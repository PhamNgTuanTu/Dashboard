import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => {
    const url = '/api/categories';
    return axiosClient.get(url);
  },
  addCate: (data) => {
    const url = `/api/categories`;
    return axiosClient.post(url, data );
  },
  removeCate: (id) => {
    const url = `/api/categories/${id}`;
    return axiosClient.delete(url);
  },
  editCate: (data,id) => {
    const url = `/api/categories/${id}`;
    return axiosClient.put(url , data);
  },
}

export default categoryApi;