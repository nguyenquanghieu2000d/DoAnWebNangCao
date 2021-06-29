// /api/theloais

import axiosClient from "./axiosClient";

export const CtTheloaiAPI = {
    getCtTheLoai: (data) => {
        const url = "/GetCTTheLoaiByID?ma_the_loai=" + data
        // alert(url)
        return axiosClient.get(url)
    }
}