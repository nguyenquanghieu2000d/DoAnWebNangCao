import axiosClient from "./axiosClient";

export const DiaChiAPI = {
    getDiaChi: () => {
        const url = "/GetJSONData";
        return axiosClient.get(url)
    }

}