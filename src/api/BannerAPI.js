// /api/theloais

import axiosClient from "./axiosClient";

export const BannerAPI = {
    getBanner: () => {
        const url = '/api/banners';
        return axiosClient.get(url)
    },
}