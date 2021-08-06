import axiosClient from "./axiosClient";

const authorApi = {
  getAll: () => {
    const url = '/api/authors';
    return axiosClient.get(url);
  },
  addAuthorApi: (data) => {
    const url = `/api/authors`;
    return axiosClient.post(url,  data );
  },
  removeAuthorApi: (id) => {
    const url = `/api/authors/${id}`;
    return axiosClient.delete(url);
  },
  editAuthorApi: (data,id) => {
    const url = `/api/authors/${id}`;
    return axiosClient.put(url , data);
  },
}

export default authorApi;