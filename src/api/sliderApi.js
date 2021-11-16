import axiosClient from "./axiosClient";

const sliderApi = {
  getAll: () => {
    const url = '/api/sliders';
    return axiosClient.get(url);
  },
  addSlider: (data) => {
    const url = `/api/sliders`;
    return axiosClient.post(url,  data );
  },
  removeSlider: (id) => {
    const url = `/api/sliders/${id}`;
    return axiosClient.delete(url);
  },
  editSlider: (data,id) => {
    const url = `/api/sliders/${id}`;
    return axiosClient.put(url , data);
  },
}

export default sliderApi;