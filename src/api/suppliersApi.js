import axiosClient from "./axiosClient";

const suppliersApi = {
  getAll: () => {
    const url = '/api/suppliers';
    return axiosClient.get(url);
  },
  addSupplie: (data) => {
    const url = `/api/suppliers`;
    return axiosClient.post(url,  data );
  },
  removeSupplie: (id) => {
    const url = `/api/suppliers/${id}`;
    return axiosClient.delete(url);
  },
  editSupplie: (data,id) => {
    const url = `/api/suppliers/${id}`;
    return axiosClient.put(url , data);
  },
}

export default suppliersApi;