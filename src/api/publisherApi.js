import axiosClient from "./axiosClient";

const publisherApi = {
  getAll: () => {
    const url = '/api/publishers';
    return axiosClient.get(url);
  },
  addPublisher: (data) => {
    const url = `/api/publishers`;
    return axiosClient.post(url,  data );
  },
  removePublisher: (id) => {
    const url = `/api/publishers/${id}`;
    return axiosClient.delete(url);
  },
  editPublisher: (data,id) => {
    const url = `/api/publishers/${id}`;
    return axiosClient.put(url , data);
  },
}

export default publisherApi;