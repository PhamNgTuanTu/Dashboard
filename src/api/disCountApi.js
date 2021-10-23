import axiosClient from "./axiosClient";

const discountApi = {
  getAll: () => {
    const url = '/api/discounts';
    return axiosClient.get(url);
  },
  addDisCount: (data) => {
    const url = `/api/discounts`;
    return axiosClient.post(url,  data );
  },
  removeDisCount: (id) => {
    const url = `/api/discounts/${id}`;
    return axiosClient.delete(url);
  },
  editDisCount: (data,id) => {
    const url = `/api/discounts/${id}`;
    return axiosClient.put(url , data);
  },
}

export default discountApi;