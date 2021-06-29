import React from 'react';
import '../../assets/css/Client/TrangChu/Slide2Item.css'
import {convertToVND} from "../../assets/js/tools";

function ImageWithTextItem(props) {
    const data = props.data;

    return (
        <div className="sanpham hot">
            <div className="imagecontainer">
                <img className="sanpham_img" src={data.hinh_dai_dien} alt=""/>
            </div>
            <div className="sanpham_gia">
                <p className="p1"><b>{data.ten_the_loai}</b>
                </p>
            </div>
        </div>
    );
}

export default ImageWithTextItem;