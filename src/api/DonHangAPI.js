import axiosClient from "./axiosClient";

export const DonHangAPI = {
    countDonHang: (data) => {
        const url = "/CountDonHang";

        return axiosClient.post(url, data)
    },
    getDonHangPaging: (data, take, skip) => {
        const url = '/getDonHangPaging?numget=' + take + '&skip=' + skip;
        return axiosClient.post(url, data)
    },
    getDonHangById: (ma_the_loai) => {
        const url = '/GetDonHangByID?ma_DonHang=' + ma_the_loai
        return axiosClient.get(url)
    },
    putDonHang: (data) => {
        const url = '/PutDonHang';
        return axiosClient.put(url, data)
    },
    postDonHang: (data) => {
        const url = '/PostDonHang';
        return axiosClient.post(url, data)
    },
    deleteDonHang(data) {
        const url = '/DeleteDonHang?DonHang=' + data;
        return axiosClient.post(url)
    }
}