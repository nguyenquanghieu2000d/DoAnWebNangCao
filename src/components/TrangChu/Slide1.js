import React from 'react';
import Slide1Item from "./Slide1Item";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Slide1() {
    const SlideData = [
        {
            id: 'img1',
            title1: 'Hàng mới về',
            title2: 'VÁY HỒNG CHẤM BI',
            title3: 'MỚI NHẤT ĐẾN TỪ ELISE'
        },
        {
            id: 'img2',
            title1: 'Hàng mới về',
            title2: 'VÁY HỒNG CHẤM BI',
            title3: 'MỚI NHẤT ĐẾN TỪ ELISE'
        },
        {
            id: 'img3',
            title1: 'Hàng mới về',
            title2: 'VÁY HỒNG CHẤM BI',
            title3: 'MỚI NHẤT ĐẾN TỪ ELISE'
        },

    ]


    return (
        <OwlCarousel className='owl-theme' loop margin={0} items={1} autoplay={true}>
            {
                SlideData.map(((value, index) =>
                    <Slide1Item data={value}/>))
            }
        </OwlCarousel>
    );
}

export default Slide1;