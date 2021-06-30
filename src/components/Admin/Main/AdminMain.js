import React from 'react';
import '../../../assets/css/Admin/admin.css'
import {Link, Outlet} from "react-router-dom";

function AdminMain() {
    return (
        <div>
            <header>
                <div className="PhanDauTien">
                    <a className="titlea" href="trangChu.html">
                        {/*                    <img id="LogoImage" src="Image/logo.png">*/}CuteStore
                    </a>
                    <div id="search_container">
                        <form className="header-search-form">
                            <input type="text" placeholder="Nhập để tìm kiếm ..."/>
                            <button><img src="Image/Icon/tools-and-utensils.png" alt=""/></button>
                        </form>
                    </div>
                    <div id="SignUpAndCreate_item1">
                    </div>
                </div>
            </header>
            <nav>
                <Link to={"/app/taikhoan"} style={{cursor: 'pointer'}}><i className="far fa-user-friends"
                                                                               style={{margin: '0 1rem'}}/>Quản lý khách
                    hàng</Link>
                <Link to={"/app/hang"} style={{cursor: 'pointer'}}><i className="far fa-shopping-bag"
                                                                               style={{margin: '0 1rem'}}/> Quản lý hàng</Link>
                <Link to={"/app/theloai"} style={{cursor: 'pointer'}} ><i className="far fa-caret-square-down"
                                                                               style={{margin: '0 1rem'}}/> Quản lý thể
                    loại</Link>
                <Link to={"/app/cttheloai"} style={{cursor: 'pointer'}} ><i className="fas fa-caret-square-down"
                                                                               style={{margin: '0 1rem'}}/> Quản lý chi
                    tiết thể loại</Link>
                <Link to={"/app/cttheloai"} style={{cursor: 'pointer'}} ><i className="fas fa-caret-square-down"
                                                                                                        style={{margin: '0 1rem'}}/> Quản lý banner</Link>
                <a style={{cursor: 'pointer'}} ><i className="far fa-chart-line"
                                                                               style={{margin: '0 1rem'}}/> Thống kê</a>
            </nav>
            <br/>
            <section id="frame" className="section11">
                <Outlet/>
            </section>
        </div>
    );
}


export default AdminMain;