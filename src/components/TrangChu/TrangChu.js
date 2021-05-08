import React,{useEffect} from 'react';

import '../../assets/css/TrangChu/TrangChu.css'
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Banner from "./Banner";
import ListProduct from "./ListProduct";

function TrangChu() {

    // ------------ Function Start ------------

    const convertRemToPixels = (rem) => {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

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


    const NavbarChange = () => {
        document.addEventListener("DOMContentLoaded", function () {
            const asd = document.getElementsByTagName("NAV")[0];
            const video = document.getElementsByTagName("VIDEO")[0];
            const slideToDung = document.getElementsByClassName("slideAnh1")[0];
            // alert(slideToDung.innerHTML);
            // video.play();
            // alert(asd.toString());
            window.addEventListener("scroll", function () {
                if (window.pageYOffset > 1) {
                    asd.style.position = "fixed";
                    asd.style.top = "0";
                    // header.style.opacity = "0.8";
                    video.style.display = "none";
                    // asd.style.color = "#fff";
                    asd.style.background = "#282828";
                    // a.style.animationName = "scrollEvent";
                    slideToDung.style.position = "fixed";
                    slideToDung.style.top = "0";
                    slideToDung.style.zIndex = "999";
                } else {
                    asd.style.position = "relative";
                    asd.style.background = "none";
                    video.style.display = "block";
                    slideToDung.style.position = "static";
                }
                if (window.pageYOffset > convertRemToPixels(21.875)) {
                    slideToDung.style.position = "relative";
                }
            })
        })
    }

    useEffect(()=>{
        Animate();


    },[])

    // {NavbarChange()}
    // {Animate()}


    return (
        <>
            <video controls autoPlay loop muted>
                <source src="Image/1122.mp4" type="video/mp4"/>
                {/*        <source src="Image/clip_Xop_Tam_Dao_3.mp4" type="video/ogg">*/}
                Your browser does not support the video tag.
            </video>
            <section id="section1" className="slideAnh1">
                <Slide1/>
            </section>

            <section id="section3">
                <div className="section1shop">
                    <h1>
                        NHỮNG SẢN PHẨM MỚI NHẤT
                    </h1>
                    <div>
                    </div>
                </div>
                <Slide2/>
            </section>
            <section id="section3-2">
                <Banner/>
            </section>
            <section id="section4">
                <div className="section1shop">
                    <div>
                    </div>
                    <h1>
                        NHỮNG SẢN PHẨM HÀNG ĐẦU
                    </h1>
                </div>
                <div id="DanhMuc">
                    <a className="button_a" href="#"><p>Áo</p></a>
                    <a className="button_a" href="#"><p>Quần jean</p></a>
                    <a className="button_a" href="#"><p>Đi biển</p></a>
                    <a className="button_a" href="#"><p>Váy</p></a>
                    <a className="button_a" href="#"><p>Legging</p></a>
                    <a className="button_a" href="#"><p>Áo khoác</p></a>
                    <a className="button_a" href="#"><p>Nội y</p></a>
                </div>
                <ListProduct/>
                <div id="ButtonThemNua">
                    <a className="button_a" href="#"><p>THÊM NỮA NHÉ</p></a>
                </div>
            </section>
            <section id="section6">
                <div className="section1shop">
                    <h1>
                        PHONG CÁCH
                    </h1>
                    <div>
                    </div>
                </div>
                <div className="sanphamcontainer">
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/DRE11292-1(1).jpg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>TIỆC TÙNG</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/product/80.jpg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>DẠO PHỐ</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/product/81.jpg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>DU LỊCH</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/do-tap-gym-cho-nu-652x1024.jpg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>THỂ THAO</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/EvQD49FYDMSxU7hUdhNvq3UqZ4nbZnjnOhRLsP6p.jpeg"
                                 alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>MẶC NHÀ</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/AV1811041V-1(1).jpg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>CÔNG SỞ</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/65.1-copy.jpg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>ĐI HỌC</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/product/87.jpeg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>HẸN HÒ</b>
                            </p>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="section6container">
                    <a href="#"><img src="Image/summer-party-5ee09fb6a291e.jpg"/></a>
                    <a href="#"><img src="Image/summer-office-5ed46ef01ee60.jpg"/></a>
                    <a href="#"><img src="Image/summer-heels-5ed8638521a25.jpg"/></a>
                </div>
                <div className="section1shop">
                    <h1>
                        CÁC SẢN PHẨM KHÁC
                    </h1>
                    <div>
                    </div>
                </div>
                <div className="sanphamcontainer">
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/p1-5ecbae63e6cc2.jpeg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>GIÀY DÉP</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/p3-5ecbb4e1f3b58.jpeg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>TÚI XÁCH</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/p4-5ecbb0bfb6189.jpeg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>MĨ PHẨM</b>
                            </p>
                        </div>
                    </div>
                    <div className="sanpham hot">
                        <div className="imagecontainer">
                            <img className="sanpham_img" src="Image/p5-5ecbb5e79ad47.jpeg" alt=""/>
                        </div>
                        <div className="sanpham_gia">
                            <p className="p1"><b>PHỤ KIỆN</b>
                            </p>
                        </div>
                    </div>
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
                    <img id="brand1" className="brandImage" src="Image/Brand/fila.png" alt=""/>
                    <img id="brand2" className="brandImage" src="Image/Brand/0.jpg"/>
                    <img id="brand3" className="brandImage" src="Image/Brand/00000001542.png"/>
                    <img id="brand4" className="brandImage" src="Image/Brand/Gucci-Logo-500x300.png"/>
                    <img id="brand5" className="brandImage"
                         src="Image/Brand/How-brand-licensing-hurt-the-Calvin-Klein-brand.jpg"/>
                    <img id="brand6" className="brandImage" src="Image/Brand/louis-vuitton-1-1200x643.jpg"/>
                    <img id="brand7" className="brandImage" src="Image/Brand/unnamed.jpg"/>
                    <img id="brand8" className="brandImage" src="Image/Brand/VS.jpg"/>
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
            {NavbarChange()}
        </>
    );
}

export default TrangChu;
