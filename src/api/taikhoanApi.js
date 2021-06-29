import axiosClient from "./axiosClient";

export const TaikhoanApi = {
    ValidUser: (data) => {
        const url = "/ValidUser";
        return axiosClient.post(url,
            data
        )
    },
    getUserbyID: (data) => {
        const url = "/getUserbyID?username=" + data;
        // alert(url)
        return axiosClient.get(url)
    },
    putUserById: (username, data) => {
        const url = "/PutTaiKhoan"
        return axiosClient.put(url, data)
    }

}