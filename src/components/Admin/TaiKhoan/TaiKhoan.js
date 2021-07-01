import React, {useEffect, useState} from 'react';
import $ from "jquery";
import {TheLoaiAPI} from "../../../api/theloaiAPI";
import Loading from "../DungChung/Loading";
import {TaiKhoanAPI} from "../../../api/taiKhoanAPI";
import {Paper} from "@material-ui/core";

function TaiKhoan() {
    const [fTaiKhoan, setfTaiKhoan] = useState("")
    const [fTenKhachHang, setfTenKhachHang] = useState("")
    const [fGioiTinh, setfGioiTinh] = useState("")
    const [fMatKhau, setfMatKhau] = useState("")
    const [fsdt, setfsdt] = useState("")
    const [fDiaChi, setfDiaChi] = useState("")

    const onChangefTaiKhoan = (e) => {
        setfTaiKhoan(e.target.value)
    }
    const onChangefTenKhachHang = (e) => {
        setfTenKhachHang(e.target.value)
    }
    const onChangefGioiTinh = (e) => {
        setfGioiTinh(e.target.value)
    }
    const onChangefMatKhau = (e) => {
        setfMatKhau(e.target.value)
    }
    const onChangefsdt = (e) => {
        setfsdt(e.target.value)
    }
    const onChangefDiaChi = (e) => {
        setfDiaChi(e.target.value)
    }


    const [aTaiKhoan, setaTaiKhoan] = useState("")
    const [aTenKhachHang, setaTenKhachHang] = useState("")
    const [aGioiTinh, setaGioiTinh] = useState("")
    const [aMatKhau, setaMatKhau] = useState("")
    const [aMatKhauXacNhan, setaMatKhauXacNhan] = useState("")
    const [asdt, setasdt] = useState("")
    const [aDiaChi, setaDiaChi] = useState("")

    const onChangeaTaiKhoan = (e) => {
        setaTaiKhoan(e.target.value)
    }
    const onChangeaTenKhachHang = (e) => {
        setaTenKhachHang(e.target.value)
    }
    const onChangeaGioiTinh = (e) => {
        setaGioiTinh(e.target.value)
    }
    const onChangeaMatKhau = (e) => {
        setaMatKhau(e.target.value)
    }
    const onChangeaMatKhauXacNhan = (e) => {
        setaMatKhauXacNhan(e.target.value)
    }


    const onChangeasdt = (e) => {
        setasdt(e.target.value)
    }
    const onChangeaDiaChi = (e) => {
        setaDiaChi(e.target.value)
    }


    const [numrow, setNumrow] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [numpage, setNumpage] = useState(0)
    const [table, setTable] = useState("")
    const [AddOrUpdate, setAddOrUpdate] = useState("")

    const onChangeaTenHang = (e) => {
        setaTenKhachHang(e.target.value)
    }

    const onChangefMaHang = (e) => {
        setfTaiKhoan(e.target.value)
    }
    const onChangefTenHang = (e) => {
        setfTenKhachHang(e.target.value)
    }


    const getData3 = (ma_hang) => {
        const result_data = {
            "username": ma_hang,
            "password": "",
            "hoten": "",
            "gioitinh": "",
            "diachi": "",
            "sdt": ""
        }
        return result_data
    }

    const getData2 = () => {
        const result_data = {
            "username": aTaiKhoan,
            "password": aMatKhau,
            "hoten": aTenKhachHang,
            "gioitinh": aGioiTinh,
            "diachi": aDiaChi,
            "sdt": asdt
        }

        return result_data
    }

    const getData = () => {
        const result_data = {
            "username": fTaiKhoan,
            "password": fMatKhau,
            "hoten": fTenKhachHang,
            "gioitinh": fGioiTinh,
            "diachi": fDiaChi,
            "sdt": fsdt

        }
        return result_data
    }


    const btnThemKhachHang = async (e) => {
        e.preventDefault();
        await setaTaiKhoan("")
        await setaTenKhachHang("")
        $("#CrudThemSua").css("display", "flex");
        $("#lbTitle").text("Thêm khách hàng");
        $("#tbUsername").css("display", "block");
        await setAddOrUpdate(1)
        $("#lbMaTheLoai").css("display", "none");
    }


    const btnExit = () => {
        $("#CrudThemSua").hide();
    }

    const Edit = async (username) => {
        $("#CrudThemSua").css("display", "flex");
        $("#lbTitle").text("Sửa tài khoản");
        $("#lbTaiKhoan").css("display", "block");
        $("#lbThongBao").text("");
        // alert(username)
        const response = await TaiKhoanAPI.getTaiKhoanById(username)
        await setaTaiKhoan(response.username)
        await setaTenKhachHang(response.hoten)
        await setaGioiTinh(response.gioitinh)
        await setasdt(response.sdt)
        await setaDiaChi(response.diachi)
        await setaMatKhau(response.password)
        await setaMatKhauXacNhan(response.password)
        await setAddOrUpdate(0)
    }


    const Del = async (username) => {
        // const data = getData3(ma_the_loai)
        // alert(JSON.stringify(data))

        const response = await TaiKhoanAPI.xoataikhoan(username)
        alert("Xóa thành công");

        phanTrang();
        await preLoad()
    }


    const clear = () => {
        setfTaiKhoan("")
        setfDiaChi("")
        setfGioiTinh("")
        setfsdt("")
        setfTenKhachHang("")
    }

    const btnXacNhanThem = async () => {
        const data = getData2()
        // alert(JSON.stringify(data))
        const response = await TaiKhoanAPI.posttaikhoan(data)
        if (response.status === 1) {
            alert("Thêm khách hàng thành công");
            $("#CrudThemSua").css("display", "none");
            await preLoad()
        } else {
            alert("Tài khoản trùng");
        }
    }

    const btnXacNhanSua = async () => {
        const data = getData2()
        // // alert(JSON.stringify(data))
        const response = await TaiKhoanAPI.puttaikhoan(data)
        if (response) {
            alert("Sửa thành công");
            $("#CrudThemSua").css("display", "none");
            phanTrang();
            await preLoad();
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
                                    <p className="ThanhCongTruSo">{value.username}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.password}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.hoten}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.sdt}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.diachi}</p>
                                </td>
                                <td style={{width: "5%"}} className="total-col">
                                    <button style={{width: "4rem"}} className="thongkeb1button"
                                            onClick={e => Edit(value.username)}>Sửa
                                    </button>
                                </td>
                                <td style={{width: "5%"}} className="total-col">
                                    <button style={{width: "4rem"}} className="thongkeb1button"
                                            onClick={e => Del(value.username)}>Xóa
                                    </button>
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
        const response = await TaiKhoanAPI.countTaiKhoan(data)
        // alert(JSON.stringify(response))
        const x = response['so_luong'];
        setNumpage(x)
    };

    const phanTrang = () => {
        if (numpage) {
            const list = []
            const num = parseInt(numpage / numrow) + 1
            for (let i = 1; i <= num; i++) {
                list.push(<button
                    style={{width: "25%", backgroundColor: currentPage === i ? 'pink' : "#f2f2f2"}}
                    className="thongkeb1button"
                    onClick={(e) => getHangPhanTrang(e, i)}>{i}</button>)
            }
            return list;
        }
    }

    const preLoad = async () => {
        await getNumOfTaiKhoan()
        // alert("sidfioosdf")
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

    const search = async () => {
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
        // alert(JSON.stringify(data))
        // alert(take,skip, num)
        const response = await TaiKhoanAPI.getTaiKhoanPaging(data, take, skip)
        // alert(JSON.stringify(response))
        setTable(response);
        setCurrentPage(num)
        return 1;
    }


    useEffect(() => {
        preLoad()
    }, []);


    return (
        <section>
            <h1 style={{textAlign: 'center'}}>QUẢN LÝ KHÁCH HÀNG</h1>
            <div style={{display: 'flex', width: '100%'}}>
                <Paper id={"filter"} className={"myshadow"} elevation={3} variant="outlined"
                       style={{display: 'flex', flexDirection: 'column', margin: '1rem', width: '30%'}}>
                    <h1 style={{textAlign: 'center'}}>Filter</h1>
                    <div
                        className={"listButton"}
                        style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                        <button id="btnThemKhachHang" className="thongkeb1button"
                                onClick={btnThemKhachHang}>
                            <i className="far fa-plus"/>
                        </button>

                        <button id="clear" className="thongkeb1button" onClick={clear}>
                            <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                        </button>
                        <button id="search" className="thongkeb1button" onClick={search}>
                            <i className="far fa-search" style={{fontSize: '1rem'}}/>
                        </button>
                    </div>
                    <table style={{backgroundColor: 'white'}}>
                        <tr>
                            <td>Tài khoản:</td>
                            <td>
                                <input id="btnTimKiemTaiKhoan" name={"fTaiKhoan"} value={fTaiKhoan}
                                       onChange={onChangefTaiKhoan} className="thongkeb1button" type="text"
                                       placeholder="Tìm kiếm theo tài khoản"/>
                            </td>

                        </tr>
                        <tr>
                            <td>Tên khách hàng:</td>
                            <td>
                                <input id="btnTimKiemTenKhachHang" name={"fTenKhachHang"} value={fTenKhachHang}
                                       onChange={onChangefTenKhachHang} className="thongkeb1button" type="text"
                                       placeholder="Tìm kiếm theo tên khách hàng"/>
                            </td>

                        </tr>
                        <tr>
                            <td>Số điện thoại</td>
                            <td>
                                <input id="btnTimKiemSoDienThoai" name={"fsdt"} value={fsdt} onChange={onChangefsdt}
                                       className="thongkeb1button" type="text"
                                       placeholder="Tìm kiếm theo số điện thoại"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Địa chỉ</td>
                            <td>
                                <input id="btnTimKiemDiaChi" name={"fDiaChi"} value={fDiaChi} onChange={onChangefDiaChi}
                                       className="thongkeb1button" type="text"
                                       placeholder="Tìm kiếm theo địa chỉ"/>
                            </td>
                        </tr>
                    </table>


                </Paper>
                <Paper className={"myshadow"} elevation={3} variant={"outlined"}
                       style={{width: '60%', margin: '1rem', padding: '1rem'}}>

                    <div className="tablecontainer">
                        <table>
                            <thead>
                            <tr>
                                <th className="quy-th">Tài khoản</th>
                                <th className="size-th">Mật khẩu</th>
                                <th className="kichco size-th">Tên khách hàng</th>
                                <th className="dongia size-th">Số điện thoại</th>
                                <th className="total-th size-th">Địa chỉ</th>
                                <th className="size-th" colSpan={2}>Thao tác</th>
                            </tr>
                            </thead>
                            <tbody style={{}} id="tableTaiKhoan">
                            <Table/>
                            </tbody>
                        </table>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button id="btnPhanTrangPrev" onClick={btnPhanTrangPrev} className="thongkeb1button">PREV
                        </button>
                        <div id="listbtnPhanTrang" style={{display: 'flex'}}>
                            {
                                phanTrang()
                            }
                        </div>
                        <button id="btnPhanTrangNext" onClick={btnPhanTrangNext} className="thongkeb1button">NEXT
                        </button>
                    </div>
                    <div id="CrudThemSua" className="themsuaxoa">
                        <div id="btnExit" onClick={btnExit} style={{direction: 'rtl'}}><i
                            className="far fa-times-circle"
                            style={{fontSize: '1.5rem', cursor: 'pointer'}}/>
                        </div>
                        <h3 id="lbTitle">Thêm khách hàng</h3>
                        <div className={"tableCrudThemSua"}>
                            <table>
                                <tr>
                                    <td>
                                        <h4>Tài khoản</h4>
                                    </td>
                                    <td>
                                        <h4 id="lbTaiKhoan">{aTaiKhoan}</h4>
                                        <input id="tbUsername" name={"aTaiKhoan"}
                                               className={"thongkeb1button"}
                                               style={{padding: '0.5rem', display: 'none'}}
                                               value={aTaiKhoan} onChange={onChangeaTaiKhoan} type="text"
                                               placeholder="Nhập tên tài khoản"/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h4>Mật khẩu:</h4>
                                    </td>
                                    <td>
                                        <input id="tbMatKhau" name={aMatKhau} value={aMatKhau}
                                               className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                               onChange={onChangeaMatKhau} type="password" placeholder="Nhập mật khẩu"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Xác nhận mật khẩu:</h4>
                                    </td>
                                    <td>
                                        <input id="tbMatKhauValid" type="password" name={"aMatKhauXacNhan"}
                                               className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                               value={aMatKhauXacNhan} onChange={onChangeaMatKhauXacNhan}
                                               placeholder="Nhập mật khẩu xác nhận"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Tên khách hàng:</h4>
                                    </td>
                                    <td>
                                        <input id="tbTenKhachHang" type="text" name={"aTenKhachHang"}
                                               className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                               value={aTenKhachHang} onChange={onChangeaTenKhachHang}
                                               placeholder="Nhập tên khách hàng"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Số điện thoại: </h4>
                                    </td>
                                    <td>
                                        <input id="tbSdt" type="text" name={"asdt"} value={asdt}
                                               className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                               onChange={onChangeasdt}
                                               placeholder="Nhập số điện thoại"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Giới tính: </h4>
                                    </td>
                                    <td>
                                        <select value={aGioiTinh}
                                                className={"thongkeb1button"}
                                                onChange={onChangeaGioiTinh}>
                                            <option value={""}>Chưa chọn</option>
                                            <option value={"Nam"}>Nam</option>
                                            <option value={"Nu"}>Nữ</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Địa chỉ: </h4>
                                    </td>
                                    <td>
                                        <input id="tbDiaChi" type="text" name={"aDiaChi"} value={aDiaChi}
                                               className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                               onChange={onChangeaDiaChi} placeholder="Nhập địa chỉ"/>
                                    </td>
                                </tr>

                            </table>
                        </div>

                        <div style={{height: '2rem', color: 'red'}} id="lbThongBao"/>
                        <div id="btnContainer" className="thongkec1 thongkeb1">
                            <button style={{display: AddOrUpdate === 1 ? "block" : "none"}} onClick={btnXacNhanThem}
                                    className="thongkeb1button" type="button">Xác nhận
                            </button>
                            <button style={{display: AddOrUpdate === 0 ? "block" : "none"}} onClick={btnXacNhanSua}
                                    className="thongkeb1button" type="button">Xác nhận sửa
                            </button>

                        </div>
                    </div>
                </Paper>
            </div>
        </section>
    );
}


export default TaiKhoan;