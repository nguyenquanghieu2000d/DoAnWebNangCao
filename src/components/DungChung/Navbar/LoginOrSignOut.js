import React from 'react';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {Menu, MenuItem} from "@material-ui/core";
import $ from "jquery"
import {Link} from "react-router-dom";
import * as actions from "../../../constants/ActionTypes";

// import


function LoginOrSignOut() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const navigate = useNavigate()
    const reRenderGioHang = useSelector(state => state.reRenderGiohang)
    const Userprofile = useSelector(state => state.userProfile)
    const dispatch = useDispatch()
    const localstorage = window.localStorage;
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const diDenDangNhap = (event) => {
        event.preventDefault();
        navigate("/app/dangnhap")
    }

    const diDenDangKy = (event) => {
        event.preventDefault();
        navigate("/app/dangky")
        DangXuatQuanLyToggle()
    }

    const diDenThongTinCaNhan = (event) => {
        event.preventDefault();
        navigate("/app/thongtincanhan")
        DangXuatQuanLyToggle()
    }

    function DangXuatQuanLyToggle() {
        $("#DangXuatQuanLy").toggle();
    }




    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );


    return (
        <div style={{display: "flex", justifyContent: "center", alignItem: "center"}}>
            {Userprofile ? <>
                <div className="SignUpAndCreate_item1_item_container">
                    <p>Xin chào, </p>
                    <p style={{cursor: 'pointer'}} className="SignUpAndCreate_item1_item"
                       onClick={(e) => diDenThongTinCaNhan(e)}>
                        {Userprofile.hoten}
                    </p>
                    {/*<div id="DangXuatQuanLy" style={{*/}
                    {/*    display: 'none',*/}
                    {/*    position: 'absolute',*/}
                    {/*    zIndex: 999,*/}
                    {/*    top: '3rem',*/}
                    {/*    background: 'lightgray',*/}
                    {/*    borderRadius: '0.3rem'*/}
                    {/*}}>*/}
                    {/*    <input type="button"*/}
                    {/*           onClick={(e) => diDenThongTinCaNhan(e)}*/}
                    {/*           style={{backgroundColor: '#ebebeb', margin: '0.2rem', width: '10rem', cursor: 'pointer'}}*/}
                    {/*           className="input_1" id="btnQuanLyTaiKhoan" defaultValue="Quản lý tài khoản"/>*/}
                    {/*    <input type="button"*/}
                    {/*           style={{backgroundColor: '#ebebeb', margin: '0.2rem', width: '10rem', cursor: 'pointer'}}*/}
                    {/*           onClick={(e) => dangXuat(e)}*/}
                    {/*           className="input_1" id="btnDangXuat" defaultValue="Đăng xuất"/>*/}
                    {/*</div>*/}
                </div>

            </> : <>
                <Link to={"/app/dangnhap"} className="SignUpAndCreate_item1_item">
                    <i className="fal fa-user-alt" style={{fontSize: '30px', margin: '0 0.3rem'}}/>Đăng nhập</Link>
                <div style={{width: '0.01rem', backgroundColor: 'gray', height: '2rem'}}/>
                <a href="dangky" className="SignUpAndCreate_item1_item" id="btnDangKy" runat="server">
                    <i className="fal fa-user-plus" style={{fontSize: '30px', margin: '0 0.3rem'}}/>
                    Tạo tài khoản</a>
                <div style={{width: '0.01rem', backgroundColor: 'gray', height: '2rem', marginRight: '0.7rem'}}/>
            </>}

        </div>
    )
}

export default LoginOrSignOut;