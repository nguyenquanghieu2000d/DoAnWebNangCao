import axiosClient from "./axiosClient";

export const HangAPI = {
    getHangByCategory: (data) => {
        const url = "/getHangByCategory?category=" + data;
        return axiosClient.get(url)
    },
    gethangByFilter: (data, ma_the_loai, ma_loai, numget, order) => {
        if (ma_loai === undefined) ma_loai = "CT"
        if (ma_the_loai === undefined) ma_the_loai = "TL"
        if (order !== 1 && order !== 2) order = 0
        const url = "/getHangPaging?numget=" + numget + "&skip=0&category=" + ma_the_loai + "&subcategory=" + ma_loai + "&order=" + order;
        return axiosClient.post(url,
            data
        )
    },
    gethangbyIddonhang: (ma_don_hang) => {

        const data = {
            "ma_don_hang": ma_don_hang
        }
        const url = "/api/ctdonhangs?id_don_hang=" + ma_don_hang
        return axiosClient.get(url, data)
    },
    getHangById: (ma_hang) => {
        const url = "/getHangByID?ma_hang=" + ma_hang
        return axiosClient.get(url)
    }
    
}