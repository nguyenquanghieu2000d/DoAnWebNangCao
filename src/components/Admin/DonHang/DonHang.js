import React, {useEffect, useState} from 'react';
import $ from "jquery";
import {TheLoaiAPI} from "../../../api/theloaiAPI";

import Loading from "../DungChung/Loading";

import {Paper} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {DonHangAPI} from "../../../api/DonHangAPI";
import {CtTheLoaiAPI} from "../../../api/ctTheLoaiAPI";

function DonHang() {
    const [fMaDonHang, setfMaDonHang] = useState("")
    const [fUsername, setfUsername] = useState("")
    const [fDiaChi, setfDiaChi] = useState("")
    const [fGiaThap, setfGiaThap] = useState(0)
    const [fGiaCao, setfGiaCao] = useState(300000000)
    const [fNgayBatDau, setfNgayBatDau] = useState(new Date('2014-08-18T21:11:54'))
    const [fNgayKetThuc, setfNgayKetThuc] = useState(new Date('2030-08-18T21:11:54'))
    const [fSdt, setfSdt] = useState("")
    const [fHoTen, setfHoTen] = useState("")




    const [aMaHang, setaMaHang] = useState("")
    const [aTenHang, setaTenHang] = useState("")
    const [aTheLoai, setaTheLoai] = useState("")


    const [ListTheLoai, setListTheLoai] = useState()
    const [numrow, setNumrow] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [numpage, setNumpage] = useState(0)
    const [table, setTable] = useState("")
    const [AddOrUpdate, setAddOrUpdate] = useState("")

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const onChangeaTenHang = (e) => {
        setaTenHang(e.target.value)
    }

    const onChangeaTheLoai = (e) => {
        setaTheLoai(e.target.value)
    }

    const onChangefMaDonHang = (e) => {
        setfMaDonHang(e.target.value)
    }

    const onChangefUsername = (e) => {
        setfUsername(e.target.value)
    }

    const onChangefDiaChi = (e) => {
        setfDiaChi(e.target.value)
    }

    const onChangefGiaThap = (e) => {
        setfGiaThap(e.target.value)
    }

    const onChangefGiaCao = (e) => {
        setfGiaCao(e.target.value)
    }

    const onChangefHoTen = (e) => {
        setfHoTen(e.target.value)
    }

    const onChangefNgayBatDau = (e) => {
        setfNgayBatDau(e.target.value)
    }

    const onChangefNgayKetThuc = (e) => {
        setfNgayKetThuc(e.target.value)
    }

    const onChasetfSdt = (e) => {
        setfSdt(e.target.value)
    }


    const getData3 = (ma_hang) => {
        const result_data = {
            "ma_loai": ma_hang,
            "ten_ct_the_loai": "",
            "ma_the_loai": "",
        }
        return result_data
    }

    const getData2 = () => {
        const result_data = {
            "ma_loai": aMaHang,
            "ten_ct_the_loai": aTenHang,
            "ma_the_loai": aTheLoai
        }
        return result_data
    }

    const getData = () => {
        const split = "*"
        const result_data = {
            "ma_don_hang": fMaDonHang,
            "username": fUsername,
            "dia_chi": fDiaChi,
            "email_dh":  fGiaThap.toString() + split + fGiaCao.toString() + split + convert(fNgayBatDau.toString()) + split + convert(fNgayKetThuc.toString()),
            "hoten_dh": fHoTen,
            "sdt_dh": fSdt,
        }
        return result_data
    }


    const getListTheLoai = async () => {
        const response = await TheLoaiAPI.getTheLoai()
        setListTheLoai(response)
    }


    const btnThemKhachHang = async (e) => {
        e.preventDefault();
        await setaMaHang("")
        await setaTenHang("")
        await setaTheLoai("")
        $("#CrudThemSua").toggle();
        $("#lbTitle").text("Thêm thể loại");
        await setAddOrUpdate(1)
        $("#lbMaTheLoai").css("display", "none");
    }


    const btnExit = () => {
        $("#CrudThemSua").hide();
    }

    const Edit = async (ma_the_loai) => {
        $("#CrudThemSua").toggle();
        $("#lbTitle").text("Sửa thể loại");
        $("#lbMaTheLoai").css("display", "block");
        $("#lbThongBao").text("");
        // alert(ma_the_loai)
        const response = await CtTheLoaiAPI.getCtTheLoaiById(ma_the_loai)
        let res = response[0];
        // alert(JSON.stringify(response));
        await setaMaHang(res["ma_loai"])
        await setaTenHang(res["ten_ct_the_loai"])
        await setaTheLoai(res["ma_the_loai"])
        await setAddOrUpdate(0)
    }


    const Del = async (ma_the_loai) => {
        return
        const data = getData3(ma_the_loai)
        const response = await CtTheLoaiAPI.xoacttheloai(data)

        alert("Xóa thành công");
        phanTrang();
        await getNumOfTaiKhoan()
        await getHangPhanTrang(undefined, 1);
    }


    const clear = () => {
        setfMaDonHang("")
        setfUsername("")
        setfDiaChi("")
    }

    const btnXacNhanThem = async () => {
        const data = getData2()
        // alert(JSON.stringify(data))
        const response = await CtTheLoaiAPI.postcttheloai(data)
        if (response) {
            alert("Thêm ct thể loại thành công")
            $("#CrudThemSua").css("display", "none");
            await preLoad()
        }
    }

    const btnXacNhanSua = async (ma_hang) => {
        const data = getData2()
        // alert(JSON.stringify(data))
        const response = await CtTheLoaiAPI.putcttheloai(data)
        if (response) {
            alert("Sửa thành công");
            $("#CrudThemSua").css("display", "none");
            await getHangPhanTrang(undefined, 1);
        }
    }


    const Table = () => {
        return (
            <>
                {

                    table ? table.map((value, index) => {
                        return <>
                            <tr>
                                <td style={{width: "10rem"}} className="quy-col">
                                    <p className="ThanhCongTruSo">{value.ma_don_hang}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.username}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.dia_chi}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.hoten_dh}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.sdt_dh}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.ngay_thanh_toan}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.thanhtien}</p>
                                </td>
                                {/*<td style={{width: "5%"}} className="total-col">*/}
                                {/*    <button style={{width: "4rem"}} className="thongkeb1button"*/}
                                {/*            onClick={e => Edit(value.ma_loai)}>Sửa*/}
                                {/*    </button>*/}
                                {/*</td>*/}
                                {/*<td style={{width: "5%"}} className="total-col">*/}
                                {/*    <button style={{width: "4rem"}} className="thongkeb1button"*/}
                                {/*            onClick={e => Del(value.ma_loai)}>Xóa*/}
                                {/*    </button>*/}
                                {/*</td>*/}
                            </tr>
                        </>
                    }) : <Loading/>
                }
            </>
        )
    }


    const getNumOfTaiKhoan = async () => {
        const data = getData()
        // alert(JSON.stringify(data))
        const response = await DonHangAPI.countDonHang(data)
        // alert(JSON.stringify(response))
        const x = response['so_luong'];
        setNumpage(x)
    };

    const phanTrang = () => {
        if (numpage) {
            const list = []
            const num = parseInt(numpage / numrow) + 1
            for (let i = 1; i <= num; i++) {
                list.push(<button id="btnPhanTrang`+ i + `"
                                  style={{width: "25%", backgroundColor: currentPage === i ? 'pink' : "gray"}}
                                  className="thongkeb1button"
                                  onClick={(e) => getHangPhanTrang(e, i)}>{i}</button>)
            }
            return list;
        }
    }

    const preLoad = async () => {
        await getNumOfTaiKhoan()
        await getHangPhanTrang(undefined, 1)
    }

    const btnPhanTrangPrev = () => {
        if (getHangPhanTrang(undefined, currentPage - 1) <= 0) {

        }
    }

    const btnPhanTrangNext = () => {
        if (getHangPhanTrang(undefined, currentPage + 1) === 0)
            setCurrentPage(currentPage - 1);
    }

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const search = async () => {
        // alert(JSON.stringify(getData()))


        convert(selectedDate)
        // await preLoad()
        // await getHangPhanTrang(undefined, 1);
    }

    const getHangPhanTrang = async (e, num) => {
        if (e) e.preventDefault();
        if (num <= 0) num = 1;
        let take = numrow;
        let skip = (num - 1) * numrow;
        if (skip > numpage) return 0;
        const data = getData()
        // alert("wait")
        const response = await DonHangAPI.getDonHangPaging(data, take, skip)
        // alert(JSON.stringify(response))
        setTable(response);
        setCurrentPage(num)
        return 1;
    }


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        preLoad()
        getListTheLoai()

    }, [])


    return (
        <section>
            <h1 style={{textAlign: 'center'}}>QUẢN LÝ CHI TIẾT THỂ LOẠI</h1>
            <div style={{display: 'flex'}}>
                <Paper style={{padding: '1rem'}} variant="outlined">
                    <table style={{width: '100%', backgroundColor: 'white'}}>

                        <tr>
                            <td>Mã đơn hàng</td>
                            <input id="tbTimKiemMaLoai"
                                   style={{width: '80%'}}
                                   name={"fMaDonHang"}
                                   value={fMaDonHang}
                                   onChange={onChangefMaDonHang}
                                   className="thongkeb1button" type="text" placeholder="Mã loại"/>


                        </tr>
                        <tr>
                            <td>Username</td>
                            <input id="tbTimKiemTenLoai"
                                   style={{width: '80%'}}
                                   name={"fUsername"}
                                   value={fUsername}
                                   onChange={onChangefUsername}
                                   className="thongkeb1button" type="text" placeholder="Tên loại"/>
                        </tr>
                        <tr>
                            <td>Địa chỉ</td>
                            <input id="tbTimKiemMaTheLoai"
                                   style={{width: '80%'}}
                                   name={"fDiaChi"}
                                   value={fDiaChi}
                                   onChange={onChangefDiaChi}
                                   className="thongkeb1button" type="text"
                                   placeholder="Tên mã thể loại"/>
                        </tr>
                        <tr>
                            <td>Địa chỉ</td>
                            <input id="tbTimKiemMaTheLoai"
                                   style={{width: '80%'}}
                                   name={"fDiaChi"}
                                   value={fDiaChi}
                                   onChange={onChangefDiaChi}
                                   className="thongkeb1button" type="text"
                                   placeholder="Tên mã thể loại"/>
                        </tr>
                        <tr>
                            <td>Địa chỉ</td>
                            <input id="tbTimKiemMaTheLoai"
                                   style={{width: '80%'}}
                                   name={"fDiaChi"}
                                   value={fDiaChi}
                                   onChange={onChangefDiaChi}
                                   className="thongkeb1button" type="text"
                                   placeholder="Tên mã thể loại"/>
                        </tr>

                        <tr>
                            <td>Ngày bắt đầu</td>
                            <td>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Ngày kết thúc
                            </td>
                            <td>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </td>
                        </tr>
                    </table>


                </Paper>
                <div style={{width: '100%'}} className="quanlyhangcontainer">
                    <div style={{display: 'flex'}}>
                        {/*<button style={{width: '1%', padding: '1rem 1rem'}} id="btnThemKhachHang"*/}
                        {/*        className="thongkeb1button"*/}
                        {/*        onClick={btnThemKhachHang}>*/}
                        {/*    <i className="far fa-plus"/>*/}
                        {/*</button>*/}


                        <button style={{width: '1.5%', padding: '1rem 1rem'}} onClick={clear} id="clear"
                                className="thongkeb1button">
                            <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                        </button>
                        <button style={{width: '1.5%', padding: '1rem 1rem'}} onClick={search} id="search"
                                className="thongkeb1button">
                            <i className="far fa-search" style={{fontSize: '1rem'}}/>
                        </button>
                    </div>
                    <div className="tablecontainer" style={{display: 'flex'}}>
                        <table>
                            <thead>
                            <tr>
                                <th className="quy-th">Mã đơn hàng</th>
                                <th className="size-th">Username</th>
                                <th className="size-th">Địa chỉ</th>
                                <th className="size-th">Họ tên</th>
                                <th className="size-th">Số điện thoại</th>
                                <th className="quy-th">Ngày thanh toán</th>
                                <th className="quy-th">Thành tiền</th>
                            </tr>
                            </thead>
                            <tbody style={{}} id="tableTaiKhoan">
                            <Table/>
                            </tbody>
                        </table>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input id="btnPhanTrangPrev" onClick={btnPhanTrangPrev} style={{width: '10%'}}
                               className="thongkeb1button" type="button"
                               defaultValue="PREV"/>
                        <div id="listbtnPhanTrang" style={{display: 'flex'}}>
                            {
                                phanTrang()
                            }
                        </div>
                        <input id="btnPhanTrangNext" onClick={btnPhanTrangNext} style={{width: '10%'}}
                               className="thongkeb1button" type="button"
                               defaultValue="NEXT"/>
                    </div>
                    {/*<div id="CrudThemSua" style={{*/}
                    {/*    display: 'none',*/}
                    {/*    position: 'absolute',*/}
                    {/*    margin: '0 28%',*/}
                    {/*    top: '1%',*/}
                    {/*    WebkitBoxShadow: '-5px 4px 49px -7px rgba(0,0,0,0.75)',*/}
                    {/*    MozBoxShadow: '-5px 4px 49px -7px rgba(0,0,0,0.75)',*/}
                    {/*    boxShadow: '-5px 4px 49px -7px rgba(0,0,0,0.75)',*/}
                    {/*    width: '40%'*/}
                    {/*}} className="themsuaxoa">*/}
                    {/*    <div id="btnExit" onClick={btnExit} style={{direction: 'rtl'}}><i*/}
                    {/*        className="far fa-times-circle" style={{*/}
                    {/*        fontSize: '1.5rem',*/}
                    {/*        cursor: 'pointer'*/}
                    {/*    }}/></div>*/}
                    {/*    <h3 id="lbTitle">Thêm khách hàng</h3>*/}
                    {/*    <div style={{display: 'flex'}}>*/}
                    {/*        <div style={{width: '60%'}}>*/}
                    {/*            <div id="lbMaLoai" style={{fontWeight: 'bold'}}/>*/}
                    {/*            /!*                <div style="height:0.5rem; color:red" id="lbThongBao">22</div>*!/*/}
                    {/*            <h5>Tên thể loại: <input id="tbTenTheLoai" name={"aTenHang"} value={aTenHang}*/}
                    {/*                                     onChange={onChangeaTenHang} type="text"*/}
                    {/*                                     placeholder="Nhập Tên thể loại"/>*/}
                    {/*            </h5>*/}
                    {/*            <div>*/}
                    {/*                Chọn thể loại:*/}
                    {/*                <select id="selectTheLoai" value={aTheLoai} onChange={onChangeaTheLoai} style={{*/}
                    {/*                    borderRadius: '1rem',*/}
                    {/*                    width: '100%',*/}
                    {/*                    height: '3rem',*/}
                    {/*                    fontFamily: 'JosefinSans,serif'*/}
                    {/*                }}>*/}
                    {/*                    <option value={""}>Chưa chọn</option>*/}
                    {/*                    {*/}
                    {/*                        ListTheLoai ? ListTheLoai.map((value, index) => {*/}
                    {/*                            return <option value={value.ma_the_loai}>{value.ten_loai}</option>*/}
                    {/*                        }) : <Loading/>*/}
                    {/*                    }*/}
                    {/*                </select>*/}
                    {/*            </div>*/}
                    {/*            <div style={{height: '2rem', color: 'red'}} id="lbThongBao"/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div id="btnContainer" className="thongkec1 thongkeb1">*/}
                    {/*        <button style={{display: AddOrUpdate === 1 ? "block" : "none"}} onClick={btnXacNhanThem}*/}
                    {/*                className="thongkeb1button" type="button">Xác nhận*/}
                    {/*        </button>*/}
                    {/*        <button style={{display: AddOrUpdate === 0 ? "block" : "none"}} onClick={btnXacNhanSua}*/}
                    {/*                className="thongkeb1button" type="button">Xác nhận suawr*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*    /!*                <input type="button" onclick="okok()" value="okok">*!/*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
}


export default DonHang;