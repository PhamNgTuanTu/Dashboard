import axiosClient from "./axiosClient";

const listDataAddBookApi = {
  getAll: () => {
    const url = '/api/data-list';
    return axiosClient.get(url);
  },
}

export default listDataAddBookApi;