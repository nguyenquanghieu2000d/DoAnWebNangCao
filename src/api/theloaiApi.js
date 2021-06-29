// /api/theloais

import axiosClient from "./axiosClient";

export const TheloaiAPI = {
    getTheLoai: (data) => {
        const url = "/api/theloais";
        return axiosClient.get(url)
    }
}