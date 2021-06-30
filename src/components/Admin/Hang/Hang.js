import React, {useEffect, useState} from 'react';
import $ from 'jquery'
import {HangAPI} from "../../../api/hangAPI";
import {convertToVND} from "../../../assets/js/tools";
import Loading from "../DungChung/Loading";
import {TheLoaiAPI} from "../../../api/theloaiAPI";
import ComboBoxTheLoai from "./ComboBoxTheLoai";

function Hang() {

    // Filter
    const [fMaHang, setfMaHang] = useState("")
    const [fTenHang, setfTenHang] = useState("")
    const [fNhoNhat, setfNhoNhat] = useState("")
    const [fLonNhat, setfLonNhat] = useState("")
    const [fThuongHieu, setfThuongHieu] = useState("")


    const [numrow, setNumrow] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [numpage, setNumpage] = useState(0)
    const [table, setTable] = useState("")
    const [AddOrUpdate, setAddOrUpdate] = useState("")

    // Add
    const [aMaHang, setaMaHang] = useState("")
    const [aTenHang, setaTenHang] = useState("")
    const [aGiaCu, setaGiaCu] = useState("")
    const [aGiaMoi, setaGiaMoi] = useState("")
    const [aThuongHieu, setaThuongHieu] = useState("")
    const [aMoTa, setaMoTa] = useState("")
    const [aHinhDaiDien, setHinhDaiDien] = useState("")
    const [aTheLoai, setaTheLoai] = useState("")

    const onChangeaTenHang = (e)  => {
        setaTenHang(e.target.value)
    }
    const onChangeaGiaCu = (e)  => {
        setaGiaCu(e.target.value)
    }
    const onChangeaGiaMoi = (e)  => {
        setaGiaMoi(e.target.value)
    }
    const onChangeaThuongHieu = (e)  => {
        setaThuongHieu(e.target.value)
    }
    const onChangeaMoTa = (e)  => {
        setaMoTa(e.target.value)
    }
    const onChangeaHinhDaiDien = (e)  => {
        setHinhDaiDien(e.target.value)
    }




    const onChangefMaHang = (e)  => {
       setfMaHang(e.target.value)
    }
    const onChangefTenHang = (e)  => {
        setfTenHang(e.target.value)
    }
    const onChangefNhoNhat = (e)  => {
        setfNhoNhat(e.target.value)
    }
    const onChangefLonNhat = (e)  => {
        setfLonNhat(e.target.value)
    }
    const onChangefThuongHieu = (e)  => {
        setfThuongHieu(e.target.value)
    }

    const getData3 = (ma_hang) => {
        const result_data = {
            "ma_hang": ma_hang,
            "ten_hang": "",
            "gia_cu": "",
            "gia_moi": "",
            "thuong_hieu": "",
            "hinh_dai_dien": "",
            "mo_ta": "",
            "ma_loai": ""
        }
        return result_data
    }

    const getData2 = () => {
        const result_data = {
            "ma_hang": aMaHang,
            "ten_hang": aTenHang,
            "gia_cu": aGiaCu,
            "gia_moi": aGiaMoi,
            "thuong_hieu": aThuongHieu,
            "hinh_dai_dien": aHinhDaiDien,
            "mo_ta": aMoTa,
            "ma_loai": aTheLoai
        }
        return result_data
    }


    const getData = () => {
        let nhonhat = fNhoNhat !== "" ? fNhoNhat : 0;
        let lonnhat = fLonNhat !== "" ? fLonNhat : 9999999;
        const result_data = {
            "ma_hang": fMaHang,
            "ten_hang": fTenHang,
            "gia_moi": nhonhat,
            "gia_cu": lonnhat,
            "thuong_hieu": fThuongHieu
        }
        return result_data
    }

    const btnThemKhachHang = async (e) => {
        e.preventDefault();
        $("#lbMaHang").text("");
        $("#tbTenHang").val("");
        $("#tbGiaCu").val("");
        $("#tbGiaMoi").val("");
        $("#tbThuongHieu_").val("");
        $("#CrudThemSua").toggle();
        $("#lbTitle").text("Thêm khách hàng");
        await setAddOrUpdate(1)
        $("#lbMaHang").css("display", "none");
    }

    const btnXacNhanThem = async () => {
        const data = getData2()
        const response = await HangAPI.posthang(data)
        if(response) alert("Thêm hàng thành công")
    }


    const Edit = async (ma_hang) => {
        $("#CrudThemSua").toggle();
        $("#lbTitle").text("Sửa hàng");
        $("#lbMaHang").css("display", "block");
        $("#lbThongBao").text("");

        const response = await HangAPI.getHangByID_(ma_hang)
        let res = response[0];
        await setaMaHang(res["ma_hang"])
        await setaTenHang(res["ten_hang"])
        await setaGiaCu(res["gia_cu"])
        await setaGiaMoi(res["gia_moi"])
        await setaThuongHieu(res["thuong_hieu"])
        await setaMoTa(res["mo_ta"])
        await setHinhDaiDien(res["gia_cu"])
        await setaTheLoai(res["ma_loai"])
        await setAddOrUpdate(0)
    }





    const btnXacNhanSua = async (ma_hang) => {
        const data = getData2()
        const response = await HangAPI.suaHang(data)
        if(response){
            alert("Sửa thành công");
            $("#CrudThemSua").css("display", "none");
            await getHangPhanTrang(undefined, 1);
        }
    }

    const Del = async (ma_hang) => {
        const data = getData3(ma_hang)
        const response = await HangAPI.xoaHang(data)
        alert("Xóa thành công");
        phanTrang();
        await getHangPhanTrang(undefined,1);
    }




    const btnExit = () => {
        $("#CrudThemSua").hide();
    }



    const getNumOfTaiKhoan = async () => {
        const data = getData()
        const response = await HangAPI.countHang(data)
        const x = response['so_luong'];
        setNumpage(x)
    };

    const phanTrang = () => {
        if (numpage) {
            const list = []
            const num = parseInt(numpage / numrow) + 1
            for (let i = 1; i <= num; i++) {
                list.push(<button id="btnPhanTrang`+ i + `"  style={{width:"25%" , backgroundColor: currentPage === i ? 'pink': "gray"}} className="thongkeb1button"
                                  onClick={(e)=>getHangPhanTrang(e,i)}>{i}</button>)
            }
            return list;
        }
    }

    const preLoad = async () => {
        await getNumOfTaiKhoan()
        await getHangPhanTrang(undefined, 1)
    }

    const btnPhanTrangPrev = () => {
        if (getHangPhanTrang(undefined,currentPage - 1) <= 0) {

        }
    }

    const btnPhanTrangNext = () => {
        if (getHangPhanTrang(undefined,currentPage + 1) === 0)
            setCurrentPage(currentPage-1);
    }

    const getHangPhanTrang = async (e, num) => {
        if(e) e.preventDefault();
        if (num <= 0) num = 1;
        let take = numrow;
        let skip = (num - 1) * numrow;
        if (skip > numpage) return 0;
        const data = getData()
        const response = await HangAPI.getHangPaging(data,take,skip)
        setTable(response);
        setCurrentPage(num)
        return 1;
    }



    const Table = () => {
        return (
            <>
                {
                    table?table.map((value, index)=>{
                        return <>
                            <tr>
                                <td className="quy-col">
                                    <p className="ThanhCongTruSo">{value.ma_hang}</p>
                                </td>
                                <td>
                                    <p style={{textAlign:"center"}}>{value.ten_hang}</p>
                                </td>
                                <td>
                                    <p>{convertToVND(value.gia_cu)}</p>
                                </td>
                                <td className="size-col">
                                    <p>{convertToVND(value.gia_moi)}</p>
                                </td>
                                <td className="quy-col">
                                    <p style={{color: "green"}}>{value.thuong_hieu}</p>
                                </td>
                                <td className="quy-col">
                                    <img style={{width: "5rem", height: "8rem"}}
                                         src={value.hinh_dai_dien} alt="Girl in a jacket" width="500" height="600"/>
                                </td>
                                <td className="quy-col">
                                    {/*<p style={{color: "green"}}>{value.mo_ta}</p>*/}
                                </td>
                                <td className="quy-col">
                                    <p style={{color: "green"}}>{value.ma_loai }</p>
                                </td>
                                <td style={{width:"5%"}} className="total-col">
                                    {/*<p style={{color: "green"}}>*/}
                                    <button style={{width: "4rem"}}
                                            className="thongkeb1button"
                                        // id="btnEdit` + value["username"] + `"
                                         onClick={(e)=>Edit(value.ma_hang)}
                                    >Sửa</button>
                                    {/*</p>*/}
                                </td>
                                <td style={{width:"5%"}} className="total-col">
                                    {/*<p style={{color: "green"}}>*/}
                                    <button style={{width: "4rem"}}
                                            className="thongkeb1button"
                                        // id="btnDel` + value["username"] + `"
                                        onClick={(e) => Del(value.ma_hang)}
                                    >Xóa</button>
                                    {/*</p>*/}
                                </td>
                            </tr>
                        </>
                    }): <Loading/>
                }
            </>
        )
    }

    const clear = () => {
        setfMaHang("")
        setfTenHang("")
        setfNhoNhat("")
        setfLonNhat("")
        setfThuongHieu("")
    }

    const search = async () => {
        await preLoad()
        await getHangPhanTrang(undefined,1);
    }

    useEffect(() => {
        preLoad()

    }, [])

    return (
        <section>
            <h1 style={{textAlign: 'center'}}>QUẢN LÝ HÀNG</h1>
            <div style={{}} className="quanlyhangcontainer">
                <div style={{display: 'flex'}}>
                    <button style={{width: '1%', padding: '1rem 1rem'}} id="btnThemKhachHang"
                            className="thongkeb1button"
                            onClick={btnThemKhachHang}>
                        <i className="far fa-plus"/>
                    </button>
                    <input id="tbTimKiemMaHang" name={"fMaHang"} style={{width: '5%'}} className="thongkeb1button" type="text"
                           placeholder="Mã hàng" onChange={onChangefMaHang} />
                    <input id="tbTimKiemTenHang" name={"fTenHang"} style={{width: '10%'}} className="thongkeb1button" type="text"
                           placeholder="Tên hàng" onChange={onChangefTenHang} />
                    <p>Giá trong khoảng: </p>
                    <input id="tbNhoNhat" name={"fNhoNhat"} style={{width: '10%'}} className="thongkeb1button" type="text"
                           placeholder="Nhỏ nhất" onChange={onChangefNhoNhat} />
                    <input id="tbLonNhat" name={"fLonNhat"} style={{width: '10%'}} className="thongkeb1button" type="text"
                           placeholder="Lớn nhất" onChange={onChangefLonNhat} />
                    <input id="tbThuongHieu" name={"fThuongHieu"} style={{width: '10%'}} className="thongkeb1button" type="text"
                           placeholder="Thương hiệu" onChange={onChangefThuongHieu} />
                    <button style={{width: '1.5%', padding: '1rem 1rem'}} id="clear" className="thongkeb1button" onClick={clear}>
                        <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                    </button>
                    <button style={{width: '1.5%', padding: '1rem 1rem'}} onClick={search} id="search" className="thongkeb1button" >
                        <i className="far fa-search" style={{fontSize: '1rem'}}/>
                    </button>
                </div>
                <div className="tablecontainer">
                    <table>
                        <thead>
                        <tr>
                            <th className="quy-th">Mã hàng</th>
                            <th className="size-th">Tên hàng</th>
                            <th className="kichco size-th">Giá cũ</th>
                            <th className="dongia size-th">Giá mới</th>
                            <th className="total-th size-th">Thương hiệu</th>
                            <th className>Hình đại diện</th>
                            <th className>Mô tả</th>
                            <th>Loại</th>
                        </tr>
                        </thead>
                        <tbody style={{}} id="tableTaiKhoan">
                        <Table/>
                        </tbody>
                    </table>
                </div>


                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button onClick={btnPhanTrangPrev} style={{width: '5%'}} className="thongkeb1button">PREV</button>
                    <div id="listbtnPhanTrang" style={{display: 'flex'}}>
                        {
                            phanTrang()
                        }
                    </div>
                    <button onClick={btnPhanTrangNext} style={{width: '5%'}} className="thongkeb1button">NEXT</button>
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
                    <div onClick={btnExit} id="btnExit" style={{direction: 'rtl'}}><i className="far fa-times-circle"
                                                                                      style={{
                                                                                          fontSize: '1.5rem',
                                                                                          cursor: 'pointer'
                                                                                      }}/>
                    </div>
                    <h3 id="lbTitle">Thêm khách hàng</h3>
                    <div style={{display: 'flex'}}>
                        <div style={{width: '60%'}}>
                            <div id="lbMaHang" style={{fontWeight: 'bold'}}>{aMaHang}</div>
                            <h5>Tên hàng: <input id="tbTenHang" name={"aTenHang"} value={aTenHang} onChange={onChangeaTenHang} type="text"  placeholder="Nhập tên hàng"/></h5>
                            <h5>Giá cũ: <input id="tbGiaCu" name={"aGiaCu"} value={aGiaCu} onChange={onChangeaGiaCu} type="text" placeholder="Nhập giá cũ"/></h5>
                            <h5>Giá mới: <input id="tbGiaMoi" name={"aGiaMoi"} value={aGiaMoi} onChange={onChangeaGiaMoi} type="text" placeholder="Nhập giá mới"/></h5>
                            <h5>Thương hiệu: <input id="tbThuongHieu_" name={"aThuongHieu"} value={aThuongHieu} onChange={onChangeaThuongHieu} type="text" placeholder="Nhập thương hiệu"/></h5>
                            <h5>Hình đại diện: <input id="fiHinhDaiDien" name={"aHinhDaiDien"} onChange={onChangeaThuongHieu} type="file" placeholder="Chọn ảnh"/></h5>
                            <div style={{height: '2rem', color: 'red'}} id="lbThongBao"/>
                        </div>
                        <div style={{borderLeft: '1px solid #000', margin: '0 2rem', height: '500px'}}/>
                        <div style={{width: '40%'}}>
                            <h5>Mô tả: <br/><br/><textarea id="tbMota" style={{
                                width: '100%',
                                borderRadius: '0.4rem',
                                height: '10rem',
                                backgroundColor: '#c8cbcf'
                            }} name={"aMoTa"} value={aMoTa} onChange={onChangeaMoTa} placeholder="Nhập mô tả" defaultValue={""}/></h5>
                            <ComboBoxTheLoai value={aTheLoai} currentCTTheLoai={setaTheLoai}/>
                        </div>
                    </div>
                    <div id="btnContainer" className="thongkec1 thongkeb1">
                        <button style={{display:AddOrUpdate === 1 ? "block":"none"}} onClick={btnXacNhanThem} className="thongkeb1button" type="button">Xác nhận</button>
                        <button style={{display:AddOrUpdate === 0 ? "block":"none"}} onClick={btnXacNhanSua} className="thongkeb1button" type="button">Xác nhận suawr</button>
                    </div>
                    {/*                <input type="button" onclick="okok()" value="okok">*/}
                </div>
            </div>
        </section>
    );
}


export default Hang;