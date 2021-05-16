import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from "react-owl-carousel";
import ProductItem from "../DungChung/ProductItem";

function Slide3() {
    return (
        <div className="ChiTietSanPhamSection1Item slideAnh1" id="ChiTietSanPhamSection1Item1">
            <div id="hinh_anh_mo_ta_container">
                <OwlCarousel className='owl-theme' loop margin={0} items={1} dots={true} autoplay={true}>
                    <img src="https://i.pinimg.com/736x/5b/fd/37/5bfd379ca788a0f32aeb3b3f88c12f97.jpg" alt=""/>
                    <img src="https://i.pinimg.com/736x/5b/fd/37/5bfd379ca788a0f32aeb3b3f88c12f97.jpg" alt=""/>
                    <img src="https://i.pinimg.com/736x/5b/fd/37/5bfd379ca788a0f32aeb3b3f88c12f97.jpg" alt=""/>
                </OwlCarousel>

            </div>
        </div>
    );
}

export default Slide3;