import axiosClient from "./axiosClient";

const bookApi = {
  getAll: () => {
    const url = '/api/books';
    return axiosClient.get(url);
  },
  addBookApi: (data) => {
    const url = `/api/books`;
    return axiosClient.post(url, data);
  },

  removeBookApi: (id) => {
    const url = `/api/books/${id}`;
    return axiosClient.delete(url);
  },
  editBookApi: (data, id) => {
    const url = `/api/books/${id}`;
    return axiosClient.put(url, data);
  },
}

export default bookApi;