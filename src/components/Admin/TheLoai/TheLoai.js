import React, {useEffect, useState} from 'react';
import $ from "jquery";
import Loading from "../DungChung/Loading";
import {HangAPI} from "../../../api/hangAPI";
import {TheLoaiAPI} from "../../../api/theloaiAPI";


function TheLoai() {
    const [fMaHang, setfMaHang] = useState("")
    const [fTenHang, setfTenHang] = useState("")

    const [aMaHang, setaMaHang] = useState("")
    const [aTenHang, setaTenHang] = useState("")


    const [numrow, setNumrow] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [numpage, setNumpage] = useState(0)
    const [table, setTable] = useState("")
    const [AddOrUpdate, setAddOrUpdate] = useState("")

    const onChangeaTenHang = (e) => {
        setaTenHang(e.target.value)
    }

    const onChangefMaHang = (e) => {
        setfMaHang(e.target.value)
    }
    const onChangefTenHang = (e) => {
        setfTenHang(e.target.value)
    }


    const getData3 = (ma_hang) => {
        const result_data = {
            "ma_the_loai": ma_hang,
            "ten_loai": "",

        }
        return result_data
    }

    const getData2 = () => {
        const result_data = {
            "ma_the_loai": aMaHang,
            "ten_loai": aTenHang,

        }
        return result_data
    }

    const getData = () => {
        const result_data = {
            "ma_the_loai": fMaHang,
            "ten_loai": fTenHang,
        }
        return result_data
    }


    const btnThemKhachHang = async (e) => {
        e.preventDefault();
        await setaMaHang("")
        await setaTenHang("")
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
        const response = await TheLoaiAPI.getTheLoaiById(ma_the_loai)
        let res = response[0];
        await setaMaHang(res["ma_the_loai"])
        await setaTenHang(res["ten_loai"])
        await setAddOrUpdate(0)
    }


    const Del = async (ma_the_loai) => {
        // const data = getData3(ma_the_loai)
        // alert(JSON.stringify(data))

        const response = await TheLoaiAPI.xoatheloai(ma_the_loai)
        alert(JSON.stringify(response))
        alert("Xóa thành công");

        phanTrang();
        await getNumOfTaiKhoan()
        await getHangPhanTrang(undefined,1);
    }


    const clear = () => {
        setfMaHang("")
        setfTenHang("")
    }

    const btnXacNhanThem = async () => {
        const data = getData2()
        alert(JSON.stringify(data))
        const response = await TheLoaiAPI.posttheloai(data)
        if (response) {
            alert("Thêm thể loại thành công")
            $("#CrudThemSua").css("display", "none");
            await preLoad()
        }
    }

    const btnXacNhanSua = async (ma_hang) => {
        const data = getData2()
        alert(JSON.stringify(data))
        const response = await TheLoaiAPI.puttheloai(data)
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
                                    <p className="ThanhCongTruSo">{value.ma_the_loai}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.ten_loai}</p>
                                </td>
                                <td style={{width: "5%"}} className="total-col">
                                    <button style={{width: "4rem"}} className="thongkeb1button"
                                            onClick={e => Edit(value.ma_the_loai)}>Sửa
                                    </button>
                                </td>
                                <td style={{width: "5%"}} className="total-col">
                                    <button style={{width: "4rem"}} className="thongkeb1button"
                                            onClick={e => Del(value.ma_the_loai)}>Xóa
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
        const response = await TheLoaiAPI.countTheLoai(data)
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
        const response = await TheLoaiAPI.getTheLoaiPaging(data, take, skip)
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
            <h1 style={{textAlign: 'center'}}>QUẢN LÝ THỂ LOẠI</h1>
            <div style={{display: 'flex'}}>
                <div style={{width: '100%'}} className="quanlyhangcontainer">
                    <div style={{display: 'flex'}}>
                        <button style={{width: '1%', padding: '1rem 1rem'}} id="btnThemKhachHang"
                                className="thongkeb1button"
                                onClick={btnThemKhachHang}>
                            <i className="far fa-plus"/>
                        </button>
                        <input id="tbTimKiemMaTheLoai" name={"fMaHang"} value={fMaHang} onChange={onChangefMaHang}
                               className="thongkeb1button" type="text" placeholder="Mã thể loại"/>
                        <input id="tbTimKiemTenTheLoai" name={"fTenHang"} value={fTenHang} onChange={onChangefTenHang}
                               className="thongkeb1button" type="text" placeholder="Tên thể loại"/>
                        <button style={{width: '1.5%', padding: '1rem 1rem'}} id="clear"
                                onClick={clear}
                                className="thongkeb1button">
                            <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                        </button>
                        <button style={{width: '1.5%', padding: '1rem 1rem'}} id="search" className="thongkeb1button"
                           onClick={search}>
                            <i className="far fa-search" style={{fontSize: '1rem'}}/>
                        </button>
                    </div>
                    <div className="tablecontainer" style={{display: 'flex'}}>
                        <table>
                            <thead>
                            <tr>
                                <th style={{width: '10rem'}} className="quy-th">Mã thể loại</th>
                                <th style={{width: '10rem'}} className="size-th">Tên thể loại</th>
                            </tr>
                            </thead>
                            <tbody style={{}} id="tableTaiKhoan">
                            <Table/>
                            </tbody>
                        </table>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button id="btnPhanTrangPrev" onClick={btnPhanTrangPrev} style={{width: '10%'}} className="thongkeb1button">PREV</button>
                        <div id="listbtnPhanTrang" style={{display: 'flex'}}>
                            {
                                phanTrang()
                            }
                        </div>
                        <button id="btnPhanTrangNext" onClick={btnPhanTrangNext} style={{width: '10%'}} className="thongkeb1button">NEXT</button>
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
                        <div id="btnExit" onClick={btnExit} style={{direction: 'rtl'}}><i
                            className="far fa-times-circle" style={{
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}/></div>
                        <h3 id="lbTitle">Thêm thể loại</h3>
                        <div style={{display: 'flex'}}>
                            <div style={{width: '60%'}}>
                                <div id="lbMaTheLoai" style={{fontWeight: 'bold'}}>{aMaHang? aMaHang : "Mã thể loại:"}</div>
                                {/*<div style="height:0.5rem; color:red" id="lbThongBao">22</div>*/}
                                <h5>Tên thể loại:
                                    <input id="tbTenTheLoai" name={"aTenHang"} value={aTenHang} onChange={onChangeaTenHang} type="text" placeholder="Nhập Tên thể loại"/>
                                </h5>
                                <div style={{height: '2rem', color: 'red'}} id="lbThongBao"/>
                            </div>
                        </div>
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
            </div>
        </section>
    );
}


export default TheLoai;