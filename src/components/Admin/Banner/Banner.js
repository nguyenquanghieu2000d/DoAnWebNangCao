import React, {useEffect, useState} from 'react';
import $ from "jquery";
import Loading from "../DungChung/Loading";
import {HangAPI} from "../../../api/hangAPI";
import {TheLoaiAPI} from "../../../api/theloaiAPI";
import {BannerAPI} from "../../../api/bannerAPI";
import {Button, Paper} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save"

function Banner() {
    const [fMaHang, setfMaHang] = useState("")
    const [fTenHang, setfTenHang] = useState("")
    const [fMoTa, setfMota] = useState("")
    const [fLink, setfLink] = useState("")
    const [fisSlide, setfisSlide] = useState("")


    const [aMaHang, setaMaHang] = useState("")
    const [aTenHang, setaTenHang] = useState("")
    const [aMoTa, setaMota] = useState("")
    const [aLink, setaLink] = useState("")
    const [aImage, setaImage] = useState("")
    const [aisSlide, setaisSlide] = useState("")
    const [upUploadImage, setUploadImage] = useState("")


    const [numrow, setNumrow] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [numpage, setNumpage] = useState(0)
    const [table, setTable] = useState("")
    const [AddOrUpdate, setAddOrUpdate] = useState("")
    const [openAnhHienTai, setOpenAnhHienTai] = useState(true);
    const onChangeaTenHang = (e) => {
        setaTenHang(e.target.value)
    }

    const onChangeaMota = (e) => {
        setaMota(e.target.value)
    }

    const onChangeaLink = (e) => {
        setaLink(e.target.value)
    }

    const onChangeaImage = (e) => {
        setaImage(e.target.value)
    }


    const onChangeaisSlide = (e) => {
        setaisSlide(e.target.value)
    }

    const onChangefMaHang = (e) => {
        setfMaHang(e.target.value)
    }
    const onChangefTenHang = (e) => {
        setfTenHang(e.target.value)
    }

    const onChangefisSlide = (e) => {
        setfisSlide(e.target.value)
    }


    const onChangefMota = (e) => {
        setfMota(e.target.value)
    }
    const onChangefLink = (e) => {
        setfLink(e.target.value)
    }


    const getData3 = (ma_hang) => {
        const result_data = {
            "ma_banner": ma_hang,
            "ten_banner": "",
            "mo_ta": aMoTa,
            "link": aLink,
            "isSlide": aisSlide
        }
        return result_data
    }

    const getData2 = () => {
        const result_data = {
            "ma_banner": aMaHang,
            "ten_banner": aTenHang,
            "mo_ta": aMoTa,
            "link": aLink,
            "image": upUploadImage,
            "isSlide": aisSlide
        }
        return result_data
    }

    const getData = () => {
        const result_data = {
            "ma_banner": fMaHang,
            "ten_banner": fTenHang,
            "mo_ta": fMoTa,
            "link": fLink,
            "isSlide": fisSlide
        }
        return result_data
    }


    const btnThemKhachHang = async (e) => {
        e.preventDefault();
        clear1();
        $("#CrudThemSua").css("display", "flex");
        $("#lbTitle").text("Thêm banner");
        await setAddOrUpdate(1)

        $("#lbMaTheLoai").css("display", "none");
        setOpenAnhHienTai(false);
    }


    const btnExit = () => {
        $("#CrudThemSua").hide();
    }

    const Edit = async (ma_the_loai) => {
        $("#CrudThemSua").css("display", "flex");
        $("#lbTitle").text("Sửa banner");
        $("#lbMaTheLoai").css("display", "block");
        $("#lbThongBao").text("");
        const response = await BannerAPI.getBannerById(ma_the_loai)
        let res = response[0];
        await setaMaHang(res["ma_banner"])
        await setaTenHang(res["ten_banner"])
        await setaMota(res["mo_ta"])
        await setaLink(res["link"])
        await setaImage(res["image"])
        await setaisSlide(res["isSlide"])
        // alert(JSON.stringify(res))
        setOpenAnhHienTai(true);
        await setAddOrUpdate(0)
    }


    const Del = async (ma_the_loai) => {

        const response = await BannerAPI.deleteBanner(ma_the_loai)
        alert("Xóa thành công");
        phanTrang();
        preLoad();

    }


    const clear = () => {
        setfMaHang("")
        setfTenHang("")
        setfisSlide("")
        setfLink("")
        setfMota("")
    }

    const clear1 = () => {
        setaMaHang("")
        setaTenHang("")
        setaisSlide("")
        setaLink("")
        setaMota("")
    }

    const btnXacNhanThem = async () => {
        const data = getData2()
        // alert(JSON.stringify(data))
        const response = await BannerAPI.postBanner(data)
        if (response) {
            alert("Thêm banner thành công")
            setUploadImage("")
            $("#CrudThemSua").css("display", "none");
            await preLoad()
        }
    }

    const btnXacNhanSua = async (ma_hang) => {
        const data = getData2()

        // alert(JSON.stringify(data))
        const response = await BannerAPI.putBanner(data)
        if (response) {
            // alert(JSON.stringify(response))
            alert("Sửa thành công");
            $("#CrudThemSua").css("display", "none");
            setUploadImage("")
            await phanTrang();
            await preLoad();
            clear1()
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
                                    <p className="ThanhCongTruSo">{value.ma_banner}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.ten_banner}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.mo_ta.length < 30 ? value.mo_ta : value.mo_ta.substr(0,30) + "..." }</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.link}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <img style={{width: '100%'}} src={"./" + value.image}/>
                                    {/*<p style={{textAlign: 'center'}}>{value.image}</p>*/}
                                </td>
                                <td style={{width: "10rem"}}>
                                    {value.isSlide === "0" ? "Banner" : "Slide"}

                                </td>
                                <td style={{width: "5%"}} className="total-col">
                                    <button style={{width: "4rem"}} className="thongkeb1button"
                                            onClick={e => Edit(value.ma_banner)}>Sửa
                                    </button>
                                </td>
                                <td style={{width: "5%"}} className="total-col">
                                    <button style={{width: "4rem"}} className="thongkeb1button"
                                            onClick={e => Del(value.ma_banner)}>Xóa
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
        const response = await BannerAPI.countBanner(data)
        const x = response['so_luong'];
        setNumpage(x)
    };

    const phanTrang = () => {
        if (numpage) {
            const list = []
            const num = parseInt(numpage / numrow) + 1
            for (let i = 1; i <= num; i++) {
                list.push(<button id="btnPhanTrang`+ i + `"
                                  style={{ backgroundColor: currentPage === i ? 'pink' : "#f2f2f2"}}
                                  className="thongkeb1button"
                                  onClick={(e) => getHangPhanTrang(e, i)}>{i}</button>)
            }
            return list;
        }
    }


    const btnPhanTrangPrev = () => {
        if (getHangPhanTrang(undefined, currentPage - 1) <= 0) {

        }
    }

    const btnPhanTrangNext = () => {
        if (getHangPhanTrang(undefined, currentPage + 1) === 0)
            setCurrentPage(currentPage - 1);
    }


    const preLoad = async () => {
        await getNumOfTaiKhoan()
        await getHangPhanTrang(undefined, 1)
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
        const response = await BannerAPI.getBannerPaging(data, take, skip)
        // alert(JSON.stringify(response))
        setTable(response);
        setCurrentPage(num)
        return 1;
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
    }, []);


    return (
        <section>
            <h1 style={{textAlign: 'center'}}>QUẢN LÝ BANNER</h1>
            <div style={{display: 'flex', width: '100%'}}>
                <Paper id={"filter"} className={"myshadow"} elevation={3} variant="outlined"
                       style={{display: 'flex', flexDirection: 'column', margin: '1rem', width: '30%'}}>
                    <h1 style={{textAlign: 'center'}}>Filter</h1>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                        <button id="btnThemKhachHang"
                                className="thongkeb1button"
                                onClick={btnThemKhachHang}>
                            <i className="far fa-plus"/>
                        </button>


                        <button id="clear"
                                onClick={clear}
                                className="thongkeb1button">
                            <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                        </button>
                        <button id="search" className="thongkeb1button"
                                onClick={search}>
                            <i className="far fa-search" style={{fontSize: '1rem'}}/>
                        </button>
                    </div>
                    <table style={{backgroundColor: 'white'}}>
                        <tr>
                            <td>Mã banner:</td>
                            <td>
                                <input name={"fMaHang"} value={fMaHang} onChange={onChangefMaHang}
                                       className="thongkeb1button" type="text" placeholder="Mã banner"/>
                            </td>

                        </tr>
                        <tr>
                            <td>Tên banner:</td>
                            <td>
                                <input name={"fTenHang"} value={fTenHang} onChange={onChangefTenHang}
                                       className="thongkeb1button" type="text" placeholder="Tên banner"/>
                            </td>

                        </tr>
                        <tr>
                            <td>Mô tả</td>
                            <td>
                                <input name={"fMoTa"} value={fMoTa} onChange={onChangefMota}
                                       className="thongkeb1button" type="text" placeholder="Mô tả"/>
                            </td>

                        </tr>
                        <tr>
                            <td>Link</td>
                            <td>
                                <input name={"fLink"} value={fLink} onChange={onChangefLink}
                                       className="thongkeb1button" type="text" placeholder="Link"/>
                            </td>

                        </tr>

                        <tr>
                            <td>Loại</td>
                            <td>
                                <select value={fisSlide} className="thongkeb1button" onChange={onChangefisSlide}>
                                    <option value={""}> Tất cả</option>
                                    <option value={"1"}>Slide</option>
                                    <option value={"0"}>Banner</option>
                                </select>
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
                                <th style={{width: '10rem'}} className="quy-th">Mã banner</th>
                                <th style={{width: '10rem'}} className="size-th">Tên banner</th>
                                <th style={{width: '10rem'}} className="quy-th">Mô tả</th>
                                <th style={{width: '10rem'}} className="size-th">Link</th>
                                <th style={{width: '10rem'}} className="size-th">Hình ảnh</th>
                                <th style={{width: '10rem'}} className="size-th">Loại</th>
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
                            className="far fa-times-circle" style={{
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}/></div>
                        <h3 id="lbTitle">Thêm banner</h3>
                        <div className={"tableCrudThemSua"}>

                            <table>{
                                aMaHang ? <tr>
                                    <td>
                                        <h4>Mã banner:</h4>
                                    </td>
                                    <td>
                                        <div id="lbMaTheLoai"
                                             style={{fontWeight: 'bold'}}>{aMaHang ? aMaHang : ""}</div>
                                    </td>
                                </tr> : ""
                            }

                                <tr>
                                    <td>
                                        <h4>Tên banner:</h4>
                                    </td>
                                    <td>
                                        <input id="tbTenTheLoai" className={"thongkeb1button"}
                                               style={{padding: '0.5rem'}} name={"aTenHang"} value={aTenHang}
                                               onChange={onChangeaTenHang} type="text"
                                               placeholder="Nhập tên banner"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Mô tả:</h4>
                                    </td>
                                    <td>
                                        <input name={"aMoTa"} className={"thongkeb1button"}
                                               style={{padding: '0.5rem'}} value={aMoTa} onChange={onChangeaMota}
                                               type="text" placeholder="Nhập mô tả"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Link:</h4>
                                    </td>
                                    <td>
                                        <input name={"aLink"} className={"thongkeb1button"}
                                               style={{padding: '0.5rem'}} value={aLink} onChange={onChangeaLink}
                                               type="text" placeholder="Nhập link"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Loại:</h4>
                                    </td>
                                    <td>
                                        <select value={aisSlide} className={"thongkeb1button"}
                                                onChange={onChangeaisSlide}>

                                            <option value={""}>Chưa chọn</option>
                                            <option value={"1"}>Slide</option>
                                            <option value={"0"}>Banner</option>
                                        </select></td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Hình ảnh:</h4>
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
                                    <img style={{width: '100%'}} src={"./" + aImage}/>
                                </div>
                                {
                                    upUploadImage ? <div style={{width: '40%'}}>
                                        <div>Ảnh vừa upload</div>
                                        <img style={{width: '100%'}} src={upUploadImage}/></div> : <div></div>
                                }


                            </div>


                            <div style={{height: '2rem', color: 'red'}} id="lbThongBao"/>
                        </div>
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


export default Banner;