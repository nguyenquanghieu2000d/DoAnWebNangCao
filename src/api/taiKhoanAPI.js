import axiosClient from "./axiosClient";

export const TaiKhoanAPI = {
    countTaiKhoan: (data) => {
        const url = "/Counttaikhoan";
        return axiosClient.post(url, data)
    },
    getTaiKhoanPaging: (data, take, skip) => {

        const url = '/getUserPaging?numget=' + take + '&skip=' + skip;
        // alert(url)
        // alert(JSON.stringify(data))
        return axiosClient.post(url, data)
    },
    getTaiKhoanById: (username) => {
        const url = '/getUserbyID?username=' + username
        return axiosClient.get(url)
    },
    posttaikhoan:  (data) => {
        const url = '/PostTaiKhoan';
        return axiosClient.post(url, data)
    },
    puttaikhoan: (data) => {
        const url = "/PutTaiKhoan";
        return axiosClient.put(url, data)
    },
    xoataikhoan(username) {
        const url = "/DeleteTaiKhoan?username=" + username;
        return axiosClient.post(url)
    }
}