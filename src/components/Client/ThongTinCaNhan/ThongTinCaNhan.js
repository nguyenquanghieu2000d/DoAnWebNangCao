import React, {useEffect, useState} from 'react';
import "../../../assets/css/Client/ThongTinCaNhan/ThongTinCaNhan.css"
import {useDispatch, useSelector} from "react-redux";
import {DonHangAPI as donhangApi} from "../../../api/donhangApi";
import {HangAPI} from '../../../api/hangAPI';
import {makeStyles} from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import FullScreenDialog from "../../DungChung/Dialog_Full";
import Loading from "../../DungChung/Loading";
import {
    Divider,
    FormControlLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Paper,
    Radio,
    RadioGroup, Tab, Tabs, TextField
} from "@material-ui/core";
import PropTypes from 'prop-types';
import {TaikhoanApi} from "../../../api/taikhoanApi";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import $ from "jquery"
import * as actions from "../../../constants/ActionTypes";

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {convertToVND} from "../../../assets/js/tools";
import TabPanel from "../../DungChung/TabPanel";
import {useNavigate} from "react-router";
import canhBao from "../../DungChung/Alert";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        width: '100%',
        borderRight: `1px solid ${theme.palette.divider}`,
    },

}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ThongTinCaNhan() {
    const classes = useStyles();
    const initState = ""
    const [username, setUsername] = useState(initState);
    const [hoten, setHoten] = useState(initState);
    const [passwordCu, setPasswordCu] = useState(initState);
    const [passwordMoi, setPasswordMoi] = useState(initState)
    const [passwordValid, setPasswordValid] = useState(initState);
    const [gioitinh, setGioiTinh] = useState(initState);
    const [sdt, setSdt] = useState(initState);
    const [diachi, setDiachi] = useState(initState);
    const [donHangData, setDonHangData] = useState([])
    const localstorage = window.localStorage;
    const navigate = useNavigate()

    const Userprofile = useSelector(state => state.userProfile)
    const dispatch = useDispatch()
    const reRenderGioHang = useSelector(state => state.reRenderGiohang)


    const getDonhang = async () => {
        const response = await donhangApi.getdonhangById(Userprofile.username)
        if (response !== undefined) {
            // alert(JSON.stringify(response))
            setDonHangData(response);
        }
    }


    const suaThongTinTaiKhoan = async (e) => {
        const GetUserById = async (username) => {
            const response = await TaikhoanApi.getUserbyID(
                username
            );
            localstorage.setItem(process.env.REACT_APP_USER_PROFILE, JSON.stringify(response))
            dispatch({type: actions.USER_PROFILE, data: response})
        }
        const data = {
            username: Userprofile.username,
            hoten: hoten,
            diachi: diachi,
            gioitinh: gioitinh,
            sdt: sdt
        }
        // alert(JSON.stringify(data))
        const response = await TaikhoanApi.putUserById(Userprofile.username, data)
        // alert(JSON.stringify(response))
        if (response) {
            alert("Sửa đổi thành công")
            await GetUserById(Userprofile.username)
            alert("Đã cập nhật lại tài khoản")
        }
    }


    const ValidUserAndChangePass = async (event) => {
        event.preventDefault();
        if( passwordMoi !== passwordValid){
            alert("Mật khẩu không trùng khớp");
        }
        const data = {
            "username": Userprofile.username,
            "password": passwordCu
        };
        const response = await TaikhoanApi.ValidUser(
            data
        );
        if (response === "1") {
            const data = {
                username: Userprofile.username,
                password: passwordMoi
            }
            const response = await TaikhoanApi.putUserById(Userprofile.username, data)
            if (response) {
                alert("Sửa đổi thành công")
                setPasswordCu("")
                setPasswordMoi("")
                setPasswordValid("")
                window.scrollTo(0,0)
            }
        } else {
            canhBao("Sai mật khẩu cũ")
        }

    }


    const Table = (props) => {
        return <table>
            <thead>
            <tr>
                <th className="product-th">Mã</th>
                {/*<th className="quy-th">Địa chỉ</th>*/}
                <th className="kichco size-th">Họ tên đăng ký</th>
                <th className="dongia size-th">Số điện thoại</th>
                <th className="total-th size-th">Ngày thanh toán</th>
                <th className="size-th">Thành tiền</th>
            </tr>
            </thead>
            <tbody id="tableDonHang">
            {
                props.data.map((value, index) => {
                    return <TableItem index={index} data={value}/>
                })
            }
            </tbody>
        </table>
    }


    const TableItem = (props) => {
        const data = props.data;
        const index = props.index;
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const [donhangDetail, setDonHangDetail] = useState("")


        const getHangIdDonhang = async () => {
            const response = await HangAPI.gethangbyIddonhang(data.ma_don_hang);
            setDonHangDetail(response)
        }

        useEffect(() => {
            getHangIdDonhang()
        }, [])

        const getDonHangDetail = async (e, ma_don_hang) => {
            e.preventDefault();
            handleClickOpen();
        }


        const handleClose = () => {
            setOpen(false);
        };

        return (
            <>
                <tr onClick={(e) => getDonHangDetail(e)} className="tablehoveritem"
                    style={{cursor: "pointer", backgroundColor: index % 2 ? '#f2f2f2' : 'white'}}>
                    <td>
                        <a href="#">{data.ma_don_hang}</a>
                    </td>
                    {/*<td className="quy-col">*/}
                    {/*    <p className="ThanhCongTruSo">{data.dia_chi}</p>*/}
                    {/*</td>*/}
                    <td>
                        <p>{data.hoten_dh}</p>
                    </td>
                    <td>
                        <p>{data.sdt_dh}</p>
                    </td>
                    <td className="size-col"><p style={{color: "darkred"}}>{data.ngay_thanh_toan}</p></td>
                    <td className="total-col"><p style={{color: "green"}}>{convertToVND(data.thanhtien)}</p></td>
                </tr>
                {donhangDetail ? <FullScreenDialog donhang={data} data={donhangDetail} isClose={open}
                                                   handleClose={handleClose}/> : ""}
            </>
        )
    }

    useEffect(() => {
        setUsername(Userprofile.username)
        setDiachi(Userprofile.diachi)
        setSdt(Userprofile.sdt)
        setGioiTinh(Userprofile.gioitinh)
        setHoten(Userprofile.hoten)
        getDonhang()
    }, [Userprofile])

    const onChange = (event, setFunction) => {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setFunction(value)
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangetbUsername = (event) => {
        onChange(event, setUsername)
    }

    const onChangetbHovaTen = (event) => {
        onChange(event, setHoten)
    }

    const onChangetbPasswordCu = (event) => {
        onChange(event, setPasswordCu)
    }

    const onChangetbPasswordMoi = (event) => {
        onChange(event, setPasswordMoi)
    }


    const onChangetbPasswordValid = (event) => {
        onChange(event, setPasswordValid)
    }
    const onChangeGioiTinh = (event) => {
        onChange(event, setGioiTinh)
    }
    const onChangetbSdt = (event) => {
        onChange(event, setSdt)
    }
    const onChangetbDiaChi = (event) => {
        onChange(event, setDiachi)
    }

    // const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const dangXuat = (e) => {
        e.preventDefault();
        dispatch({type: actions.USER_PROFILE, data: ""})
        localstorage.setItem(process.env.REACT_APP_USER_PROFILE, "")
        dispatch({type: actions.RE_RENDER_GIO_HANG, data: !reRenderGioHang})
        navigate("/app/trangchu")
    }


    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const [eTab, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        event.preventDefault()
        setValue(newValue);
    };


    return (
        <div style={{paddingBottom: '2rem'}}>
            <section id="form">
                <section id="section1shop" className="section1shop">
                    <div>
                    </div>
                    <h1>
                        THÔNG TIN TÀI KHOẢN
                    </h1>
                </section>

                {/*    <img src="Image/short-girl-golden-hairs-girl-4k-er-3840x2400%20(1).jpg">*/}
                <div id="formDangKy">
                    <div style={{paddingTop: '2rem', display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '20%', display: 'flex', flexDirection: 'row'}}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={eTab}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                className={classes.tabs}
                            >
                                <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
                                <Tab label="Thông tin đơn hàng" {...a11yProps(1)} />
                                <Tab label="Đăng xuất" {...a11yProps(2)} />
                            </Tabs>
                        </div>
                        <TabPanel style={{width: '78%'}} value={eTab} index={0}>
                            <div>
                                <Paper style={{width: '100%',}} variant="outlined">
                                    <div style={{padding: '2rem'}}>


                                        <div style={{fontSize: '2rem', textAlign: 'center'}}>THÔNG TIN TÀI KHOẢN</div>
                                        <div style={{fontSize: '1.5rem'}}> Tài khoản : {username}</div>
                                        <div className={"thongTinCaNhanContain"}>
                                            <div className={"containItem"}>
                                                <p>Họ và tên:</p>
                                                <TextField className={"thongTinCaNhanInput"} id="hoten" name="hoten"
                                                           onChange={onChangetbHovaTen}
                                                           value={hoten} label="Họ và tên" variant="outlined"
                                                           placeholder="Nhập họ và tên"/>
                                            </div>
                                            <div className="gioitinh containItem">
                                                <p>Giới tính:</p>
                                                <label>
                                                    <RadioGroup row aria-label="position" name="position"
                                                                defaultValue="top"
                                                                value={gioitinh} onChange={onChangeGioiTinh}>
                                                        <FormControlLabel value="Nam" control={<Radio color="primary"/>}
                                                                          label="Nam"/>
                                                        <FormControlLabel value="Nu" control={<Radio color="primary"/>}
                                                                          label="Nữ"/>
                                                    </RadioGroup>
                                                </label>
                                            </div>
                                            <div className={"containItem"}>
                                                <p>Số điện thoại:</p>
                                                <TextField className={"thongTinCaNhanInput"} id="sdt"
                                                           onChange={onChangetbSdt} value={sdt} name="sdt"
                                                           type="text" label="Số điện thoại"
                                                           placeholder="Nhập số điện thoại" variant="outlined"/>
                                            </div>


                                            <div className={"containItem"}>
                                                <p>Địa chỉ:</p>
                                                <TextField className={"thongTinCaNhanInput"} id="dia_chi"
                                                           onChange={onChangetbDiaChi} value={diachi} name="diachi"
                                                           type="text" label="Địa chỉ" placeholder="Nhập số địa chỉ"
                                                           variant="outlined"/>
                                            </div>
                                        </div>
                                        <button onClick={(e) => suaThongTinTaiKhoan(e)}
                                                className="btn1" id="btnXacNhanSua" type="button">
                                            Xác nhận sửa
                                        </button>
                                    </div>
                                </Paper>
                                <br/>
                                <Paper style={{width: '100%', padding: '2rem'}} variant="outlined">
                                    <div style={{fontSize: '2rem', textAlign: 'center'}}>ĐỔI MẬT KHẨU</div>
                                    <div className={"thongTinCaNhanContain"}>
                                        <div className={"containItem"}>

                                            <p>Mật khẩu cũ:</p>
                                            <TextField className={"thongTinCaNhanInput"} id="password"
                                                       onChange={onChangetbPasswordCu} value={passwordCu}
                                                       type="password"
                                                       label="Mật khẩu (Nếu bạn không sửa mật khẩu hãy để trống)"
                                                       placeholder="Nhập mật khẩu (từ 8 -16 ký tự)"
                                                       variant="outlined"/>
                                        </div>

                                        <div className={"containItem"}>

                                            <p>Mật khẩu mới:</p>


                                            <TextField className={"thongTinCaNhanInput"} id="passwordMoi"
                                                       onChange={onChangetbPasswordMoi} value={passwordMoi}
                                                       type="password"
                                                       label="Mật khẩu (Nếu bạn không sửa mật khẩu hãy để trống)"
                                                       placeholder="Nhập mật khẩu (từ 8 -16 ký tự)"
                                                       variant="outlined"/>
                                        </div>

                                        <div className={"containItem"}>
                                            <p>Xác nhận lại mật khẩu:</p>
                                            <TextField className={"thongTinCaNhanInput"} id="passwordvalid"
                                                       onChange={onChangetbPasswordValid} value={passwordValid}
                                                       name="passwordValid"
                                                       type="password"
                                                       label="Mật khẩu (Nếu bạn không sửa mật khẩu hãy để trống)"
                                                       placeholder="Xác nhận lại mật khẩu"
                                                       variant="outlined"/>
                                        </div>
                                    </div>
                                </Paper>
                                <br/>
                                <button onClick={(e) => ValidUserAndChangePass(e)}
                                        className="btn1" id="btnXacNhanSua" type="button">
                                    Xác nhận sửa
                                </button>
                                <div id="lbThongBao" style={{color: 'red'}}/>
                            </div>
                        </TabPanel>
                        <TabPanel style={{width: '78%'}} value={eTab} index={1}>
                            <section className="section2">
                                {/*<div style={{fontSize: '2rem', textAlign: 'center'}}>ĐƠN HÀNG GẦN NHẤT</div>*/}
                                <div className="section2container">
                                    {/*            <div id="section2containeritem1">*/}

                                    {
                                        donHangData ? <Table data={donHangData}/> : <Loading/>
                                    }

                                </div>
                            </section>
                        </TabPanel>
                        <TabPanel style={{width: '78%'}} value={eTab} index={2}>
                            <section className="section2">
                                <p>Các thông tin của bạn sẽ được lưu sau khi đăng xuất</p>
                                <button onClick={(e) => dangXuat(e)}
                                        className="btn1" id="btnXacNhanSua" type="button">
                                    Đăng xuất
                                </button>
                            </section>
                        </TabPanel>


                    </div>
                </div>
            </section>

        </div>
    );
}

export default ThongTinCaNhan;