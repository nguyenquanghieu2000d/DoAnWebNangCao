import React, {useEffect, useState} from 'react';
import "../../../assets/css/Client/ChiTietSanPham/ChiTietSanPham.css"
import GeneralBanner from "../../DungChung/GeneralBanner";
import Slide3 from "./Slide3";
import {convertToVND} from "../../../assets/js/tools";
import {useLocation, useNavigate} from "react-router-dom";
import {HangAPI} from "../../../api/hangAPI";
import Loading from "../../DungChung/Loading";
import {listHinhAnhApi} from "../../../api/listHinhAnhApi";
import {DonHangAPI} from "../../../api/donhangApi";
import * as actions from "../../../constants/ActionTypes";
import {useDispatch, useSelector} from "react-redux";

function ChiTietSanPham(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const [hang, setHang] = useState({});
    const [listHinhAnhHang, setListHinhAnhHang] = useState("")
    const [thanhCongTruSo, setthanhCongTruSo] = useState(0)
    const localstorage = window.localStorage;
    const user = localstorage.getItem(process.env.REACT_APP_USER_PROFILE)
    const reRenderGioHang = useSelector(state => state.reRenderGiohang)

    const dispatch = useDispatch()


    const getListHinhAnh = async () => {
        setListHinhAnhHang("")
        const response1 = await listHinhAnhApi.getListHinhAnhHang(params.get("id"))
        setListHinhAnhHang(response1)
    }


    const gethangDetail = async () => {
        const response = await HangAPI.getHangById(params.get("id"))
        if (response) {
            setHang(response)
        }
    }


    const themVaoGiohang = async (e) => {
        if (hang) {
            if (user){
                const User = JSON.parse(user)

                // alert(User.username);
                // alert(params.get("id"))
                // alert(thanhCongTruSo)
                const response = await DonHangAPI.themCtDonHang(
                    User.username,
                    params.get("id"),
                    thanhCongTruSo
                );
                if (response){
                    alert("Thêm vào giỏ hàng thành công")
                }
            }
            else{
                const gioHang = JSON.parse(localstorage.getItem(process.env.REACT_APP_LIST_GIO_HANG))
                alert(JSON.stringify(gioHang))
                if (gioHang[params.get("id")])
                    gioHang[params.get("id")] += thanhCongTruSo
                else
                    gioHang[params.get("id")] = thanhCongTruSo
                localstorage.setItem(process.env.REACT_APP_LIST_GIO_HANG, JSON.stringify(gioHang))
            }
            dispatch({type:actions.RE_RENDER_GIO_HANG, data: !reRenderGioHang})
        }
    }


    const minus = () => {
        if (thanhCongTruSo > 0) {
            setthanhCongTruSo(thanhCongTruSo - 1)
        }
    }

    const push = () => {
        setthanhCongTruSo(thanhCongTruSo + 1)
    }

    function chiTietSanPhamOnclick(value) {
        const a = document.getElementsByClassName("BlogTagbtn");
        const b = document.getElementsByClassName("chiTietItem");
        for(let i=0; i<a.length; i++){
            a[i].innerHTML = a[i].innerHTML.toString().split("<hr>")[0];
            b[i].style.display = "none";
            // alert(a[i].innerHTML);
        }
        a[value].innerHTML += "<hr>";
        b[value].style.display = "block";
    }

    const btnMuaNgayClick = () => {
        themVaoGiohang()
        navigate("/app/giohang")
    }

    useEffect(() => {
        gethangDetail()
    }, [params.get("id")])

    useEffect(() => {
        getListHinhAnh()
    }, [hang])


    return (
        <>
            {hang ?
                <div>
                    <section id="ChiTietSanPhamSection1">
                        <GeneralBanner text="CHI TIẾT SẢN PHẨM"/>
                        <div id="ChiTietSanPhamBoCuc">
                            {listHinhAnhHang ? <Slide3 data={listHinhAnhHang}/> : <Loading/>}
                            <div id="ChiTietSanPhamSection1Item2">
                                <div id="ten_hang" style={{fontWeight: 'bold', fontSize: '2rem'}}>{hang.ten_hang}</div>
                                <div className={"mhth"}>
                                    <div id="ma_hang">ID: {hang.ma_hang}</div>
                                    <div id="thuong_hieu">BRAND: {hang.thuong_hieu}</div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div style={{display: 'flex'}}>
                                        <h2 id="gia_moi" style={{fontSize: '3rem'}}>{convertToVND(hang.gia_moi)}</h2>
                                    </div>
                                    <div>&nbsp;&nbsp;&nbsp;</div>
                                    <div style={{display: 'flex'}}>
                                        <h2><strike id="gia_cu"
                                                    style={{color: '#282828'}}>{convertToVND(hang.gia_cu)}</strike>
                                        </h2>
                                    </div>
                                </div>
                                {/*<div className="TinhTrang"><h3>TÌNH TRẠNG:</h3> <p id="ChiTietSanPhamTinhTrang">Còn hàng*/}
                                {/*    nhé!!!</p></div>*/}
                                {/*<div className="TinhTrang"><h3>KÍCH CỠ:</h3> <label>*/}
                                {/*    <select>*/}
                                {/*        <option>S</option>*/}
                                {/*        <option>M</option>*/}
                                {/*        <option>L</option>*/}
                                {/*    </select>*/}
                                {/*</label></div>*/}
                                <div className="TinhTrang"><h3>SỐ LƯỢNG:</h3>
                                    <div className="ThanhCongTru ThanhCongTruVTKC">
                                        <button className="ThanhCongTruTru" onClick={minus}>-</button>
                                        <p id="thanhCongTruSo" className="ThanhCongTruSo">{thanhCongTruSo}</p>
                                        <button className="ThanhCongTruCong" onClick={push}>+</button>
                                    </div>
                                </div>
                                {/*<div className="TinhTrang"><h3>MÀU SẮC: </h3> <label>*/}
                                {/*    <select>*/}
                                {/*        <option>ĐEN</option>*/}
                                {/*        <option>ĐỎ</option>*/}
                                {/*        <option>LAM</option>*/}
                                {/*    </select>*/}
                                {/*</label></div>*/}
                                <div className="TinhTrang1">
                                    <button id="btnMuaNgay" onClick={btnMuaNgayClick}
                                            className="ChiTietSanPhamNutXacNhan button buttonMuaNgay"
                                    >MUA NGAY
                                    </button>
                                    <button id="btnGioHang" onClick={themVaoGiohang}
                                            className="ChiTietSanPhamNutXacNhan button buttonMuaNgay">THÊM VÀO GIỎ HÀNG
                                    </button>
                                </div>
                                <div id="ChuaTab">
                                    <div><img src="Image/Icon/giaohangdoitra/dp.png" alt=""/>
                                        <p>MIỄN PHÍ GIAO HÀNG TOÀN QUỐC<br/>
                                            (Sản phẩm giảm giá từ 30% trở xuống)</p></div>
                                    <div><img src="Image/Icon/giaohangdoitra/dp2.png" alt=""/>
                                        <p>ĐỔI TRẢ DỄ DÀNG<br/>
                                            ( Hỗ trợ đổi hàng trong vòng 7 ngày kể từ ngày mua hàng )</p></div>
                                    <div><img src="Image/Icon/giaohangdoitra/dp3.png" alt=""/>
                                        <p>TỔNG ĐÀI TƯ VẤN 1900.56.56.55 - 0943.049.820<br/>
                                            ( Từ 8h30 - 22h00 mỗi ngày)</p></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className={"thongTinChiTiet"}>THÔNG TIN CHI TIẾT</div>

                        {/*<div id="BlogTab">*/}
                        {/*    <div><input type="button" className="BlogTagbtn" id="bt1" onClick={(e) => chiTietSanPhamOnclick(0)}*/}
                        {/*                defaultValue="THÔNG TIN SẢN PHẨM"/>*/}
                        {/*        <hr/>*/}
                        {/*    </div>*/}
                        {/*    <div><input type="button" className="BlogTagbtn" id="bt2" onClick={(e) => chiTietSanPhamOnclick(1)}*/}
                        {/*                defaultValue="ĐÁNH GIÁ"/></div>*/}
                        {/*    <div><input type="button" className="BlogTagbtn" id="bt3" onClick={(e) => chiTietSanPhamOnclick(2)}*/}
                        {/*                defaultValue="HỎI ĐÁP"/></div>*/}
                        {/*</div>*/}
                        <div id="mo_ta" className="chiTietItem">
                            {
                                hang.mo_ta
                            }
                        </div>
                        {/*<div id="chiTietItem2" className="chiTietItem">*/}
                        {/*    <div className="DanhGia">*/}
                        {/*        <div className="DanhGia1">*/}
                        {/*            <h1>5/5</h1>*/}
                        {/*            <img src="Image/Icon/stargold.png" alt=""/>*/}
                        {/*            <img src="Image/Icon/stargold.png" alt=""/>*/}
                        {/*            <img src="Image/Icon/stargold.png" alt=""/>*/}
                        {/*            <img src="Image/Icon/stargold.png" alt=""/>*/}
                        {/*            <img src="Image/Icon/stargray.png" alt=""/>*/}
                        {/*        </div>*/}
                        {/*        <div className="DanhGia2">*/}
                        {/*            <h2>Đánh giá của bạn</h2>*/}
                        {/*            <h2 id="ChuSao">0/5</h2>*/}
                        {/*            <ul>*/}
                        {/*                <li className="Sao" onClick="BinhLuanThaySao(1)"><img*/}
                        {/*                    src="Image/Icon/stargray.png"*/}
                        {/*                    alt=""/></li>*/}
                        {/*                <li className="Sao" onClick="BinhLuanThaySao(2)"><img*/}
                        {/*                    src="Image/Icon/stargray.png"*/}
                        {/*                    alt=""/></li>*/}
                        {/*                <li className="Sao" onClick="BinhLuanThaySao(3)"><img*/}
                        {/*                    src="Image/Icon/stargray.png"*/}
                        {/*                    alt=""/></li>*/}
                        {/*                <li className="Sao" onClick="BinhLuanThaySao(4)"><img*/}
                        {/*                    src="Image/Icon/stargray.png"*/}
                        {/*                    alt=""/></li>*/}
                        {/*                <li className="Sao" onClick="BinhLuanThaySao(5)"><img*/}
                        {/*                    src="Image/Icon/stargray.png"*/}
                        {/*                    alt=""/></li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <br/>*/}
                        {/*    <br/>*/}
                        {/*    <label className="DanhGia2Textarea">*/}
                        {/*        <textarea placeholder="Bình luận của bạn ... " defaultValue={""}/>*/}
                        {/*    </label>*/}
                        {/*    <br/>*/}
                        {/*    <button onClick className="BinhLuan button buttonMuaNgay" href="#">BÌNH LUẬN</button>*/}
                        {/*</div>*/}
                        {/*<div id="chiTietItem3" className="chiTietItem">*/}
                        {/*    <label className="DanhGia2Textarea">*/}
                        {/*        <textarea placeholder="Câu hỏi của bạn ... " defaultValue={""}/>*/}
                        {/*    </label>`*/}
                        {/*    <br/>*/}
                        {/*    <button onClick className="BinhLuan button buttonMuaNgay" href="#">GỬI CÂU</button>*/}
                        {/*</div>*/}
                    </section>
                    <section
                        id="ChiTietSanPhamSection2">
                        <GeneralBanner text="MỘT SỐ HÌNH ẢNH MÔ TẢ"/>

                        <div
                            id="imageContainer"
                            // style={{
                            //     display: 'flex',
                            //     flexDirection: 'column',
                            //     justifyContent: 'center',
                            //     width: '80%',
                            //     margin: 'auto'
                            // }}
                        >
                            {
                                listHinhAnhHang ? listHinhAnhHang.map((value, index) =>
                                    <div className={"listImageContain"}>
                                        <img style={{height: "100%", width: "100%"}} src={value.hinh_dai_dien} alt=""/>
                                    </div>) : <Loading/>
                            }
                            {/*            */}
                            {/*            <img src="Image/product/productdetail/mini4/1.JPG" >*/}
                        </div>
                    </section>
                </div> : <Loading/>
            }
        </>

    );
}


export default ChiTietSanPham;