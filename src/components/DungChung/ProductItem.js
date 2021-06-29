import React from 'react';
import '../../assets/css/Client/TrangChu/Slide2Item.css'
import {convertToVND} from "../../assets/js/tools";
import {useNavigate} from "react-router-dom";

function ProductItem(props) {
    const data = props.data;
    const navigate = useNavigate()
    const chuyenTrangSanPham = () => {
        navigate("/app/chitietsanpham?id="+data.ma_hang)
    }


    return (
        <div onClick={chuyenTrangSanPham} className="slide2ItemContainer center_child">
            <div style={{cursor: 'pointer'}} id="sanpham1_1_1" className="sanpham new ">
                <div className="imagecontainer">
                    <img className="sanpham_img" src={data.hinh_dai_dien} alt=""/>
                </div>
                <div className="sanpham_container_button">
                    <div className="sanpham_button sale"><p>10%</p></div>
                    <button className="sanpham_button themsanpham" onClick={chuyenTrangSanPham}/>
                    {/*<a className="sanpham_button tim" href="#"/>*/}
                </div>
                <div className="sanpham_gia">
                    <p className="p1"><b> {data.thuong_hieu} </b>
                        <br/>
                        {data.ten_hang}
                    </p>
                    <p className="p2"><strike> {convertToVND(data.gia_cu)}</strike><br/>
                        {convertToVND(data.gia_moi) }</p>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;