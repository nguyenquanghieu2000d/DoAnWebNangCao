import axiosClient from "./axiosClient";

export const TaikhoanApi = {
    ValidUser: (data) => {
        const url = "/ValidUser";
        return axiosClient.post(url,
            data
        )
    },
    getUserbyID: (data) => {
        const url = "/getUserbyID";
        return axiosClient.post(url,
            data
        )
    },
}