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
import {convertToVND} from "../../../assets/js/tools";

function DonHang() {
    const [fMaDonHang, setfMaDonHang] = useState("")
    const [fUsername, setfUsername] = useState("")
    const [fDiaChi, setfDiaChi] = useState("")
    const [fGiaThap, setfGiaThap] = useState(0)
    const [fGiaCao, setfGiaCao] = useState(300000000)
    const [fNgayBatDau, setfNgayBatDau] = useState(new Date('2019-08-18T21:11:54'))
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

    const onChangefSdt = (e) => {
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
                                    <p style={{textAlign: 'center'}}>{
                                        value.dia_chi.length < 30 ? value.dia_chi : value.dia_chi.substr(0,30) + "..."
                                        }</p>
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
                                    <p style={{textAlign: 'center'}}>{convertToVND(value.thanhtien)}</p>
                                </td>
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
                                  style={{width: "25%", backgroundColor: currentPage === i ? 'pink' : "#f2f2f2"}}
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


        
        await preLoad()
        await getHangPhanTrang(undefined, 1);
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

            <div style={{display: 'flex', width: '100%'}}>
                <Paper id={"filter"} className={"myshadow "} elevation={3} variant="outlined"
                       style={{display: 'flex', flexDirection: 'column', margin: '1rem', width: '30%', height:'70%'}}>
                    <h1 style={{textAlign: 'center'}}>Filter</h1>
                    <div
                        className={"listButton"}
                        style={{display: 'flex'}}>
                        <button  onClick={clear} id="clear"
                                 className="thongkeb1button">
                            <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                        </button>
                        <button  onClick={search} id="search"
                                 className="thongkeb1button">
                            <i className="far fa-search" style={{fontSize: '1rem'}}/>
                        </button>
                    </div>
                    <table style={{ backgroundColor: 'white'}}>

                        <tr>
                            <td>Mã đơn hàng</td>
                            <td>
                                <input id="tbTimKiemMaLoai"
                                       name={"fMaDonHang"}
                                       value={fMaDonHang}
                                       onChange={onChangefMaDonHang}
                                       className="thongkeb1button" type="text" placeholder="Mã đơn hàng"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>
                            <input id="tbTimKiemTenLoai"
                                   // style={{width: '80%'}}
                                   name={"fUsername"}
                                   value={fUsername}
                                   onChange={onChangefUsername}
                                   className="thongkeb1button" type="text" placeholder="Username"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Địa chỉ</td>
                            <td>
                                <input id="tbTimKiemMaTheLoai"
                                    // style={{width: '80%'}}
                                       name={"fDiaChi"}
                                       value={fDiaChi}
                                       onChange={onChangefDiaChi}
                                       className="thongkeb1button" type="text"
                                       placeholder="Địa chỉ"/>
                            </td>

                        </tr>

                        <tr>
                            <td>Số điện thoại</td>
                            <td>
                                <input id="tbTimKiemMaTheLoai"
                                    // style={{width: '80%'}}
                                       name={"fSdt"}
                                       value={fSdt}
                                       onChange={onChangefSdt}
                                       className="thongkeb1button" type="text"
                                       placeholder="Số điện thoại"/>
                            </td>

                        </tr>
                        <tr>
                            <td>Giá tiền trong khoảng</td>
                            <td>
                                <input id="tbTimKiemMaTheLoai"
                                    // style={{width: '80%'}}
                                       name={"fGiaThap"}
                                       value={fGiaThap}
                                       onChange={onChangefGiaThap}
                                       className="thongkeb1button" type="text"
                                       placeholder="Giá thấp"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Giá tiền trong khoảng</td>
                            <td>
                                <input id="tbTimKiemMaTheLoai"
                                    // style={{width: '80%'}}
                                       name={"fGiaCao"}
                                       value={fGiaCao}
                                       onChange={onChangefGiaCao}
                                       className="thongkeb1button" type="text"
                                       placeholder="Giá cao"/>
                            </td>
                        </tr>
                        <tr>
                            {/*<td>Ngày bắt đầu</td>*/}
                            <td colSpan={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Ngày bắt đầu"
                                        value={fNgayBatDau}

                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Ngày kết thúc"
                                        value={fNgayKetThuc}
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
                <Paper className={"myshadow"} elevation={3} variant={"outlined"}
                       style={{width: '60%', margin: '1rem', padding: '1rem'}}>

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
                        <input id="btnPhanTrangPrev" onClick={btnPhanTrangPrev}
                               className="thongkeb1button" type="button"
                               defaultValue="PREV"/>
                        <div id="listbtnPhanTrang" style={{display: 'flex'}}>
                            {
                                phanTrang()
                            }
                        </div>
                        <input id="btnPhanTrangNext" onClick={btnPhanTrangNext}
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
                </Paper>
            </div>
        </section>
    );
}


export default DonHang;