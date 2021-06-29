import axiosClient from "./axiosClient";

export const listHinhAnhApi = {
    getListHinhAnhHang: (ma_hang) => {
        const url = "/api/hinh_anh_mo_ta?ma_hang=" + ma_hang;
        return axiosClient.get(url)
    }
}