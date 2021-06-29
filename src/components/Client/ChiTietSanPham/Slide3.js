import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from "react-owl-carousel";
import Loading from "../../DungChung/Loading";

function Slide3(props) {
    const data = props.data;
    return (
        <>
            <div style={{width:'35%'}}>
                {
                    data ? <OwlCarousel className='owl-theme' loop margin={2} items={1} dots={true} autoplay={true}>
                                {
                                    data.map((value, index) => {
                                        return <div className="ChiTietSanPhamSection1Item" id="ChiTietSanPhamSection1Item1">
                                            <img style={{height:'100%'}} src={value.hinh_dai_dien} alt=""/>
                                        </div>
                                    })
                                }
                            </OwlCarousel> : <Loading/>
                }
            </div>
        </>

    );
}


export default Slide3;