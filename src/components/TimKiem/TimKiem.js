import React from 'react';
import "../../assets/css/TimKiem/TimKiem.css"
import ListProduct from "../DungChung/ListProduct";
import TimKiemFilter from "./TimKiemFilter";
import GeneralBanner from "../DungChung/GeneralBanner";
import ListSanPhamFilter from "./ListSanPhamFilter";

function Slide2() {
    return (
        <div>
            <GeneralBanner text="Shop"/>
            <section id="section2shop">
                <div id="section2shopcontainer">
                    <TimKiemFilter/>
                    <div style={{width: '75%'}}>
                        <div id="section2shop_item2">
                            <ListSanPhamFilter gridItemPerColumn={3}/>
                        </div>
                        <div id="ButtonThemNua">
                            <a className="themnua button_a" onClick="okok()" href="#">THÊM NỮA NHÉ</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Slide2;