import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {HangAPI} from "../../../api/hangAPI";
import Loading from "../../DungChung/Loading";
import {convertToVND} from "../../../assets/js/tools";
import GioHangTableItem from "./GioHangTableItem";
import {DonHangAPI} from "../../../api/donhangApi";

function GioHang(props) {
    const localstorage = window.localStorage;
    const [listHang, setListHang] = useState(0)
    const [listHang2, setListHang2] = useState(0)
    // const [tongTien, setTongTien] = useState(0)
    const Userprofile = useSelector(state => state.userProfile)
    const reRenderGioHang = useSelector(state => state.reRenderGiohang)
    const navigate = useNavigate()
    const user = localstorage.getItem(process.env.REACT_APP_USER_PROFILE)

    const dispatch = useDispatch();
    const [tongTien, setTongTien] = useState(0)
    const btnThanhToanOnclick = () => {
        if (user) navigate("/app/thanhtoan")
        else alert("Hãy đăng nhập trước để thanh toán")
    }


    const TaiThongTinGioHangByLocalStorage = async () => {
        let list_gio_hang = JSON.parse(localstorage.getItem(process.env.REACT_APP_LIST_GIO_HANG));
        let tong = 0
        let tong_hang = 0
        let listhangMuaDetail = []
        for (const k in list_gio_hang) {
            if (list_gio_hang.hasOwnProperty(k)) {
                const response = await HangAPI.getHangById(k);
                response.so_luong = list_gio_hang[k];
                listhangMuaDetail.push(response)
                response.thanh_tien = response.gia_moi * response.so_luong
                tong += response.thanh_tien
                tong_hang += response.so_luong
            }
        }

        // const ll = [{"ma_hang":"HG0017","ten_hang":"Chân Váy Xếp Ly","gia_cu":180000,"gia_moi":144000,"thuong_hieu":"ZAKA","hinh_dai_dien":"Image\\vay\\chan_vay\\chan_vay_xoe\\xoe.jpg","mo_ta":"Những chiếc Chân Váy Xếp Ly mềm mại với chiều dài trên gối là lựa chọn dành riêng cho các quý cô yêu thích phong cách lãng mạn. Vì sao ư? vì chúng đơn giản nhưng không hề nhàm chán, kín đáo nhưng lại quyến rũ một cách lạ thường. Sự bắt cặp quá đỗi hoàn hảo này là bởi những đường ly thanh mảnh mềm mại đến tinh tế sẽ khiến cho các quý cô trông thật duyên dáng và chiều dài chỉ đến ngang bắp chân sẽ khiến cho mỗi bước đi trông thật uyển chuyển và gợi cảm. Chiếc váy chính là món đồ có thể kết hợp ăn ý cùng áo len chui đầu, áo phông, sơ mi dáng rộng và một đôi giày/sandals cao gót thanh mảnh.\r\n ","trang_thai":null,"so_luong":6,"thanh_tien":864000}]
        const data = JSON.parse(JSON.stringify(listhangMuaDetail))
        setListHang(data)
        console.log(JSON.stringify(listhangMuaDetail))
        setTongTien(tong)
        // settongSohang(tong_hang)
    }

    const TaiThongTinGioHangByDatabase = async () => {
        const User = JSON.parse(user)
        const response = await DonHangAPI.getCtDonhangById(User.username)
        setListHang(response)

        const response2 = await DonHangAPI.getTongTienGioHang(User.username)
        setTongTien(response2.tong_tien)
        // const response3 = await DonHangAPI.getSoLuongGioHang(User.username)
        // settongSohang(response3)
    }

    const btnTiepTucMua = () => {
        navigate("/app/trangchu")
        window.scrollTo(0,0)
    }


    const TaiThongTinGioHang = async () => {
        if (user) TaiThongTinGioHangByDatabase()
        else TaiThongTinGioHangByLocalStorage()
    }


    useEffect(() => {
        TaiThongTinGioHang()
    }, [reRenderGioHang])

    return (
        <>
            <section className="section1shop ">
                <div>
                </div>
                <h1>
                    GIỎ HÀNG
                </h1>
            </section>
            <section id="section2">
                <div id="section2container">
                    <table>
                        <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            {/*<th className="size-th">Màu</th>*/}
                            {/*<th className="kichco size-th">Kích cỡ</th>*/}
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody id="tableGioHang__">
                        {
                            listHang ? listHang.map((value, index) => {

                                return <GioHangTableItem data={value}/>

                                // alert(JSON.stringify(value))
                            }) : <Loading/>
                        }
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <th>Tổng giá sản phẩm</th>
                            <th>Tiền vận chuyển Tính</th>
                            <th>TỔNG TIỀN THANH TOÁN</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td id="thanh_tien_tong">{convertToVND(tongTien)}</td>
                            <td>Tính khi thanh toán</td>
                            <td id="thanh_tien_thanh_toan">{convertToVND(tongTien)}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <button style={{
                            padding: '1rem',
                            height: 'auto',
                            margin: '1rem',
                            cursor: 'pointer'
                        }} onClick={btnThanhToanOnclick} className="button2 buttonMuaNgay">THANH TOÁN NGAY
                        </button>
                        <button onClick={btnTiepTucMua}
                              style={{padding: '1rem', height: 'auto', margin: '1rem', cursor: 'pointer'}}
                              className="button2 buttonMuaNgay2">TIẾP TỤC MUA SẮM</button>
                    </div>
                </div>
            </section>
        </>
    );
}


export default GioHang;