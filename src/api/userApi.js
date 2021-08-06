import axiosClient from "./axiosClient";

const userApi = {
    logIn: (data) => {
        const url = '/api/admin/login';
        return axiosClient.post(url, data);
    },

    logOut: () => {
        const url = '/api/admin/logout';
        return axiosClient.post(url);
    },
    getAll: () => {
        const url = '/api/admin/users-list';
        return axiosClient.get(url);
    },
    editStatus: (data,id) => {
        const url = `/api/admin/update-status-user/${id}`;
        return axiosClient.put(url , data);
      },
}

export default userApi;