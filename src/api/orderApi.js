import axiosClient from "./axiosClient";

const orderApi = {
  getAll: () => {
    const url = '/api/orders';
    return axiosClient.get(url);
  },
  getFollowStatus: (status) => {
    const url = `/api/orders/?type=${status}`;
    return axiosClient.get(url);
  },
  editOrder: (data, id) => {
    const url = `/api/orders/${id}`;
    return axiosClient.put(url, data);
  },
}

export default orderApi;