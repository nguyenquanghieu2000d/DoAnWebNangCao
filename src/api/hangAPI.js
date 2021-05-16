import axiosClient from "./axiosClient";

export const HangAPI = {
    getHangByCategory: (data) => {
        const url = "/getHangByCategory?category="+data;
        return axiosClient.get(url)
    },
    getUserbyID: (data) => {
        const url = "/getUserbyID";
        return axiosClient.post(url,
            data
        )
    },
}