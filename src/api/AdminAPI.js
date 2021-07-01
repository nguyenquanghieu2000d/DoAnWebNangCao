import axiosClient from "./axiosClient";

export const AdminAPI = {
    adminLogin: (data) => {
        const url = "/adminLogin";

        return axiosClient.post(url, data)
    }

}