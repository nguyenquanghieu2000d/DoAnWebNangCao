import React, {useEffect, useState} from 'react';
import AppBar from "./AppBar";
import {Link} from "react-router-dom";
import "../../../assets/css/Client/DungChung/Navbar.css"
import {TheloaiAPI} from "../../../api/theloaiApi";
import Loading from "../Loading";
import {CtTheloaiAPI} from "../../../api/cttheloaiApi";

// import


function Navbar() {
    const nav1 = ["Váy", "Áo", "Quần"]
    const nav2 = ["Giày"]
    const nav3 = ["Phụ Kiện", "Đồ Trang Sức","Túi"]

    const [hello, setHello] = useState(true)
    const [listTheLoai, setListTheloai] = useState("")
    const [listTheLoai2, setListTheloai2] = useState("")
    const [listTheLoai3, setListTheloai3] = useState("")
    const getCtTheLoai = async (ma_the_loai) => {
        const response = await CtTheloaiAPI.getCtTheLoai(ma_the_loai)
        const temp = []
        if (response) {
            for (let i = 0; i < 3; i++) {
                if (response[i]) {
                    temp.push(response[i])
                } else {
                    // alert("Vượt quá")
                }
            }
            return temp;
        }
    }

    const getTheLoai = async () => {
        const response = await TheloaiAPI.getTheLoai()
        // alert(JSON.stringify(response))
        const temp = []
        const temp2 = []
        const temp3 = []
        if (response) {
            response.map((value, index) => {
                // alert(JSON.stringify(value))
                nav1.map(async (value1, index) => {
                    if (value1 === value.ten_loai) {
                        temp.push(value)
                    }
                })
                nav2.map(async (value1, index) => {
                    if (value1 === value.ten_loai) {
                        temp2.push(value)
                    }
                })
                nav3.map(async (value1, index) => {
                    if (value1 === value.ten_loai) {
                        temp3.push(value)
                    }
                })
            })

            for (let i = 0; i < temp.length; i++) {
                const t = await getCtTheLoai(temp[i].ma_the_loai)
                temp[i].listct = t
            }

            for (let i = 0; i < temp2.length; i++) {
                const t = await getCtTheLoai(temp2[i].ma_the_loai)
                temp2[i].listct = t
            }
            for (let i = 0; i < temp3.length; i++) {
                const t = await getCtTheLoai(temp3[i].ma_the_loai)
                temp3[i].listct = t
            }
            // alert(JSON.stringify(temp))
            setListTheloai(temp)
            setListTheloai2(temp2)
            setListTheloai3(temp3)
        }


    }


    useEffect(() => {
        getTheLoai()
    }, [hello])


    return (
        <header>
            <AppBar/>
            <nav className="navFull">
                <div id="container">
                    {/*<button onClick={getTheLoai}>Hello</button>*/}
                    <div className="submenu">
                        <Link to={"/app/trangchu"} id="TrangChu" className="TrangChu">Trang chủ</Link>
                    </div>
                    <div className="submenu" id="QuanAo">
                        <a className="TrangChu" href="#">Trang phục</a>
                        <div
                            // style={{display: 'block'}}
                            id="QuanAoUL" className="submenu1">
                            <div className="submenu1container">
                                {
                                    listTheLoai ? listTheLoai.map((value, index) => {
                                        return <>

                                            <div className="submenu1item">
                                                <Link to={"/app/timkiem"} style={{fontWeight:'bold', textTransform: "uppercase",lineHeight:1.8}}>{value.ten_loai}</Link>
                                                {
                                                    value.listct ? value.listct.map((value2, index2) => {
                                                        return <Link to={"/app/timkiem"} style={{lineHeight:1.6}}>{value2.ten_ct_the_loai}</Link>
                                                    }):""
                                                }
                                            </div>

                                        </>
                                    }) : <Loading/>
                                }

                                {/*<div className="submenu1item">*/}
                                {/*    <a href="#"><b>Quần và váy</b></a>*/}
                                {/*    <a href="#">Chân váy</a>*/}
                                {/*    <a href="#">Quần</a>*/}
                                {/*    <a href="#">Quần short</a>*/}
                                {/*    <a href="#">Quần Leggings</a>*/}
                                {/*    <a href="#"><b>Jumpsuit &amp; Set bộ đồ </b></a>*/}
                                {/*</div>*/}
                                {/*<div className="submenu1item">*/}
                                {/*    <a href="#"><b>Đồ bơi</b></a>*/}
                                {/*    <a href="#">Áo bơi</a>*/}
                                {/*    <a href="#">Áo choàng</a>*/}
                                {/*    <a href="#"><b>Denim</b></a>*/}
                                {/*    <a href="#">Quần jean</a>*/}
                                {/*    <a href="#">Quần short Denim</a>*/}
                                {/*    <a href="#"><b>Đồ lót &amp; Đồ mặc nhà</b></a>*/}
                                {/*    <a href="#">Đồ lót</a>*/}
                                {/*    <a href="#">Đồ mặc nhà</a>*/}
                                {/*</div>*/}
                                <div id="submenu1item2_1" className="submenu1item2">
                                    <h3>MUA THEO CHỦ ĐỀ</h3>
                                    <div className="submenu1item2_item">
                                        <a href="TimKiem.aspx?ma_loai=CT0001"><h3>Dạo phố</h3><img
                                            src="Image/navItem/1.jpg"/></a>
                                        <a href="TimKiem.aspx?ma_loai=CT0001"><h3>Ở nhà</h3><img
                                            src="Image/navItem/2.jpeg"/></a>
                                        <a href="TimKiem.aspx?ma_loai=CT0001"><h3>Công sở</h3><img
                                            src="Image/navItem/3.jpeg"/></a>
                                    {/*    <a href="TimKiem.aspx?ma_loai=CT0001"><h3>Đồ ngủ</h3><img*/}
                                    {/*        src="Image/navItem/5.jpeg"/></a>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="submenu" id="Vay">*/}
                    {/*    <a className="TrangChu" href="#">Váy &amp; Đầm</a>*/}
                    {/*    <div id="VayUL" className="submenu1">*/}
                    {/*        <div className="submenu1container">*/}
                    {/*            <div className="submenu1item">*/}
                    {/*                <h3>MUA THEO LOẠI</h3>*/}
                    {/*                <a href="#">Váy Mini</a>*/}
                    {/*                <a href="#">Váy Midi</a>*/}
                    {/*                <a href="#">Váy Maxi</a>*/}
                    {/*                <a href="#">Chân Váy</a>*/}
                    {/*                <a href="#">Đầm Hai Dây</a>*/}
                    {/*                <a href="#">Đầm Sát Nách</a>*/}
                    {/*                <a href="#">Đầm Dạ Hội</a>*/}
                    {/*                <a href="#">Đầm Hạ Eo</a>*/}
                    {/*                <a href="#"><b>Thêm nữa ... </b></a>*/}
                    {/*            </div>*/}
                    {/*            <div id="submenu1item2_2" className="submenu1item2">*/}
                    {/*                <h3>MUA THEO XU HƯỚNG</h3>*/}
                    {/*                <div className="submenu1item2_item">*/}
                    {/*                    <a href="#"><h3>Váy Mini</h3><img src="Image/navItem/13.jpeg"/></a>*/}
                    {/*                    <a href="#"><h3>Váy Midi</h3><img src="Image/navItem/12.jpeg"/></a>*/}
                    {/*                    <a href="#"><h3>Đầm Hai Dây</h3><img*/}
                    {/*                        src="Image/navItem/hRMdSTy27TLuSbf6AJvE8wbxLCbRUKlCRO084Fv0.jpeg"/></a>*/}
                    {/*                    <a href="#"><h3>Đầm Xòe</h3><img src="Image/navItem/16.jpeg"/></a>*/}
                    {/*                    <a href="#"><h3>Đầm Hạ Eo</h3><img src="Image/navItem/14.jpeg"/></a>*/}
                    {/*                    <a href="#"><h3>Đầm Sát Nách</h3><img src="Image/navItem/10.jpeg"/></a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*<div className="submenu" id="DoNgu">*/}
                    {/*    <a className="TrangChu" href="#">Đồ ngủ</a>*/}
                    {/*    <div id="DoNguUL" className="submenu1">*/}
                    {/*        <div className="submenu1container">*/}
                    {/*            <div className="submenu1item">*/}
                    {/*                <h3>THƯƠNG HIỆU</h3>*/}
                    {/*                <a href="#">21SIX Fashion</a>*/}
                    {/*                <a href="#">Bonbino</a>*/}
                    {/*                <a href="#">Sexy Forever</a>*/}
                    {/*                <a href="#">Maay Lingerie</a>*/}
                    {/*                <a href="#">Hera Homewear</a>*/}
                    {/*                <a href="#"><b>Thêm nữa ... </b></a>*/}
                    {/*            </div>*/}
                    {/*            <div id="submenu1item2_3" className="submenu1item2">*/}
                    {/*                <h3>MUA THEO THƯƠNG HIỆU</h3>*/}
                    {/*                <div className="submenu1item2_item">*/}
                    {/*                    <a href="#"><h3>21SIX Fashion</h3><img src="Image/navItem/PJ06(1).JPG"/></a>*/}
                    {/*                    <a href="#"><h3>Bonbino</h3><img*/}
                    {/*                        src="Image/navItem/frDNyRsqtWpqJrtecX1fEh6RfPZ7YNQrCoNCgXJO.jpeg"/></a>*/}
                    {/*                    <a href="#"><h3>Sexy Forever</h3><img*/}
                    {/*                        src="Image/navItem/4LPUi2aI8sZHtxsfXNiMoTDARa0IIOQkUwq35xnS.jpeg"/></a>*/}
                    {/*                    <a href="#"><h3>Maay Lingerie</h3><img src="Image/navItem/Julia(1).jpg"/></a>*/}
                    {/*                    <a href="#"><h3>Hera Homewear</h3><img*/}
                    {/*                        src="Image/navItem/vgDW5cBtcfJ0jY0kB6M6Z0xucWNqY5M3yEVR6WKS.jpeg"/></a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    /!*                <ul id="DoNguUL">*!/*/}
                    {/*    /!*                    <li><a href="#">Pyjama</a></li>*!/*/}
                    {/*    /!*                    <li><a href="#">Áo lụa</a></li>*!/*/}
                    {/*    /!*                    <li><a href="#">Đầm ngủ</a></li>*!/*/}
                    {/*    /!*                    <li><a href="#"><b>Thêm nữa</b></a></li>*!/*/}
                    {/*    /!*                </ul>*!/*/}
                    {/*</div>*/}
                    <div className="submenu" id="Giay">
                        <a className="TrangChu" href="#">Giày</a>
                        <div id="GiayUL" className="submenu1">
                            <div className="submenu1container">
                                {
                                    listTheLoai2 ? listTheLoai2.map((value, index) => {
                                        return <>

                                            <div className="submenu1item">
                                                <Link to={"/app/timkiem"} style={{fontWeight:'bold', textTransform: "uppercase",lineHeight:1.8}}>{value.ten_loai}</Link>
                                                {
                                                    value.listct ? value.listct.map((value2, index2) => {
                                                        return <Link to={"/app/timkiem"} style={{lineHeight:1.6}}>{value2.ten_ct_the_loai}</Link>
                                                    }):""
                                                }
                                            </div>

                                        </>
                                    }) : <Loading/>
                                }

                                <div id="submenu1item2_4" className="submenu1item2">
                                    <div className="submenu1item2_item">
                                        <a href="#"><h3>Hàng mới</h3><img src="Image/navItem/15573671702691852556.jpg"/></a>
                                        <a href="#"><h3>Bán chạy</h3><img src="Image/navItem/15573672672502939846.jpg"/></a>
                                        <a href="#"><h3>Khuyến mãi</h3><img
                                            src="Image/navItem/15573673161352460799.jpg"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*                <ul id="GiayUL">*/}
                        {/*                    <li><a href="#">Sneaker</a></li>*/}
                        {/*                    <li><a href="#">Giày cao gót</a></li>*/}
                        {/*                    <li><a href="#"><b>Thêm nữa</b></a></li>*/}
                        {/*                </ul>*/}
                    </div>
                    <div className="submenu" id="PhuKien">
                        <a className="TrangChu" href="#">Phụ kiện</a>
                        <div id="PhuKienUL" className="submenu1">
                            <div className="submenu1container">
                                {
                                    listTheLoai3 ? listTheLoai3.map((value, index) => {
                                        return <>

                                            <div className="submenu1item">
                                                <Link to={"/app/timkiem"} style={{fontWeight:'bold', textTransform: "uppercase",lineHeight:1.8}}>{value.ten_loai}</Link>
                                                {
                                                    value.listct ? value.listct.map((value2, index2) => {
                                                        return <Link to={"/app/timkiem"} style={{lineHeight:1.6}}>{value2.ten_ct_the_loai}</Link>
                                                    }):""
                                                }
                                            </div>

                                        </>
                                    }) : <Loading/>
                                }
                                <div id="submenu1item2_5" className="submenu1item2">
                                    <div className="submenu1item2_item">
                                        <a href="#"><h3>Bán chạy</h3><img src="Image/navItem/15573718613386128131.jpg"/></a>
                                        <a href="#"><h3>NEW</h3><img src="Image/navItem/15573718902767655164.jpg"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*                <ul id="PhuKienUL">*/}
                        {/*                    <li><a href="#">Ví cầm tay</a></li>*/}
                        {/*                    <li><a href="#">Đồng hồ</a></li>*/}
                        {/*                    <li><a href="#">Túi đeo</a></li>*/}
                        {/*                    <li><a href="#"><b>Thêm nữa</b></a></li>*/}
                        {/*                </ul>*/}
                    </div>
                    <div className="submenu">
                        <Link className="TrangChu" to={"timkiem"}>Tìm kiếm</Link>
                    </div>
                    {/*<div className="submenu">*/}
                    {/*    <a className="TrangChu" href="blog.html">Blog</a>*/}
                    {/*</div>*/}
                </div>
            </nav>
            <nav className="responsiveNav">
                <button onClick="responsiveNavClick()"><img src="Image/Icon/open-menu%20(2).png"/></button>
            </nav>
            <div className="responsiveNavItem">
                <a className="TrangChu" href="#">Trang chủ</a>
                <a className="TrangChu" href="#">Trang phục</a>
                <a className="TrangChu" href="#">Váy &amp; Đầm</a>
                <a className="TrangChu" href="#">Đồ ngủ</a>
                <a className="TrangChu" href="#">Giày</a>
                <a className="TrangChu" href="#">Phụ kiện</a>
                <a className="TrangChu" href="shop.html">Tìm kiếm</a>
                <a className="TrangChu" href="blog.html">Blog</a>
            </div>
        </header>
    );
}


export default Navbar;
