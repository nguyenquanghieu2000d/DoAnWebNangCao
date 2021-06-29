import React, {useState} from 'react';
import "../../../assets/css/Client/DangNhap/DangNhap.css"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {TaikhoanApi} from "../../../api/taikhoanApi";
import * as actions from "../../../constants/ActionTypes";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import canhBao from "../../DungChung/Alert";
import listGiohang from "../../../reducers/listGiohang";
import $ from 'jquery'
import {DonHangAPI} from "../../../api/donhangApi";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function DangNhap() {
    let navigate = useNavigate();
    const localstorage = window.localStorage;
    const classes = useStyles();
    const [tbPassword, settbPassword] = useState("")
    const [tbUsername, settbUsername] = useState("")
    const dispatch = useDispatch()
    const GioHang = useSelector(state=> state.listGiohang)
    const Userprofile = useSelector(state => state.userProfile)
    const reRenderGioHang = useSelector(state => state.reRenderGiohang)
    const onChange = (event, setFunction) => {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setFunction(value)
    }

    const onChangetbTaiKhoan = (event) => {
        onChange(event, settbUsername)
    }

    const onChangetbMatKhau = (event) => {
        onChange(event, settbPassword)
    }



    const GetUserById = async (username) => {
        const response = await TaikhoanApi.getUserbyID(username);
        localstorage.setItem(process.env.REACT_APP_USER_PROFILE, JSON.stringify(response))
        dispatch({type: actions.USER_PROFILE, data: response})
        MergeGioHang(username);
    }

    const MergeGioHang =  async (username) => {
        let list_gio_hang = JSON.parse(localstorage.getItem(process.env.REACT_APP_LIST_GIO_HANG));
         for (const key in list_gio_hang){
             if (list_gio_hang.hasOwnProperty(key)){
                 const response = await DonHangAPI.themCtDonHang(
                     username,
                     key,
                     list_gio_hang[key]
                 );
             }
        }
        localstorage.setItem(process.env.REACT_APP_LIST_GIO_HANG, "")
            // alert(username)
            //  alert(key)
            //
            //  alert(list_gio_hang[key])
            // const response = await DonHangAPI.themCtDonHang(
            //     username,
            //     key,
            //     list_gio_hang[key]
            // );
        // });


    }

    // function TongTienGioHang() {
    //     let data;
    //     $.ajax({
    //         url: url + '/GetTongTienGioHang?username=' + getCookie("user-username"),
    //         type: 'GET',
    //         async: false,
    //         datatype: "json",
    //         contentType: "Application/json;charset=utf-8",
    //         success: function (response) {
    //             data = response;
    //         }
    //     });
    //     return data;
    // }


    const updateGioHang = (Userprofile) => {
        // TaiThongTinGioHangByDataBase(Userprofile.username)



        // let listGiohang = {};
        //     const data = localstorage.getItem(process.env.REACT_APP_LIST_GIO_HANG);
        //     if(data){
        //         listGiohang = JSON.parse(data);
        //         if (!(Userprofile.username in listGiohang)){
        //             listGiohang[Userprofile.username] = {}
        //             localstorage.setItem(process.env.REACT_APP_LIST_GIO_HANG,JSON.stringify(listGiohang))
        //         }
        //     }
        //     else{
        //         listGiohang = {}
        //         listGiohang[Userprofile.username] = {}
        //         localstorage.setItem(process.env.REACT_APP_LIST_GIO_HANG,JSON.stringify(listGiohang))
        //     }
    }

    const Login = async (event) => {
        event.preventDefault();

        const data = {"username": tbUsername,
            "password": tbPassword
        };
        // alert(JSON.stringify(data))
        const response = await TaikhoanApi.ValidUser(
            data
        );
        if(response === "1") {
            await GetUserById(tbUsername);
            navigate("/app/trangchu")
            dispatch({type: actions.RE_RENDER_GIO_HANG, data: !reRenderGioHang})
        }
        else{
            canhBao("Đăng nhập thất bại sai tên tài khoản hoặc mật khẩu")
        }

    }


    return (
        <section id="headerLogin">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            onChange={onChangetbTaiKhoan}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="tbUsername"
                            label="Tài khoản"
                            name="tbUsername"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={onChangetbMatKhau}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="tbPassword"
                            label="Mật khẩu"
                            type="tbPassword"
                            id="tbPassword"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={Login}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
            {/*<div id="container1">*/}
            {/*    <a className="titleDangNhap titlea" href="trangChu.html">HHNStore</a>*/}
            {/*    <h2>Đăng nhập</h2>*/}
            {/*    <div className = "loginFormContainer">*/}
            {/*        <label>*/}
            {/*            <input type="text" id="username" className="input_2" placeholder="Username"/>*/}
            {/*        </label>*/}
            {/*        <label>*/}
            {/*            <input id="password" className="input_2" type="password" placeholder="Password"/>*/}
            {/*        </label>*/}
            {/*        <p><label>*/}
            {/*            <input id="checkbox" type="checkbox"/>*/}
            {/*        </label> Nhớ mật khẩu</p>*/}
            {/*        <p>Chưa có tài khoản ? <a className="button" href="dangKy.html">Đăng ký nhé</a></p>*/}
            {/*        <a href="#">Quên mật khẩu?</a>*/}
            {/*        <br/>*/}
            {/*        <br/>*/}
            {/*        <br/>*/}
            {/*        /!*                    <a href="#">Quên mật khẩu?</a>*!/*/}
            {/*        <input type="button" className="button bigbutton" id="btnDangNhap" defaultValue="Đăng nhập"/>*/}
            {/*        <div id="lbThongBao" style={{color: 'red'}}/>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <a className="buttonsub button smallbutton" href="#">Facebook</a>*/}
            {/*        <a className="buttonsub button smallbutton1" href="#">Google</a>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div id="container2">
                <div className="container_inner">
                    <div id="griditem1">
                        <form>
                            <a className="titleaedit titlea" href="trangChu.html">HHNStore</a>
                            <input className="input_1" type="text" placeholder="Tìm kiếm sản phẩm"/>
                        </form>
                    </div>
                    <div className="item" id="griditem2">
                        <div>
                            <img src="Image/login/attractive-beautiful-beautiful-girl-beauty-458766.jpg" alt=""/>
                            <h2>PHỤ KIỆN</h2>
                        </div>
                    </div>
                </div>
                <div className="container_inner">
                    <div className="item" id="griditem3">
                        <div>
                            <img
                                src="Image/login/woman-wearing-blue-and-white-striped-dress-with-brown-rattan-1103511.jpg"/>
                            <h2>ĐI BIỂN</h2>
                        </div>
                    </div>
                    <div className="item" id="griditem4">
                        <div>
                            <img
                                src="Image/login/woman-wearing-pink-printed-crew-neck-t-shirt-and-blue-faded-704974.jpg"/>
                            <h2>NHẸ</h2>
                        </div>
                    </div>
                </div>
                <div className="container_inner">
                    <div className="item" id="griditem5">
                        <div>
                            <img
                                src="Image/login/shallow-focus-photography-of-assorted-color-clothes-hanged-1078958.jpg"
                                alt=""/>
                            <h2>BOHEMIAN</h2>
                        </div>
                    </div>
                    <div className="item" id="griditem6">
                        <div>
                            <img src="Image/login/photo-of-iphone-on-shirt-near-sunglasses-934063.jpg"/>
                            <h2>CUỐI TUẦN</h2>
                        </div>
                    </div>
                    <div className="item" id="griditem7">
                        <div>
                            <img src="Image/login/lauren-fleischmann-R2aodqJn3b8-unsplash.jpg"/>
                            <h2>SALE</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default DangNhap;