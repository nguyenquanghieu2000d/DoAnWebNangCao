import React, {useEffect, useState} from 'react';
import LoginOrSignOut from "./LoginOrSignOut";
import $ from "jquery"
import {Link, useNavigate} from "react-router-dom";
import {HangAPI} from "../../../api/hangAPI";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../Loading";
import {convertToVND} from "../../../assets/js/tools";
import Box from "@material-ui/core/Box";
import {DonHangAPI} from "../../../api/donhangApi";
import Button from "@material-ui/core/Button";
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    TextField,
    withStyles
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import * as actions from "../../../constants/ActionTypes";




function AppBar() {

    const [listHang, setListHang] = useState("")
    const [tongTien, setTongTien] = useState(0)
    const [tongSohang, settongSohang] = useState(0)
    // const
    const localstorage = window.localStorage;
    const user = localstorage.getItem(process.env.REACT_APP_USER_PROFILE)
    const [options, setOptions] = useState("")
    const navigate = useNavigate();


    const [ListhangFilter, setListhangFilter] = useState([]);
    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)
    const reRenderFilterTK = useSelector(state => state.reRenderFilterTimKiem)
    const dispatch = useDispatch()
    const reRenderGioHang = useSelector(state => state.reRenderGiohang)





    const ValidationTextField = withStyles({
        root: {
            '& input:valid + fieldset': {
                borderColor: 'green',
                borderWidth: 2,
            },
            '& input:invalid + fieldset': {
                borderColor: 'red',
                borderWidth: 2,
            },
            '& input:valid:focus + fieldset': {
                borderLeftWidth: 6,
                padding: '4px !important', // override inline-style
            },
        },
    })(TextField);

    function shoppingCartOnclick() {
        $("#cart-list").toggle()
        // alert("123")
    }

    const navigateChiTietSanPham = (e, ma_hang) => {
        e.preventDefault();
        navigate("/app/chitietsanpham?id=" + ma_hang)
    }
    const TaiThongTinGioHangByLocalStorage = async () => {
        let list_gio_hang = JSON.parse(localstorage.getItem(process.env.REACT_APP_LIST_GIO_HANG));
        let tong = 0
        let tong_hang = 0
        const listhangMuaDetail = []
        for (const k in list_gio_hang) {
            if (list_gio_hang.hasOwnProperty(k)) {
                const response = await HangAPI.getHangById(k);
                response.so_luong = list_gio_hang[k];
                listhangMuaDetail.push(response)
                response.thanh_tien = response.gia_moi * response.so_luong
                tong += response.thanh_tien
                tong_hang += response.so_luong
            }
        }
        setListHang(listhangMuaDetail)
        setTongTien(tong)
        settongSohang(tong_hang)
    }

    const TaiThongTinGioHangByDatabase = async () => {
        const User = JSON.parse(user)
        const response = await DonHangAPI.getCtDonhangById(User.username)
        setListHang(response)
        const response2 = await DonHangAPI.getTongTienGioHang(User.username)
        if (response2.tong_tien == null) setTongTien(0)
        else setTongTien(response2.tong_tien)
        const response3 = await DonHangAPI.getSoLuongGioHang(User.username)
        if (response3.data === 0) settongSohang(0)
        else settongSohang(response3)
    }


    const TaiThongTinGioHang = async () => {
        if (user) TaiThongTinGioHangByDatabase()
        else TaiThongTinGioHangByLocalStorage()
    }


    useEffect(() => {
        TaiThongTinGioHang()
    }, [reRenderGioHang])


    const [isShopingCartOpen, setIsShoppingCartOpen] = React.useState({right: false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsShoppingCartOpen({...isShopingCartOpen, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            style={{
                width: 400

            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className={"gioHangCuaban"}>GIỎ HÀNG CỦA BẠN</div>
            <Divider/>
            <div id="itemGioHangContainer">
                {
                    listHang ? listHang.map((value, index) => {
                        return (
                            <>
                                <div className="itemGioHang_"
                                     onClick={
                                         (e) => navigateChiTietSanPham(e, value.ma_hang)
                                     }
                                     style={{display: 'flex', cursor: 'pointer', padding: '0.3rem'}}>
                                    <a style={{width:"4rem", height:"6rem",color: '#1b1e21'}}>
                                        <img src={value.hinh_dai_dien} style={{width:'100%', height:'100%'}} alt=""/>
                                    </a>
                                    <div className="cart-item-desc">
                                        <Box href="#">{value.ten_hang}</Box>
                                        <p style={{color: 'gray', fontSize:'1rem'}}>{value.so_luong} x <span
                                            className="price">{convertToVND(value.gia_moi)}</span></p>
                                    </div>
                                    <span className="dropdown-product-remove"><i className="icon-cross"/></span>
                                </div>
                                <Divider/>
                            </>

                        )
                    }) : <Loading/>
                }
            </div>
            <div id="gioHangBottom" className="total" style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                            <span style={{color: '#1b1e21'}} className="pull-right"><p>Tổng tiền: </p><p
                                style={{fontWeight: 'bold'}} id="tongtien">{convertToVND(tongTien)}</p></span>
                <br/>

                <Link to={"/app/giohang"} onClick={shoppingCartOnclick}
                className={"btn1"}
                >Giỏ hàng</Link>

            </div>
        </div>
    );
    const [searchValue, setSearchValue] = useState("")
    const [value, setValue] = useState("")
    const InputValueChange = (e,newvalue) => {

        setSearchValue(newvalue)
    }

    const InputAutoChange = (e, value) =>{
        // alert(JSON.stringify(value))
        if(value)
            navigate("/app/chitietsanpham?id=" + value.ma_hang)

    }




    const GetHangByCategory = async () => {
        const data = "CT"
        const response = await HangAPI.getHangByCategory(
            data
        );
        const temp = response.map((option) => {
            const firstLetter = option.ten_hang[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...option,
            };
        });
        setOptions(temp)
    }
    useEffect(() => {
        GetHangByCategory()
    }, [])

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const temp = filterTrangPhuc;
            temp.ten_hang = searchValue

            dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
            dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
            dispatch({type: actions.RE_RENDER_FILTER_TK, data: !reRenderFilterTK})
            navigate("/app/timkiem")

        }
    }

    return (
        <div className="PhanDauTien">
            <div className="LogoAndClick">
                {/*                    <asp:HyperLink class="titlea" ID="HyperLink2" NavigateUrl="~/TrangChu.aspx">HHNStore</asp:HyperLink>*/}
                <Link id="navlogo" className="titlea" to="/app/trangchu">HHNStore</Link>
            </div>
            <div id="search_container">
                {
                    options ?<Autocomplete
                        // className="header-search-form"
                        noOptionsText={"Chưa có kết quả hiển thị"}
                        id="grouped-demo"
                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.ten_hang}
                        onInputChange={InputValueChange}
                        onChange={(event,value) => {InputAutoChange(event,value)}}
                        style={{ width: "100%", }}
                        onKeyDown={_handleKeyDown}
                        value={value}
                        inputValue={searchValue}
                        renderInput={(params) => <TextField
                            // style={{borderRadius:'2rem', backgroundColor:'red'}}
                                                            {...params} label="Tìm kiếm sản phẩm ở đây" variant="outlined" />}
                    />:<Loading/>
                }
                {/*<div >*/}
                {/*    */}
                {/*    <input type="text" placeholder="Nhập để tìm kiếm ..."/>*/}
                {/*    <button><img src="Image/Icon/tools-and-utensils.png"/></button>*/}
                {/*</div>*/}
            </div>

            <div id="SignUpAndCreate_item1">
                <LoginOrSignOut/>
            </div>

            <div>
                {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <div className="header-cart-menu d-flex align-items-center ml-auto">
                            {/* Cart Area */}
                            <div className="cart">
                                <div onClick={toggleDrawer(anchor, true)} style={{cursor: 'pointer'}}
                                     id="header-cart-btn"><span
                                    id="tong_so_hang" className="cart_quantity">{tongSohang}</span><i
                                    className="fal fa-shopping-bag" style={{fontSize: '30px', margin: '0 0.3rem'}}/>Giỏ
                                    hàng
                                </div>
                                {/* Cart List Area Start */}

                            </div>
                        </div>
                        <Drawer anchor={anchor} open={isShopingCartOpen[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>


        </div>
    )
}

export default AppBar;