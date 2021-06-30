import axiosClient from "./axiosClient";

export const TheLoaiAPI = {
    countTheLoai: (data) => {
        const url = "/CountTheLoai";

        return axiosClient.post(url, data)
    },
    getTheLoaiPaging: (data, take, skip) => {
        const url = '/getTheLoaiPaging?numget=' + take + '&skip=' + skip;
        return axiosClient.post(url, data)
    },
    posttheloai: (data) => {
        const url = '/Posttheloai';
        return axiosClient.post(url, data)
    },
    xoatheloai: (ma_the_loai) => {
        const url = "/DeleteTheLoai?ma_the_loai=" + ma_the_loai
        return axiosClient.post(url)
    },
    getTheLoaiById: (ma_the_loai) => {
        const url = "/GetTheLoaiByID?ma_the_loai=" + ma_the_loai
        return axiosClient.get(url)
    },
    puttheloai: (data) => {
        const url = '/Puttheloai';
        return axiosClient.put(url, data)
    },
    getTheLoai: () => {
        const url = "/api/theloais";
        return axiosClient.get(url)
    },
    getCTTheLoai: (ma_the_loai) => {
        const url = "/GetCTTheLoaiByID?ma_the_loai=" + ma_the_loai
        return axiosClient.get(url)
    }


}