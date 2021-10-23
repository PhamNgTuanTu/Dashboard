import axiosClient from "./axiosClient";

const listDataAddBookApi = {
  getAll: () => {
    const url = '/api/data/select';
    return axiosClient.get(url);
  },
}

export default listDataAddBookApi;