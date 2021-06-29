import React, {useEffect, useState} from 'react';
import {HangAPI} from "../../../../api/hangAPI";
import ListProduct from "../../../DungChung/ListProduct";
import ListImageWithText from "../../../DungChung/ListImageWithText";

function ListTheme(props) {
    const gridItemPerColumn = props.gridItemPerColumn

    const ListCategoryData = [
        {
            "ten_the_loai": "TIỆC TÙNG",
            "hinh_dai_dien":"./Image/DRE11292-1(1).jpg"
        },
        {
            "ten_the_loai": "DẠO PHỐ",
            "hinh_dai_dien":"./Image/product/80.jpg"
        },
        {
            "ten_the_loai": "DU LỊCH",
            "hinh_dai_dien":"./Image/product/81.jpg"
        },
        {
            "ten_the_loai": "THỂ THAO",
            "hinh_dai_dien":"./Image/do-tap-gym-cho-nu-652x1024.jpg"
        },
        {
            "ten_the_loai": "MẶC NHÀ",
            "hinh_dai_dien":"./Image/EvQD49FYDMSxU7hUdhNvq3UqZ4nbZnjnOhRLsP6p.jpeg"
        },
        {
            "ten_the_loai": "CÔNG SỞ",
            "hinh_dai_dien":"./Image/AV1811041V-1(1).jpg"
        },
        {
            "ten_the_loai": "ĐI HỌC",
            "hinh_dai_dien":"./Image/65.1-copy.jpg"
        },
        {
            "ten_the_loai": "HẸN HÒ",
            "hinh_dai_dien":"./Image/product/87.jpeg"
        }

    ]

    return (
        <div className="sanphamcontainer">
            {
                ListCategoryData ? <ListImageWithText gridItemPerColumn={gridItemPerColumn} data={ListCategoryData}/>: <div/>
            }
        </div>
    );
}

export default ListTheme;