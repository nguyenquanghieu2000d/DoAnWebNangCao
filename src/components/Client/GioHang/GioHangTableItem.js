import React, {useState} from 'react';
import {convertToVND} from "../../../assets/js/tools";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../constants/ActionTypes";
import {DonHangAPI} from "../../../api/donhangApi";
import {useNavigate} from "react-router-dom";

function GioHangTableItem(props) {
    const data = props.data;
    const [thanhCongTruSo, setthanhCongTruSo] = useState(data.so_luong)
    const localstorage = window.localStorage;
    const [disableButton, setDisableButton] = useState(false);
    const user = localstorage.getItem(process.env.REACT_APP_USER_PROFILE)

    const reRenderGioHang = useSelector(state => state.reRenderGiohang)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const CapNhatThongTinGioHangDatabase = async (value) => {
        setDisableButton(true)
        const User = JSON.parse(user);
        const response = await DonHangAPI.suaHangTrongGioHang(User.username, data.ma_hang, value)
        // alert(response)
        if(response){
            dispatch({type: actions.RE_RENDER_GIO_HANG, data: !reRenderGioHang})
        }
        setDisableButton(false)

    }

    const CapNhatThongTinGioHangByLocalStorage = async (value) => {
        let list_gio_hang = JSON.parse(localstorage.getItem(process.env.REACT_APP_LIST_GIO_HANG));
        list_gio_hang[data.ma_hang] = value
        localstorage.setItem(process.env.REACT_APP_LIST_GIO_HANG, JSON.stringify(list_gio_hang))
        dispatch({type: actions.RE_RENDER_GIO_HANG, data: !reRenderGioHang})
    }


    const ChangeSoLuong = async (value) => {
        if (user) CapNhatThongTinGioHangDatabase(value)
        else CapNhatThongTinGioHangByLocalStorage(value)
    }

    const minus = () => {
        if (thanhCongTruSo > 0) {
            ChangeSoLuong(thanhCongTruSo - 1)
            setthanhCongTruSo(thanhCongTruSo - 1)
        }
    }

    const push = () => {
        ChangeSoLuong(thanhCongTruSo + 1)
        setthanhCongTruSo(thanhCongTruSo + 1)
    }

    const chuyenTrangChiTiet = (e) => {
        navigate("/app/chitietsanpham?id="+data.ma_hang)
    }

    return (
        <tr >
            <td>
                <div>
                    {data.ma_hang}
                </div>
            </td>
            <td style={{cursor:'pointer'}} onClick={chuyenTrangChiTiet}>
                {/*<img src alt=""/>*/}
                <div >
                    { data.ten_hang}
                </div>
            </td>
            <td style={{cursor:'pointer', textAlign:"center"}}>
                {/*<img src alt=""/>*/}
                    <div style={{margin:'auto'}} className="ThanhCongTru ThanhCongTruVTKC">
                        <button disabled={disableButton} className="ThanhCongTruTru" onClick={minus}
                                defaultValue="-">-
                        </button>
                        <p id="thanhCongTruSo">{thanhCongTruSo}</p>
                        <button disabled={disableButton} className="ThanhCongTruCong" onClick={push}
                        >+
                        </button>
                    </div>
            </td>
            {/*<td style={{display:'flex',alignItems:'center', justifyContent:'center'}} >*/}
            {/*    <div >*/}
            {/*        { data.ten_hang}*/}
            {/*    </div>*/}

            {/*</td>*/}
            {/*<td><select className="minimal">*/}
            {/*    <option>Đỏ</option>*/}
            {/*    <option>Xanh Lam</option>*/}
            {/*    <option>Xanh Lá</option>*/}
            {/*</select></td>*/}
            {/*<td><select>*/}
            {/*    <option>S</option>*/}
            {/*    <option>M</option>*/}
            {/*    <option>L</option>*/}
            {/*</select></td>*/}
            <td className="size-col"><p>{convertToVND(data.gia_moi)}</p></td>
            <td style={{fontWeight: 'bold'}} id="thanh_tien'.$key.'"
                className="total-col">{convertToVND(data.thanh_tien)}
            </td>
        </tr>
    )
}


export default GioHangTableItem;