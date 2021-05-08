import React from 'react';
import ProductItem from "../DungChung/ProductItem";

function ListProduct() {
    const ListProductData = [
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien: "Image/temp/thethao1.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien: "Image/temp/thethao1.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien: "Image/temp/thethao1.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien: "Image/temp/thethao1.jpg"
        },

    ]

    return (
        <div id="sanphamcontainer" className="sanphamcontainer">
            {
                ListProductData.map(((value, index) => <ProductItem data={value}/>))
            }
        </div>
    );
}

export default ListProduct;