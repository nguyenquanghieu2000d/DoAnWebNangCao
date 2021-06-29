import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import {convertToVND} from "../../assets/js/tools";
import Loading from "./Loading";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor:'#fa8cb5',
        position: "relative"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function FullScreenDialog(props) {


    const classes = useStyles();
    const data = props.data;
    const donhang= props.donhang;
    const navigate = useNavigate()
    const chuyentrang = (e, ma_hang) => {
        navigate("/app/chitietsanpham?id="+ma_hang)
    }


    return (
        <div>
            <Dialog
                fullScreen
                open={props.isClose}
                onClose={props.isClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton component={"C"}
                                    edge="start"
                                    color="inherit"
                                    onClick={props.handleClose}
                                    aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Chi tiết đơn hàng
                        </Typography>
                        <Button autoFocus style={{backgroundColor:'#282828'}} component={"C"} color="inherit" onClick={props.handleClose}>
                            Xác nhận
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box>
                    <table className={"tdDonhang"} style={{width:'30%', textAlign:'left'}}>
                        <tr>
                            <td >
                                Mã đơn hàng
                            </td>
                            <td>
                                {donhang.ma_don_hang}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                Họ tên
                            </td>
                            <td>
                                {donhang.hoten_dh}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                Số điện thoại
                            </td>
                            <td>
                                {donhang.sdt_dh}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                Ngày thanh toán
                            </td>
                            <td>
                                {donhang.ngay_thanh_toan}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                Thành tiền
                            </td>
                            <td>
                                {convertToVND(donhang.thanhtien)}
                            </td>
                        </tr>
                    </table>
                    <div>

                    </div>

                </Box>

                <Box>
                    <section className="section3">

                        {/*<h1 style={{fontSize: '2rem', textAlign: 'center'}}></h1>*/}
                        <div className="section2container">
                            <table>
                                <thead>
                                <tr>
                                    <th style={{width: "3rem"}} className="quy-th">Mã hàng</th>
                                    <th className="size-th">Tên hàng</th>
                                    {/*<th className="kichco size-th">Giá cũ</th>*/}
                                    <th className="dongia size-th">Giá</th>
                                    <th className="total-th size-th">Thương hiệu</th>
                                    {/*<th className>Hình đại diện</th>*/}
                                    {/*<th className>Mô tả</th>*/}
                                    <th>Số lượng</th>
                                </tr>
                                </thead>
                                <tbody id="tableSanPham">
                                {
                                    data ? data.map((value, index) => {
                                        return <tr onClick={(e) => chuyentrang(e, value.ma_hang)}
                                                   style={{cursor: "pointer", backgroundColor: index % 2 ? "#f2f2f2": "white"}}>
                                            <td>{value.ma_hang}</td>
                                            <td className="quy-col">
                                                <p className="ThanhCongTruSo">{value.ten_hang}</p>
                                            </td>
                                            {/*<td>*/}
                                            {/*    <p>{convertToVND(value.gia_cu)}</p>*/}
                                            {/*</td>*/}
                                            <td>
                                                <p>{convertToVND(value.gia_moi)}</p>
                                            </td>
                                            <td className="size-col"><p>{value.thuong_hieu}</p></td>
                                            {/*<td className="total-col"><h4><img style={{height: "6rem", width: "4rem"}}*/}
                                            {/*                                   src={value.hinh_dai_dien} alt=""/></h4>*/}
                                            {/*</td>*/}
                                            {/*<td className="total-col" style={{width: "10%"}}><h4>{value.mo_ta}</h4></td>*/}
                                            <td className="total-col"><h4>{value.so_luong}</h4></td>
                                        </tr>
                                    }) : <Loading/>
                                }
                                </tbody>
                            </table>

                        </div>
                    </section>
                </Box>
            </Dialog>
        </div>
    );
}



