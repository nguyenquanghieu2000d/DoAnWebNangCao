import React, {useEffect, useState} from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from "react-owl-carousel";
import ProductItem from "../../DungChung/ProductItem";
import {TaikhoanApi} from "../../../api/taikhoanApi";
import {HangAPI} from "../../../api/hangAPI";

function Slide2() {
    const [SlideData, setSlideData] = useState()


    const GetHangByCategory = async () => {
        const data = "CT0001"
        const response = await HangAPI.getHangByCategory(
            data
        );
        // alert(JSON.stringify(response))
        setSlideData(response)
    }

    useEffect(() => {
        GetHangByCategory()
    }, [])


    return (
        <>
            {
                SlideData ? <OwlCarousel className='owl-theme' loop margin={0} items={4}>
                    {
                        SlideData.map(((value, index) =>
                            <ProductItem data={value}/>))
                    }
                </OwlCarousel> : <div/>
            }
        </>

    );
}

export default Slide2;