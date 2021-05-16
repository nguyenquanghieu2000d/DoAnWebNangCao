import React from 'react';
import ListProduct from "../DungChung/ListProduct";

function ListSanPhamFilter(props) {
    const gridItemPerColumn = props.gridItemPerColumn
    const ListProductData = [
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien: "Image/temp/39.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien: "Image/temp/39.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien: "Image/temp/39.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien: "Image/temp/39.jpg"
        },

    ]
    return (
        <ListProduct gridItemPerColumn={gridItemPerColumn} data={ListProductData}/>
    );
}

export default ListSanPhamFilter;