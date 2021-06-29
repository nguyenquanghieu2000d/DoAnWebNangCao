import axiosClient from "./axiosClient";

export const DonHangAPI = {
    getdonhangById: (username) => {
        const url = "/GetHangbyUser?username=" + username;
        return axiosClient.get(url)
    },
    getCtDonhangById: (username) => {
        const url = "/GetGioHang?username=" + username;
        return axiosClient.get(url)
    },
    getTongTienGioHang: (username) => {
        const url = "/GetTongTienGioHang?username=" + username
        return axiosClient.get(url)
    },
    getSoLuongGioHang: (username) => {
        const url = "GetSoLuongGioHang?username=" + username
        return axiosClient.get(url)
    },
    suaHangTrongGioHang: (username, ma_hang, so_luong) => {
        const data = {
            "ma_hang": ma_hang,
            "so_luong": so_luong
        }
        const url = "/ThemCTDonHang_ThemMoi?username=" + username
        return axiosClient.post(url,data)
    },
    themCtDonHang: (username, ma_hang, so_luong) => {
        const data = {
            "ma_hang": ma_hang,
            "so_luong": parseInt(so_luong)
        }
        const url = "/ThemCTDonHang?username=" + username
        return axiosClient.post(url,data)
    },
    SuaThongTinDonHang: (username,hoten_dh, sdt_dh,dia_chi)  => {
        const data = {
            "hoten_dh": hoten_dh,
            "sdt_dh": sdt_dh,
            "dia_chi": dia_chi
        }
        // alert("sjuidgfbuhysdvfus")
        const url = "/SuaThongTinDonHang?username=" + username
        return axiosClient.put(url,data)
    },
    ThanhToanDonHang: (username) => {
        const url = "/ThanhToan?username=" + username
        return axiosClient.put(url)
    },
    ThietLapGioHang: (username) => {
        const url = "/UpdateTH?username=" + username
        return axiosClient.get(url)
    }

}