import axiosClient from "./axiosClient";

export const HangAPI = {
    countHang: (data) => {
        const url = "/Counthang";

        return axiosClient.post(url, data)
    },
    getHangPaging: (data, take, skip) => {
        const url = '/getHangPaging?numget=' + take + '&skip=' + skip + '&category=0&subcategory=0&order=0';
        // alert(url)
        return axiosClient.post(url, data)
    },
    posthang: (data) => {
        const url = "/Posthang";
        return axiosClient.post(url,data)
    },
    getHangByID_: (ma_hang) => {
        const url = "/getHangByID_?ma_hang=" + ma_hang
        return axiosClient.post(url)
    },
    suaHang: (data) => {
        const url = "/Puthang"
        return axiosClient.put(url, data)
    },
    xoaHang: (data) => {
        const url = "/DeleteHang"
        alert(JSON.stringify(data))
        return axiosClient.post(url, data)
    }
}