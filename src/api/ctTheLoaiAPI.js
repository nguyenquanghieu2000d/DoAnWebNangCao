import axiosClient from "./axiosClient";

export const CtTheLoaiAPI = {
    countCtTheLoai: (data) => {
        const url = "/CountCTTheLoai";

        return axiosClient.post(url, data)
    },
    getCtTheLoaiPaging: (data, take, skip) => {
        const url = '/getCTTheLoaiPaging?numget=' + take + '&skip=' + skip;
        return axiosClient.post(url, data)
    },
    getCtTheLoaiById: (ma_the_loai) => {
        const url = '/GetCTTheLoaiByID_ma_loai?ma_loai=' + ma_the_loai
        return axiosClient.get(url)
    },
    putcttheloai: (data) => {
        const url = '/Putcttheloai';
        return axiosClient.put(url, data)
    },
    postcttheloai: (data) => {
        const url = '/PostCTTheLoai';
        return axiosClient.post(url, data)
    },
    xoacttheloai(data) {
        const url = '/DeleteCTTheLoai';
        return axiosClient.post(url, data)
    }
}