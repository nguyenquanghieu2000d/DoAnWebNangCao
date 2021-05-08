import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from "react-owl-carousel";
import ProductItem from "../DungChung/ProductItem";

function Slide2() {
    const SlideData = [
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien:"Image/temp/thethao1.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien:"Image/temp/thethao1.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien:"Image/temp/thethao1.jpg"
        },
        {
            ten_hang: "THREE LAYER FRILLED ONNIDRESS",
            gia_cu: 8000000,
            gia_moi: 250000,
            thuong_hieu: "in the now",
            hinh_dai_dien:"Image/temp/thethao1.jpg"
        },

    ]
    return (
        <OwlCarousel className='owl-theme' loop margin={0} items={4}>
            {
                SlideData.map(((value, index) =>
                    <ProductItem data={value}/>))
            }
        </OwlCarousel>
    );
}

export default Slide2;