import React, {useEffect, useState} from 'react';
import "../../../assets/css/Client/ThanhToan/ThanhToan.css"
import {useDispatch, useSelector} from "react-redux";
import {DiaChiAPI} from "../../../api/DiaChiApi";
import Loading from "../../DungChung/Loading";
import {convertToVND} from "../../../assets/js/tools";
import {DonHangAPI} from "../../../api/donhangApi";
import {useNavigate} from "react-router";
import * as actions from "../../../constants/ActionTypes";

function ThanhToan(props) {

    const localstorage = window.localStorage;
    const user = localstorage.getItem(process.env.REACT_APP_USER_PROFILE)
    const [DiaChi, setDiaChi] = useState("")
    const [CurrentThanhPho, setCurrentThanhPho] = useState("")
    const [CurrentQuan, setCurrentQuan] = useState("")
    const [CurrentXa, setCurrentXa] = useState("")

    const [XacNhanHoTen, setXacNhanHoTen] = useState("")
    const [XacNhanDienThoai, setXacNhanDienThoai] = useState("")
    const [DiaChiChiTiet, setDiaChiChiTiet] = useState("")
    const [XacNhanDiaChi, setXacNhanDiaChi] = useState("")
    const [tongTien, setTongTien] = useState(0)

    const navigate = useNavigate()
    const reRenderGioHang = useSelector(state => state.reRenderGiohang)
    const dispatch = useDispatch()



    const setup = async () => {
        const response = await DiaChiAPI.getDiaChi();
        if (response) setDiaChi(response.data)
        const User = JSON.parse(user)
        setXacNhanHoTen(User.hoten)
        setXacNhanDienThoai(User.sdt)
    }

    const TaiTongTien = async () => {
        const User = JSON.parse(user)
        const response2 = await DonHangAPI.getTongTienGioHang(User.username)
        setTongTien(response2.tong_tien)
    }

    const onChangeXacNhanHoTen = (e) => {
        setXacNhanHoTen(e.target.value)
    }

    const onChangeXacNhanDienThoai = (e) => {
        setXacNhanDienThoai(e.target.value)
    }

    const onChangeXacNhanDiaChi = (value) => {
        setXacNhanDiaChi(value)
    }

    const onChangeDiaChiChiTiet = (e) => {
        setDiaChiChiTiet(e.target.value)
    }

    const onChangeSelectThanhPho = (e) => {
        setCurrentThanhPho(e.target.value)
    }

    const onChangeSelectQuan = (e) => {
        setCurrentQuan(e.target.value)
    }

    const getName = (val) => val.split("---")[1]

    const okok = async (e, value) => {
        const User = JSON.parse(user)
        const x = document.getElementById("NhanHang");
        const x1 = document.getElementById("ThanhToan");
        if (value === 1) {

            if (DiaChiChiTiet === "" || CurrentQuan === "" || CurrentThanhPho === "") {
                alert("Xin nhập đầy đủ địa chỉ");
                return;
            }
            x.style.display = "none";
            x1.style.display = "block";
            onChangeXacNhanDiaChi(DiaChiChiTiet + " "
                + getName(CurrentQuan)
                + " " +
                getName(CurrentThanhPho))
            const response = await DonHangAPI.SuaThongTinDonHang(
                User.username,
                XacNhanHoTen,
                XacNhanDienThoai,
                XacNhanDiaChi
            )
        } else if (value === 2) {
            x.style.display = "block";
            x1.style.display = "none";


        } else {

            const response = await DonHangAPI.ThanhToanDonHang(User.username)
            x.style.display = "none";
            x1.style.display = "none";
            document.getElementById("ThanhToanThanhCong").style.display = "block";
            alert("Cảm ơn bạn !! đã thanh toán thành công");
            const response1 = await DonHangAPI.ThietLapGioHang(User.username)
            dispatch({type: actions.RE_RENDER_GIO_HANG, data: !reRenderGioHang})
            navigate("/app/trangchu")
        }
    }


    useEffect(() => {
        setup()
        TaiTongTien()
    }, []);


    return (
        <>
            <header>
                <div className="pos1 LogoAndClick">
                    <a className="titlea" href="trangChu.php">
                        {/*                    <img id="LogoImage" src="Image/logo.png">*/}HHNStore
                    </a>
                </div>
            </header>
            <section>
                <div className="mainPage">
                    <div id="NhanHang">
                        <h1>THÔNG TIN NHẬN HÀNG</h1>
                        <div className="mainPageDoc">
                            <div className="mainPageNgang">
                                <p>Họ tên*</p>
                                <label>
                                    <input onChange={onChangeXacNhanHoTen} name="XacNhanHoTen" id="hoten_dh"
                                           className="input" type="text"
                                           defaultValue={XacNhanHoTen} placeholder="Nhập họ tên"/>
                                </label>
                            </div>
                            <div className="mainPageNgang">
                                <p>Điện thoại *</p>
                                <label>
                                    <input onChange={onChangeXacNhanDienThoai} id="sdt_dh" name="XacNhanDienThoai"
                                           className="input" type="text"
                                           defaultValue={XacNhanDienThoai} placeholder="Nhập số điện thoại"/>
                                </label>
                            </div>
                            <div className="mainPageNgang">
                                <p>Thành phố *</p>
                                <label>
                                    <select id="thanhpho" value={CurrentThanhPho} onChange={onChangeSelectThanhPho}>
                                        <option value={""}>Chưa chọn</option>
                                        {
                                            DiaChi ? DiaChi.map((value, index) => {
                                                return <option
                                                    value={value.level1_id + "---" + value.name}>{value.name}</option>
                                            }) : <Loading/>
                                        }
                                    </select>
                                </label>
                            </div>
                            <div className="mainPageNgang">
                                <p>Quận/Huyện *</p>
                                <label>
                                    <select id="quanhuyen" value={CurrentQuan} onChange={onChangeSelectQuan}>
                                        {/*.map((value,index)=> {*/}
                                        {/*return <option value={value.level1_id}>{value.name}</option>*/}
                                        {/*})*/}
                                        {
                                            CurrentThanhPho ? <>
                                                <option value={""}>Chưa chọn</option>
                                                {
                                                    DiaChi ? DiaChi.filter(value => value.level1_id === CurrentThanhPho.split("---")[0]).map(filterThanhPho => {
                                                        return filterThanhPho.level2s.map((value2, index2) => {
                                                            return <option
                                                                value={value2.level2_id + "---" + value2.name}>{value2.level2_id + "---" + value2.name}</option>
                                                        })
                                                    }) : <Loading/>
                                                }
                                            </> : <option value={""}>Hãy chọn thành phố</option>
                                        }
                                    </select>
                                </label>
                            </div>
                            <div className="mainPageNgang">
                                <p>Địa chỉ *</p>
                                <label style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <input style={{width: '32%', height: '2.70rem', margin: 0}} id="dia_chi"
                                           onChange={onChangeDiaChiChiTiet}
                                           name={"DiaChiChiTiet"}
                                           className="input" type="text" placeholder="Nhập địa chỉ"/>
                                    <div style={{width: '32%', height: '2.82rem', margin: 0}} className="input"><p
                                        style={{width: 'auto'}} id="lbQuan" type="text"/>{CurrentQuan
                                        ? getName(CurrentQuan) : ""
                                    }</div>
                                    <div style={{width: '32%', height: '2.82rem', margin: 0}} className="input"><p
                                        style={{width: 'auto'}} id="lbThanhPho"/>{
                                        CurrentThanhPho ? getName(CurrentThanhPho) : ""
                                    }</div>
                                </label>
                            </div>
                            <input type="button" style={{height: '3rem'}} onClick={(e) => okok(e, 1)}
                                   className="pos2 button2 buttonMuaNgay" defaultValue="LƯU VÀ TIẾP TỤC"/>
                        </div>
                    </div>
                    <div id="ThanhToan">
                        <h1>CHỌN HÌNH THỨC THANH TOÁN</h1>
                        <div className="mainPageNgang2">
                            <div className="mainPageDoc2">
                                <label>
                                    <input type="radio" name="thanhtoan"/> Tiền mặt
                                </label>
                                <label>
                                    <input type="radio" name="thanhtoan"/> Chuyển khoản
                                </label>
                                <label>
                                    <input type="radio" name="thanhtoan"/> Thanh toán online qua thẻ ngân hàng nội địa
                                </label>
                                <label>
                                    <input type="radio" name="thanhtoan"/> Thanh toán bằng thẻ VISA hoặc MASTERCARD
                                </label>
                                <h2>Địa chỉ giao hàng</h2>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td><b>HỌ TÊN</b></td>
                                        <td id="hoten_dh_" style={{textTransform: 'uppercase'}}>{XacNhanHoTen}</td>
                                    </tr>
                                    <tr>
                                        <td><b>ĐIỆN THOẠI</b></td>
                                        <td id="sdt_dh_" style={{textTransform: 'uppercase'}}>{XacNhanDienThoai}</td>
                                    </tr>
                                    <tr>
                                        <td><b>ĐỊA CHỈ</b></td>
                                        <td id="diachi_dh_" style={{textTransform: 'uppercase'}}>{XacNhanDiaChi}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <button onClick={(e) => okok(e, 2)} className="pos3 button2 buttonMuaNgay2">THAY ĐỔI
                                    THÔNG TIN
                                </button>
                            </div>
                            <div className="mainPageItem mainPageDoc2 ">
                                <label className="labell">
                                    <input type="text" name="thanhtoan" placeholder="Nhập mã khuyến mãi"/>
                                    <button className="apdung">Áp dụng</button>
                                </label>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td><b>TỔNG TIỀN</b></td>
                                        <td id="thanh_tien_tong">{convertToVND(tongTien)}</td>
                                    </tr>
                                    <tr>
                                        <td><b>PHÍ VẬN CHUYỂN</b></td>
                                        <td>0 VND</td>
                                    </tr>
                                    <tr>
                                        <td><b>THÀNH TIỀN</b></td>
                                        <td id="thanh_tien_thanh_toan">{convertToVND(tongTien)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <input type="button" onClick={(e) => okok(e, 3)} className="button2 buttonMuaNgay"
                                       defaultValue="HOÀN THÀNH"/>
                            </div>
                        </div>
                    </div>
                    <div id="ThanhToanThanhCong">
                        <h1 style={{color: 'green'}}>THANH TOÁN THÀNH CÔNG</h1>
                        <h2>Cảm ơn bạn đã tin dùng sản phẩm của HHNStore</h2>
                    </div>
                </div>
            </section>
        </>
    );
}


export default ThanhToan;