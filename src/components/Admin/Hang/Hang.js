import React, {useEffect, useState} from 'react';
import $ from 'jquery'
import {HangAPI} from "../../../api/hangAPI";
import {convertToVND} from "../../../assets/js/tools";
import Loading from "../DungChung/Loading";
import {TheLoaiAPI} from "../../../api/theloaiAPI";
import ComboBoxTheLoai from "./ComboBoxTheLoai";
import {Button, Fab, Paper} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from "@material-ui/icons/Save";

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
    const [openAnhHienTai, setOpenAnhHienTai] = useState(true);
    // Add
    const [aMaHang, setaMaHang] = useState("")
    const [aTenHang, setaTenHang] = useState("")
    const [aGiaCu, setaGiaCu] = useState("")
    const [aGiaMoi, setaGiaMoi] = useState("")
    const [aThuongHieu, setaThuongHieu] = useState("")
    const [aMoTa, setaMoTa] = useState("")
    const [aHinhDaiDien, setHinhDaiDien] = useState("")
    const [aTheLoai, setaTheLoai] = useState("")
    const [upUploadImage, setUploadImage] = useState("")
    const onChangeaTenHang = (e) => {
        setaTenHang(e.target.value)
    }
    const onChangeaGiaCu = (e) => {
        setaGiaCu(e.target.value)
    }
    const onChangeaGiaMoi = (e) => {
        setaGiaMoi(e.target.value)
    }
    const onChangeaThuongHieu = (e) => {
        setaThuongHieu(e.target.value)
    }
    const onChangeaMoTa = (e) => {
        setaMoTa(e.target.value)
    }
    const onChangeaHinhDaiDien = (e) => {
        setHinhDaiDien(e.target.value)
    }


    const onChangefMaHang = (e) => {
        setfMaHang(e.target.value)
    }
    const onChangefTenHang = (e) => {
        setfTenHang(e.target.value)
    }
    const onChangefNhoNhat = (e) => {
        setfNhoNhat(e.target.value)
    }
    const onChangefLonNhat = (e) => {
        setfLonNhat(e.target.value)
    }
    const onChangefThuongHieu = (e) => {
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
            "hinh_dai_dien": upUploadImage,
            "mo_ta": aMoTa,
            "ma_loai": aTheLoai
        }
        return result_data
    }


    const getData = () => {
        let nhonhat = fNhoNhat !== "" ? fNhoNhat : 0;
        let lonnhat = fLonNhat !== "" ? fLonNhat : 999999999;
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
        clear1()
        $("#lbMaHang").text("");
        $("#tbTenHang").val("");
        $("#tbGiaCu").val("");
        $("#tbGiaMoi").val("");
        $("#tbThuongHieu_").val("");
        $("#CrudThemSua").css("display", "flex");
        $("#lbTitle").text("Thêm hàng");
        await setAddOrUpdate(1)
        $("#lbMaHang").css("display", "none");
        setOpenAnhHienTai(false);
    }

    const btnXacNhanThem = async (e) => {
        e.preventDefault();
        const data = getData2()

        const response = await HangAPI.posthang(data)
        if (response) alert("Thêm hàng thành công")
        $("#CrudThemSua").css("display", "none");
        await phanTrang();
        await preLoad();
        clear1()
    }


    const Edit = async (ma_hang) => {
        $("#CrudThemSua").css("display", "flex");
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
        await setHinhDaiDien(res["hinh_dai_dien"])
        await setaTheLoai(res["ma_loai"])
        setOpenAnhHienTai(true);
        await setAddOrUpdate(0)
    }


    const btnXacNhanSua = async (ma_hang) => {
        const data = getData2()

        if (data.hinh_dai_dien === "") data.hinh_dai_dien = "a"
        const response = await HangAPI.suaHang(data)
        if (response) {
            // alert(JSON.stringify(response));
            alert("Sửa thành công");
            $("#CrudThemSua").css("display", "none");
            await getHangPhanTrang(undefined, 1);
        }
        clear1()
    }

    const Del = async (ma_hang) => {
        const data = getData3(ma_hang)
        const response = await HangAPI.xoaHang(data)
        alert("Xóa thành công");
        phanTrang();
        await getHangPhanTrang(undefined, 1);
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

    const getHangPhanTrang = async (e, num) => {
        if (e) e.preventDefault();
        if (num <= 0) num = 1;
        let take = numrow;
        let skip = (num - 1) * numrow;
        if (skip > numpage) return 0;
        const data = getData()
        const response = await HangAPI.getHangPaging(data, take, skip)
        setTable(response);
        setCurrentPage(num)
        return 1;
    }


    const Table = () => {
        return (
            <>
                {
                    table ? table.map((value, index) => {
                        return <>
                            <tr>
                                <td className="quy-col">
                                    <p className="ThanhCongTruSo">{value.ma_hang}</p>
                                </td>
                                <td>
                                    <p style={{textAlign: "center"}}>{value.ten_hang}</p>
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
                                    <p style={{color: "green"}}>{value.ma_loai}</p>
                                </td>
                                <td style={{width: "5%"}} className="total-col">
                                    {/*<p style={{color: "green"}}>*/}
                                    <button style={{width: "4rem"}}
                                            className="thongkeb1button"
                                        // id="btnEdit` + value["username"] + `"
                                            onClick={(e) => Edit(value.ma_hang)}
                                    >Sửa
                                    </button>
                                    {/*</p>*/}
                                </td>
                                <td style={{width: "5%"}} className="total-col">
                                    {/*<p style={{color: "green"}}>*/}
                                    <button style={{width: "4rem"}}
                                            className="thongkeb1button"
                                            onClick={(e) => Del(value.ma_hang)}
                                    >Xóa
                                    </button>
                                    {/*</p>*/}
                                </td>
                            </tr>
                        </>
                    }) : <Loading/>
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

    const clear1 = () => {
        setaMaHang("")
        setaTenHang("")
        setaTheLoai("")
        setaGiaCu("")
        setaGiaMoi("")
        setaMoTa("")
        setaThuongHieu("")
    }

    const search = async () => {
        await preLoad()
        await getHangPhanTrang(undefined, 1);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertBase64(file);
            setUploadImage(base64);
        }
    };


    useEffect(() => {
        preLoad()

    }, [])

    return (
        <section>
            <h1 style={{textAlign: 'center'}}>QUẢN LÝ HÀNG</h1>
            <div style={{display: 'flex', width: '100%'}}>
                <Paper id={"filter"} className={"myshadow hang"} elevation={3} variant="outlined"
                       style={{display: 'flex', flexDirection: 'column', margin: '1rem', width: '28%', height: '80%'}}>
                    <h1 style={{textAlign: 'center'}}>Filter</h1>
                    <div
                        className={"listButton"}
                        style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                        <button id="btnThemKhachHang"
                                className="thongkeb1button"
                                onClick={btnThemKhachHang}>
                            <i className="far fa-plus"/>
                        </button>
                        <button id="clear" className="thongkeb1button" onClick={clear}>
                            <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                        </button>
                        <button onClick={search} id="search" className="thongkeb1button">
                            <i className="far fa-search" style={{fontSize: '1rem'}}/>
                        </button>
                    </div>
                    <table style={{backgroundColor: 'white'}}>


                        <tr>
                            <td>Mã hàng:</td>
                            <td>
                                <input id="tbTimKiemMaHang" className="thongkeb1button" name={"fMaHang"} value={fMaHang}
                                       type="text"
                                       placeholder="Mã hàng" onChange={onChangefMaHang}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Tên hàng:</td>
                            <td>
                                <input id="tbTimKiemTenHang" value={fTenHang} name={"fTenHang"}
                                       className="thongkeb1button" type="text"
                                       placeholder="Tên hàng" onChange={onChangefTenHang}/>
                            </td>

                        </tr>
                        <tr>
                            <td>Giá trong khoảng:</td>
                            <td>
                                <input id="tbNhoNhat" name={"fNhoNhat"} className="thongkeb1button" type="text"
                                       placeholder="Nhỏ nhất" value={fNhoNhat} onChange={onChangefNhoNhat}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Giá trong khoảng:</td>
                            <td>
                                <input id="tbLonNhat" name={"fLonNhat"} className="thongkeb1button" type="text"
                                       placeholder="Lớn nhất" value={fLonNhat} onChange={onChangefLonNhat}/>
                            </td>
                        </tr>

                        <tr>
                            <td>Thương hiệu:</td>
                            <td>
                                <input id="tbThuongHieu" value={fThuongHieu} name={"fThuongHieu"}
                                       className="thongkeb1button" type="text"
                                       placeholder="Thương hiệu" onChange={onChangefThuongHieu}/>
                            </td>
                        </tr>
                    </table>
                </Paper>
                <Paper className={"myshadow"} elevation={3} variant={"outlined"}
                       style={{width: '75%', margin: '1rem', padding: '1rem'}}>

                    <div className="tablecontainer " style={{display: 'flex'}}>
                        <table style={{width: '100%'}}>
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
                                <th className="size-th" colSpan={2}>Thao tác</th>
                            </tr>
                            </thead>
                            <tbody style={{}} id="tableTaiKhoan">
                            <Table/>
                            </tbody>
                        </table>
                    </div>


                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={btnPhanTrangPrev} className="thongkeb1button">PREV</button>
                        <div id="listbtnPhanTrang" style={{display: 'flex'}}>
                            {
                                phanTrang()
                            }
                        </div>
                        <button onClick={btnPhanTrangNext} className="thongkeb1button">NEXT</button>
                    </div>


                    <div id="CrudThemSua" className="themsuaxoa">
                        <div onClick={btnExit} id="btnExit" style={{direction: 'rtl'}}><i
                            className="far fa-times-circle"
                            style={{
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}/>
                        </div>
                        <h3 id="lbTitle">Thêm hàng</h3>
                        <div style={{display: 'flex'}}>
                            <div className={"tableCrudThemSua"} style={{width: '60%'}}>
                                <table>
                                    {
                                        aMaHang ? <tr>
                                            <td>
                                                <h4>Mã hàng:</h4>
                                            </td>
                                            <td>
                                                <p>{aMaHang ? aMaHang : ""}</p>
                                            </td>
                                        </tr> : ""
                                    }
                                    <tr>
                                        <td>
                                            <h4>Tên hàng:</h4>
                                        </td>
                                        <td>
                                            <input id="tbTenHang" name={"aTenHang"} value={aTenHang}
                                                   className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                                   onChange={onChangeaTenHang} type="text"
                                                   placeholder="Nhập tên hàng"/></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Giá cũ:</h4>
                                        </td>
                                        <td>
                                            <input id="tbGiaCu" name={"aGiaCu"} value={aGiaCu} onChange={onChangeaGiaCu}
                                                   className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                                   type="text" placeholder="Nhập giá cũ"/></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Giá mới:</h4>
                                        </td>
                                        <td>
                                            <input id="tbGiaMoi" name={"aGiaMoi"} value={aGiaMoi}
                                                   className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                                   onChange={onChangeaGiaMoi} type="text" placeholder="Nhập giá mới"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Thương hiệu:</h4>
                                        </td>
                                        <td>
                                            <input id="tbThuongHieu_" name={"aThuongHieu"} value={aThuongHieu}
                                                   onChange={onChangeaThuongHieu} type="text"
                                                   className={"thongkeb1button"} style={{padding: '0.5rem'}}
                                                   placeholder="Nhập thương hiệu"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Hình đại diện: </h4>
                                        </td>
                                        <td>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                component="label"
                                                htmlFor="files"
                                                startIcon={<SaveIcon/>}
                                            >
                                                Select Image
                                                <input id="files" accept="image/*" style={{display: 'none'}}
                                                       onChange={(e) => {
                                                           uploadImage(e);
                                                       }} type="file"/>
                                            </Button>
                                        </td>
                                    </tr>
                                </table>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: '0.5rem'
                                }}>

                                    <div hidden={!openAnhHienTai} style={{width: '40%'}}>
                                        <div>Ảnh hiện tại</div>
                                        <img style={{width: '100%'}} src={"./" + aHinhDaiDien}/>
                                    </div>
                                    {
                                        upUploadImage ? <div style={{width: '40%'}}>
                                            <div>Ảnh vừa upload</div>
                                            <img style={{width: '100%'}} src={upUploadImage}/></div> : <div></div>
                                    }


                                </div>

                                <div style={{height: '2rem', color: 'red'}} id="lbThongBao"/>
                            </div>
                            <div style={{borderLeft: '1px solid #000', margin: '0 2rem', height: '500px'}}/>
                            <div style={{width: '40%'}}>
                                <h5>Mô tả: <br/><br/><textarea id="tbMota" style={{
                                    width: '100%',
                                    borderRadius: '0.4rem',
                                    height: '10rem',
                                    backgroundColor: '#c8cbcf'
                                }} name={"aMoTa"} value={aMoTa} onChange={onChangeaMoTa} placeholder="Nhập mô tả"
                                                               defaultValue={""}/></h5>
                                <ComboBoxTheLoai value={aTheLoai} currentCTTheLoai={setaTheLoai}/>
                            </div>
                        </div>
                        <div id="btnContainer" className="thongkec1 thongkeb1">
                            <button style={{display: AddOrUpdate === 1 ? "block" : "none"}} onClick={btnXacNhanThem}
                                    className="thongkeb1button" type="button">Xác nhận
                            </button>
                            <button style={{display: AddOrUpdate === 0 ? "block" : "none"}} onClick={btnXacNhanSua}
                                    className="thongkeb1button" type="button">Xác nhận sửa
                            </button>
                        </div>
                        {/*                <input type="button" onclick="okok()" value="okok">*/}
                    </div>
                </Paper>
            </div>
        </section>
    );
}


export default Hang;