import React from 'react';
import AppBar from "./AppBar";

// import


function Navbar() {
    return (
        <header>
            <AppBar/>
            <nav className="navFull">
                <div id="container">
                    <div className="submenu">
                        <a id="TrangChu" className="TrangChu" href="#">Trang chủ</a>
                    </div>
                    <div className="submenu" id="QuanAo">
                        <a className="TrangChu" href="#">Trang phục</a>
                        <div id="QuanAoUL" className="submenu1">
                            <div className="submenu1container">
                                <div id="id" className="submenu1item">
                                    <a href="#">Áo sơ mi</a>
                                    <a href="#">Áo thun</a>
                                    <a href="#">Áo sơ mi</a>
                                    <a href="#">Áo hai dây &amp; Áo ba lỗ</a>
                                    <a href="#">Bodysuit</a>
                                    <a href="#">Bộ thời trang</a>
                                    <a href="#">Áo len</a>
                                    <a href="#">Áo nỉ</a>
                                    <a href="#"><b>Áo khoác &amp; Jacket</b></a>
                                    <a href="#">Áo khoác</a>
                                    <a href="#">Áo jacket</a>
                                    <a href="#">Áo vest</a>
                                    <a href="#">Đồ thể thao</a>
                                </div>
                                <div className="submenu1item">
                                    <a href="#"><b>Quần và váy</b></a>
                                    <a href="#">Chân váy</a>
                                    <a href="#">Quần</a>
                                    <a href="#">Quần short</a>
                                    <a href="#">Quần Leggings</a>
                                    <a href="#"><b>Jumpsuit &amp; Set bộ đồ </b></a>
                                </div>
                                <div className="submenu1item">
                                    <a href="#"><b>Đồ bơi</b></a>
                                    <a href="#">Áo bơi</a>
                                    <a href="#">Áo choàng</a>
                                    <a href="#"><b>Denim</b></a>
                                    <a href="#">Quần jean</a>
                                    <a href="#">Quần short Denim</a>
                                    <a href="#"><b>Đồ lót &amp; Đồ mặc nhà</b></a>
                                    <a href="#">Đồ lót</a>
                                    <a href="#">Đồ mặc nhà</a>
                                </div>
                                <div id="submenu1item2_1" className="submenu1item2">
                                    <h3>MUA THEO CHỦ ĐỀ</h3>
                                    <div className="submenu1item2_item">
                                        <a href="TimKiem.aspx?ma_loai=CT0001"><h3>Dạo phố</h3><img
                                            src="Image/navItem/1.jpg"/></a>
                                        <a href="TimKiem.aspx?ma_loai=CT0001"><h3>Ở nhà</h3><img
                                            src="Image/navItem/2.jpeg"/></a>
                                        <a href="TimKiem.aspx?ma_loai=CT0001"><h3>Công sở</h3><img
                                            src="Image/navItem/3.jpeg"/></a>
                                        <a href="TimKiem.aspx?ma_loai=CT0001"><h3>Đồ ngủ</h3><img
                                            src="Image/navItem/5.jpeg"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*                <ul id="QuanAoUL">*/}
                        {/*                    <li><a href="#">Hoodie</a></li>*/}
                        {/*                    <li><a href="#">Áo sơ mi</a></li>*/}
                        {/*                    <li><a href="#">Quần jean</a></li>*/}
                        {/*                    <li><a href="#"><b>Thêm nữa</b></a></li>*/}
                        {/*                </ul>*/}
                    </div>
                    <div className="submenu" id="Vay">
                        <a className="TrangChu" href="#">Váy &amp; Đầm</a>
                        <div id="VayUL" className="submenu1">
                            <div className="submenu1container">
                                <div className="submenu1item">
                                    <h3>MUA THEO LOẠI</h3>
                                    <a href="#">Váy Mini</a>
                                    <a href="#">Váy Midi</a>
                                    <a href="#">Váy Maxi</a>
                                    <a href="#">Chân Váy</a>
                                    <a href="#">Đầm Hai Dây</a>
                                    <a href="#">Đầm Sát Nách</a>
                                    <a href="#">Đầm Dạ Hội</a>
                                    <a href="#">Đầm Hạ Eo</a>
                                    <a href="#"><b>Thêm nữa ... </b></a>
                                </div>
                                <div id="submenu1item2_2" className="submenu1item2">
                                    <h3>MUA THEO XU HƯỚNG</h3>
                                    <div className="submenu1item2_item">
                                        <a href="#"><h3>Váy Mini</h3><img src="Image/navItem/13.jpeg"/></a>
                                        <a href="#"><h3>Váy Midi</h3><img src="Image/navItem/12.jpeg"/></a>
                                        <a href="#"><h3>Đầm Hai Dây</h3><img
                                            src="Image/navItem/hRMdSTy27TLuSbf6AJvE8wbxLCbRUKlCRO084Fv0.jpeg"/></a>
                                        <a href="#"><h3>Đầm Xòe</h3><img src="Image/navItem/16.jpeg"/></a>
                                        <a href="#"><h3>Đầm Hạ Eo</h3><img src="Image/navItem/14.jpeg"/></a>
                                        <a href="#"><h3>Đầm Sát Nách</h3><img src="Image/navItem/10.jpeg"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*                <ul id="VayUL">*/}
                        {/*                    <li><a href="#">Váy suông</a></li>*/}
                        {/*                    <li><a href="#">Váy chữ A</a></li>*/}
                        {/*                    <li><a href="#">Váy ôm</a></li>*/}
                        {/*                    <li><a href="#"><b>Thêm nữa</b></a></li>*/}
                        {/*                </ul>*/}
                    </div>
                    <div className="submenu" id="DoNgu">
                        <a className="TrangChu" href="#">Đồ ngủ</a>
                        <div id="DoNguUL" className="submenu1">
                            <div className="submenu1container">
                                <div className="submenu1item">
                                    <h3>THƯƠNG HIỆU</h3>
                                    <a href="#">21SIX Fashion</a>
                                    <a href="#">Bonbino</a>
                                    <a href="#">Sexy Forever</a>
                                    <a href="#">Maay Lingerie</a>
                                    <a href="#">Hera Homewear</a>
                                    <a href="#"><b>Thêm nữa ... </b></a>
                                </div>
                                <div id="submenu1item2_3" className="submenu1item2">
                                    <h3>MUA THEO THƯƠNG HIỆU</h3>
                                    <div className="submenu1item2_item">
                                        <a href="#"><h3>21SIX Fashion</h3><img src="Image/navItem/PJ06(1).JPG"/></a>
                                        <a href="#"><h3>Bonbino</h3><img
                                            src="Image/navItem/frDNyRsqtWpqJrtecX1fEh6RfPZ7YNQrCoNCgXJO.jpeg"/></a>
                                        <a href="#"><h3>Sexy Forever</h3><img
                                            src="Image/navItem/4LPUi2aI8sZHtxsfXNiMoTDARa0IIOQkUwq35xnS.jpeg"/></a>
                                        <a href="#"><h3>Maay Lingerie</h3><img src="Image/navItem/Julia(1).jpg"/></a>
                                        <a href="#"><h3>Hera Homewear</h3><img
                                            src="Image/navItem/vgDW5cBtcfJ0jY0kB6M6Z0xucWNqY5M3yEVR6WKS.jpeg"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*                <ul id="DoNguUL">*/}
                        {/*                    <li><a href="#">Pyjama</a></li>*/}
                        {/*                    <li><a href="#">Áo lụa</a></li>*/}
                        {/*                    <li><a href="#">Đầm ngủ</a></li>*/}
                        {/*                    <li><a href="#"><b>Thêm nữa</b></a></li>*/}
                        {/*                </ul>*/}
                    </div>
                    <div className="submenu" id="Giay">
                        <a className="TrangChu" href="#">Giày</a>
                        <div id="GiayUL" className="submenu1">
                            <div className="submenu1container">
                                <div className="submenu1item">
                                    <h3>MUA THEO LOẠI</h3>
                                    <a href="#">Dép</a>
                                    <a href="#">Giày xăng đan</a>
                                    <a href="#">Giày búp bê</a>
                                    <a href="#">Giày cao gót</a>
                                    <a href="#">Giày đế xuồng</a>
                                    <a href="#">Giày thể thao</a>
                                    <a href="#">Giày Boot</a>
                                    <a href="#"><b>Thêm nữa ... </b></a>
                                </div>
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
                                <div className="submenu1item">
                                    <a href="#"><b>TÚI</b></a>
                                    <a href="#">Balô</a>
                                    <a href="#">Túi crossbody</a>
                                    <a href="#">Túi ly hợp buổi tối</a>
                                    <a href="#">Ví tiền</a>
                                    <a href="#">Bộ thời trang</a>
                                    <a href="#">Túi xách tay</a>
                                    <a href="#">Túi đeo chéo</a>
                                    <a href="#">Set bộ túi</a>
                                    <a href="#">Phụ kiện túi</a>
                                    <a href="#">Túi vai &amp; Tote</a>
                                </div>
                                <div className="submenu1item">
                                    <a href="#"><b>PHỤ KIỆN</b></a>
                                    <a href="#">Phụ kiện Tóc</a>
                                    <a href="#">Vớ &amp; Quần vớ nữ</a>
                                    <a href="#">Kính râm</a>
                                    <a href="#">Thắt lưng</a>
                                    <a href="#">Mũ &amp; Găng tay</a>
                                    <a href="#">Khăn quàng cổ</a>
                                    <a href="#">Móc chìa khóa</a>
                                </div>
                                <div className="submenu1item">
                                    <a href="#"><b>ĐỒ TRANG SỨC</b></a>
                                    <a href="#">Dây chuyền</a>
                                    <a href="#">Hoa tai</a>
                                    <a href="#">Vòng tay</a>
                                    <a href="#">Nhẫn</a>
                                    <a href="#">Trâm cài</a>
                                </div>
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
                        <a className="TrangChu" href="TimKiem.aspx">Tìm kiếm</a>
                    </div>
                    <div className="submenu">
                        <a className="TrangChu" href="blog.html">Blog</a>
                    </div>
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
