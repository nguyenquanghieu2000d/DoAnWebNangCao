import axiosClient from "./axiosClient";

export const BannerAPI = {
    countBanner: (data) => {
        const url = "/CountBanner";

        return axiosClient.post(url, data)
    },
    getBannerPaging: (data, take, skip) => {
        const url = '/getBannerPaging?numget=' + take + '&skip=' + skip;
        return axiosClient.post(url, data)
    },
    getBannerById: (ma_the_loai) => {
        const url = '/GetBannerByID?ma_banner=' + ma_the_loai
        return axiosClient.get(url)
    },
    putBanner: (data) => {
        const url = '/PutBanner';
        return axiosClient.put(url, data)
    },
    postBanner: (data) => {
        const url = '/PostBanner';
        return axiosClient.post(url, data)
    },
    deleteBanner(data) {
        const url = '/DeleteBanner?banner=' + data;
        return axiosClient.post(url)
    }
}