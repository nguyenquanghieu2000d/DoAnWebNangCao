import React, {useEffect} from 'react';
import '../../../assets/css/Client/TrangChu/TrangChu.css'

import Slide1 from "./Slide1/Slide1";
import Slide2 from "./Slide2/Slide2";
import Banner from "./Banner/Banner";
import ListProduct from "../../DungChung/ListProduct";
import ListSanPhamHangDau from "./ListSanPham/ListSanPhamHangDau";
import ListCategory from "./ListCategory/ListCategory";
import GeneralBanner from "../../DungChung/GeneralBanner";
import ListTheme from "./ListTheme/ListTheme";

function TrangChu() {

    // ------------ Function Start ------------


    const Animate = () => {
        document.addEventListener("DOMContentLoaded", function () {
            const a = document.getElementById("section3");
            window.addEventListener("scroll", function () {
                if (window.pageYOffset > 300) {
                    a.style.animationDuration = "5s";
                    a.style.animationName = "scrollEvent";
                }
            })
        })
    }

    const TrangChuNavStyle = () => {
        // document.addEventListener("DOMContentLoaded", function () {
        //     const header = document.getElementsByTagName("header")[0]
        //     const logo = document.getElementById("navlogo")
        //     const navbar = document.getElementsByTagName("nav")[0]
        //     const headerCardBtn = document.getElementById("header-cart-btn")
        //     header.style.zIndex = 9;
        //     header.style.background = "#ffffff";
        //     header.style.color = "white";
        //     headerCardBtn.style.color = "white"
        //     logo.style.color = "white";
        //     navbar.style.position = "relative";
        //     navbar.style.background = "none";
        // })
    }


    useEffect(() => {
        // Animate();


    }, [])


    return (
        <>
            <video controls autoPlay loop muted>
                <source src="./Image/1122.mp4" type="video/mp4"/>
                {/*        <source src="Image/clip_Xop_Tam_Dao_3.mp4" type="video/ogg">*/}
                Your browser does not support the video tag.
            </video>
            <section id="TrangChusection1" className="slideAnh1">
                <Slide1/>
            </section>

            <section id="section3">
                <GeneralBanner text={"NHỮNG SẢN PHẨM MỚI NHẤT"}/>
                <div className="ListSanPhamHangDauContainer">
                    <Slide2/>
                </div>
            </section>
            <section id="section3-2">
                <Banner/>
            </section>
            <section id="section4">
                <GeneralBanner text={"NHỮNG SẢN PHẨM HÀNG ĐẦU"}/>
                <div id="DanhMuc">
                    <a className="button_a" href="#"><p>Áo</p></a>
                    <a className="button_a" href="#"><p>Quần jean</p></a>
                    <a className="button_a" href="#"><p>Đi biển</p></a>
                    <a className="button_a" href="#"><p>Váy</p></a>
                    <a className="button_a" href="#"><p>Legging</p></a>
                    <a className="button_a" href="#"><p>Áo khoác</p></a>
                    <a className="button_a" href="#"><p>Nội y</p></a>
                </div>
                <div className="ListSanPhamHangDauContainer">
                    <ListSanPhamHangDau gridItemPerColumn={4}/>
                </div>

                <div id="ButtonThemNua">
                    <a className="button_a" href="#"><p>THÊM NỮA NHÉ</p></a>
                </div>
            </section>
            <section id="section6">
                <GeneralBanner text={"PHONG CÁCH"}/>
                <div className="ListSanPhamHangDauContainer">
                    <ListTheme gridItemPerColumn={4}/>
                </div>
                <br/>
                <br/>
                <div className="section6container">
                    <a href="#"><img src="./Image/summer-party-5ee09fb6a291e.jpg"/></a>
                    <a href="#"><img src="./Image/summer-office-5ed46ef01ee60.jpg"/></a>
                    <a href="#"><img src="./Image/summer-heels-5ed8638521a25.jpg"/></a>
                </div>
                <GeneralBanner text={"CÁC SẢN PHẨM KHÁC"}/>
                <div className="ListSanPhamHangDauContainer">
                    <ListCategory gridItemPerColumn={4}/>
                </div>

                <div id="showshowcontainer2" className="showshowcontainer">
                    <div>
                        <a href="#">
                            <img src="Image/1200x630-3.jpg"/>
                            <h3>MỪNG SINH NHẬT - TRAO TRI ÂN</h3>
                            <p>Mừng tuổi lên 4 (10/6/2016 - 10/6/2020), HHNStore quyết định dành cả tháng 6 này để "chơi
                                lớn" và ăn mừng bữa tiệc sinh nhật...</p>
                            <h1>Xem thêm</h1>
                        </a>
                        <a href="#">
                            <img src="Image/1200x630-2.jpg"/>
                            <h3>MỪNG CHẶNG ĐƯỜNG 4 NĂM CỦA HHNStore </h3>
                            <p>Tháng 6 này, HHNStore hạnh phúc chào đón cột mốc tuổi lên 4 của mình với nhiều những câu
                                chuyện thành - bại, xúc cảm...</p>
                            <h1>Xem thêm</h1>
                        </a>
                    </div>
                </div>
            </section>
            <section id="section5">
                <div className="section5_container">
                    {/*            <div ><button class="section4button previous round">&#8249;</button></div>*/}
                    <img id="brand1" className="brandImage" src="./Image/Brand/fila.png" alt=""/>
                    <img id="brand2" className="brandImage" src="./Image/Brand/0.jpg"/>
                    <img id="brand3" className="brandImage" src="./Image/Brand/00000001542.png"/>
                    <img id="brand4" className="brandImage" src="./Image/Brand/Gucci-Logo-500x300.png"/>
                    <img id="brand5" className="brandImage"
                         src="Image/Brand/How-brand-licensing-hurt-the-Calvin-Klein-brand.jpg"/>
                    <img id="brand6" className="brandImage" src="./Image/Brand/louis-vuitton-1-1200x643.jpg"/>
                    <img id="brand7" className="brandImage" src="./Image/Brand/unnamed.jpg"/>
                    <img id="brand8" className="brandImage" src="./Image/Brand/VS.jpg"/>
                    {/*            <div ><button class="section4button round next">&#8250;</button></div>*/}
                </div>
                <div id="DangKyEmail">
                    <h1>
                        ĐĂNG KÝ VỚI HHNStore
                    </h1>
                    <h2>
                        Cập nhật thông tin các mặt hàng chất lượng mỗi ngày nhé
                    </h2>
                    <div className="fromDangKy">
                        <input className="input_1" type="text" placeholder="Nhập email tại đây nhé !!"/>
                        <button onClick={() => {
                            alert("Hello")
                        }}>Subcribe
                        </button>
                    </div>
                </div>
            </section>

            {TrangChuNavStyle()}
        </>
    );
}

export default TrangChu;
