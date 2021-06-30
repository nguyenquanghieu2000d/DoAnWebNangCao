import React, {useEffect, useState} from 'react';
import $ from "jquery";
import {TheLoaiAPI} from "../../../api/theloaiAPI";
import Loading from "../DungChung/Loading";
import {TaiKhoanAPI} from "../../../api/taiKhoanAPI";

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
            "diachi":"",
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
            "diachi":aDiaChi,
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
            "diachi":fDiaChi,
            "sdt": fsdt

        }
        return result_data
    }


    const btnThemKhachHang = async (e) => {
        e.preventDefault();
        await setaTaiKhoan("")
        await setaTenKhachHang("")
        $("#CrudThemSua").toggle();
        $("#lbTitle").text("Thêm thể loại");
        $("#tbUsername").css("display", "block");
        await setAddOrUpdate(1)
        $("#lbMaTheLoai").css("display", "none");
    }


    const btnExit = () => {
        $("#CrudThemSua").hide();
    }

    const Edit = async (username) => {
        $("#CrudThemSua").toggle();
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
            alert("Thêm thể loại thành công");
            $("#CrudThemSua").css("display", "none");
            await preLoad()
        }
        else{
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
                                  style={{width: "25%", backgroundColor: currentPage === i ? 'pink' : "gray"}}
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
        await getHangPhanTrang(undefined,1);
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
            <div style={{}} className="quanlyhangcontainer">

                <button style={{width: '10%', padding: '1rem 1rem'}} id="btnThemKhachHang" className="thongkeb1button"
                   onClick={btnThemKhachHang}>
                    <i className="far fa-plus"/>
                </button>
                <input id="btnTimKiemTaiKhoan" style={{width: '15%'}} name={"fTaiKhoan"} value={fTaiKhoan} onChange={onChangefTaiKhoan} className="thongkeb1button" type="text"
                       placeholder="Tìm kiếm theo tài khoản" />
                <input id="btnTimKiemTenKhachHang" style={{width: '20%'}} name={"fTenKhachHang"} value={fTenKhachHang} onChange={onChangefTenKhachHang} className="thongkeb1button" type="text"
                       placeholder="Tìm kiếm theo tên khách hàng" />
                <input id="btnTimKiemSoDienThoai" style={{width: '15%'}} name={"fsdt"} value={fsdt} onChange={onChangefsdt} className="thongkeb1button" type="text"
                       placeholder="Tìm kiếm theo số điện thoại" />
                <input id="btnTimKiemDiaChi" style={{width: '20%'}} name={"fDiaChi"} value={fDiaChi} onChange={onChangefDiaChi} className="thongkeb1button" type="text"
                       placeholder="Tìm kiếm theo địa chỉ" />
                <button style={{width: '10%', padding: '1rem 1rem'}} id="clear" className="thongkeb1button" onClick = {clear}>
                    <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                </button>
                <button style={{width: '10%', padding: '1rem 1rem'}} id="search" className="thongkeb1button" onClick = {search}>
                    <i className="far fa-search" style={{fontSize: '1rem'}}/>
                </button>
                <div className="tablecontainer">
                    <table>
                        <thead>
                        <tr>
                            <th className="quy-th">Tài khoản</th>
                            <th className="size-th">Mật khẩu</th>
                            <th className="kichco size-th">Tên khách hàng</th>
                            <th className="dongia size-th">Số điện thoại</th>
                            <th className="total-th size-th">Địa chỉ</th>
                        </tr>
                        </thead>
                        <tbody style={{}} id="tableTaiKhoan">
                        <Table/>
                        </tbody>
                    </table>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button id="btnPhanTrangPrev" onClick={btnPhanTrangPrev} style={{width: '5%'}} className="thongkeb1button">PREV</button>
                    <div id="listbtnPhanTrang" style={{display: 'flex'}}>
                        {
                            phanTrang()
                        }
                    </div>
                    <button id="btnPhanTrangNext" onClick={btnPhanTrangNext} style={{width: '5%'}} className="thongkeb1button">NEXT</button>
                </div>
                <div id="CrudThemSua" style={{
                    display: 'none',
                    position: 'absolute',
                    margin: '0 28%',
                    top: '1%',
                    WebkitBoxShadow: '-5px 4px 49px -7px rgba(0,0,0,0.75)',
                    MozBoxShadow: '-5px 4px 49px -7px rgba(0,0,0,0.75)',
                    boxShadow: '-5px 4px 49px -7px rgba(0,0,0,0.75)',
                    width: '40%'
                }} className="themsuaxoa">
                    <div id="btnExit" onClick={btnExit} style={{direction: 'rtl'}}><i className="far fa-times-circle"
                                                                    style={{fontSize: '1.5rem', cursor: 'pointer'}}/>
                    </div>
                    <h3 id="lbTitle">Thêm khách hàng</h3>
                    <div style={{fontWeight: 'bold'}}>Tài khoản: <h4 id="lbTaiKhoan">{aTaiKhoan}</h4>
                    <input style={{display: 'none'}} id="tbUsername" name={"aTaiKhoan"} value={aTaiKhoan} onChange={onChangeaTaiKhoan} type="text" placeholder="Nhập tên tài khoản"/>
                    </div>
                    <h5>Mật khẩu: <input id="tbMatKhau" name={aMatKhau} value={aMatKhau} onChange={onChangeaMatKhau} type="password" placeholder="Nhập mật khẩu"/></h5>
                    <h5>Xác nhận mật khẩu: <input id="tbMatKhauValid" type="password" name={"aMatKhauXacNhan"} value={aMatKhauXacNhan} onChange={onChangeaMatKhauXacNhan}
                                                  placeholder="Nhập mật khẩu xác nhận"/></h5>
                    <h5>Tên khách hàng: <input id="tbTenKhachHang" type="text" name={"aTenKhachHang"} value={aTenKhachHang} onChange={onChangeaTenKhachHang} placeholder="Nhập tên khách hàng"/></h5>
                    <h5>Số điện thoại: <input id="tbSdt" type="text" name={"asdt"} value={asdt} onChange={onChangeasdt} placeholder="Nhập số điện thoại"/></h5>
                    <h5>Giới tính:
                        <select value={aGioiTinh} onChange={onChangeaGioiTinh}>
                            <option value={""}>Chưa chọn</option>
                            <option value={"Nam"}>Nam</option>
                            <option value={"Nu"}>Nữ</option>
                        </select>

                    </h5>

                    <h5>Địa chỉ: <input id="tbDiaChi" type="text" name={"aDiaChi"} value={aDiaChi} onChange={onChangeaDiaChi} placeholder="Nhập địa chỉ"/></h5>
                    <div style={{height: '2rem', color: 'red'}} id="lbThongBao"/>
                    <div id="btnContainer" className="thongkec1 thongkeb1">
                        <button style={{display: AddOrUpdate === 1 ? "block" : "none"}} onClick={btnXacNhanThem}
                                className="thongkeb1button" type="button">Xác nhận
                        </button>
                        <button style={{display: AddOrUpdate === 0 ? "block" : "none"}} onClick={btnXacNhanSua}
                                className="thongkeb1button" type="button">Xác nhận suawr
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
}


export default TaiKhoan;