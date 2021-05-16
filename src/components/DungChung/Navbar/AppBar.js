import React from 'react';
import Navbar from "./Navbar";
import LoginOrSignOut from "./LoginOrSignOut";
import $ from "jquery"
import {Link} from "react-router-dom";
// import


function AppBar() {


    function shoppingCartOnclick() {
        $("#cart-list").toggle()
        // alert("123")
    }

    return (
        <div className="PhanDauTien">
            <div className="LogoAndClick">
                {/*                    <asp:HyperLink class="titlea" ID="HyperLink2" NavigateUrl="~/TrangChu.aspx">HHNStore</asp:HyperLink>*/}
                <Link id="navlogo" className="titlea" to="/app/trangchu">HHNStore</Link>
            </div>
            <div id="search_container">
                <div className="header-search-form">
                    <input type="text" placeholder="Nhập để tìm kiếm ..."/>
                    <button><img src="Image/Icon/tools-and-utensils.png"/></button>
                </div>
            </div>

            <div id="SignUpAndCreate_item1">
                <LoginOrSignOut/>
            </div>
            <div className="header-cart-menu d-flex align-items-center ml-auto">
                {/* Cart Area */}
                <div className="cart">
                    <div  onClick={() =>shoppingCartOnclick()} style={{cursor: 'pointer'}} id="header-cart-btn"><span id="tong_so_hang" className="cart_quantity">0</span><i
                        className="fal fa-shopping-bag" style={{fontSize: '30px', margin: '0 0.3rem'}}/>Giỏ hàng</div>
                    {/* Cart List Area Start */}
                    <div id="cart-list" className="cart-list" style={{borderRadius: '1rem', padding: '1rem'}}>
                        <div id="itemGioHangContainer">
                            <div className="itemGioHang_"
                                 style={{display: 'flex', cursor: 'pointer', padding: '0.3rem'}}>
                                <a style={{color: '#1b1e21'}} className="image">
                                    <img src="Image/AV1811041V-1(1).jpg" className="cart-thumb" alt=""/></a>
                                <div className="cart-item-desc">
                                    <a href="#">HelloXinh</a>
                                    <p style={{color: '#1b1e21'}}>12 x <span className="price">200000 VND</span></p>
                                </div>
                                <span className="dropdown-product-remove"><i className="icon-cross"/></span>
                            </div>
                            <br/>
                        </div>
                        <div id="gioHangBottom" className="total" style={{
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                                <span style={{color: '#1b1e21'}} className="pull-right"><p>Tổng tiền: </p><p
                                    style={{fontWeight: 'bold'}} id="tongtien">0</p></span>
                            <br/>
                            <div>
                                <a href="gioHang.aspx"
                                   style={{borderRadius: '1rem', backgroundColor: 'white', padding: '1rem'}}>Giỏ
                                    hàng</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AppBar;