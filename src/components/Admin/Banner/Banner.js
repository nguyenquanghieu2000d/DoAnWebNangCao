import React, {useEffect, useState} from 'react';
import $ from "jquery";
import Loading from "../DungChung/Loading";
import {HangAPI} from "../../../api/hangAPI";
import {TheLoaiAPI} from "../../../api/theloaiAPI";
import {BannerAPI} from "../../../api/bannerAPI";
import {Button} from "@material-ui/core";
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
        await setaMaHang("")
        await setaTenHang("")
        $("#CrudThemSua").toggle();
        $("#lbTitle").text("Thêm banner");
        await setAddOrUpdate(1)

        $("#lbMaTheLoai").css("display", "none");
        setOpenAnhHienTai(false);
    }


    const btnExit = () => {
        $("#CrudThemSua").hide();
    }

    const Edit = async (ma_the_loai) => {
        $("#CrudThemSua").toggle();
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
                                    <p style={{textAlign: 'center'}}>{value.mo_ta}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <p style={{textAlign: 'center'}}>{value.link}</p>
                                </td>
                                <td style={{width: "10rem"}}>
                                    <img style={{width:'100%'}} src={"./" + value.image} />
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
                                  style={{width: "25%", backgroundColor: currentPage === i ? 'pink' : "gray"}}
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
        await getHangPhanTrang(undefined,1);
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

            <div style={{display: 'flex'}}>
                <div style={{width: '100%'}} className="quanlyhangcontainer">
                    <div style={{display: 'flex'}}>
                        <button  id="btnThemKhachHang"
                                className="thongkeb1button"
                                onClick={btnThemKhachHang}>
                            <i className="far fa-plus"/>
                        </button>
                        <input  name={"fMaHang"} value={fMaHang} onChange={onChangefMaHang}
                               className="thongkeb1button" type="text" placeholder="Mã banner"/>
                        <input name={"fTenHang"} value={fTenHang} onChange={onChangefTenHang}
                               className="thongkeb1button" type="text" placeholder="Tên banner"/>
                        <input  name={"fMoTa"} value={fMoTa} onChange={onChangefMota}
                               className="thongkeb1button" type="text" placeholder="Mô tả"/>
                        <input  name={"fLink"} value={fLink} onChange={onChangefLink}
                               className="thongkeb1button" type="text" placeholder="Link"/>
                       <select value={fisSlide} onChange={onChangefisSlide}>
                           <option value={""}> Tất cả</option>
                           <option value={"1"} >Slide</option>
                           <option value={"0"} >Banner</option>
                       </select>
                        <button  id="clear"
                                onClick={clear}
                                className="thongkeb1button">
                            <i className="far fa-backspace" style={{fontSize: '1rem'}}/>
                        </button>
                        <button  id="search" className="thongkeb1button"
                           onClick={search}>
                            <i className="far fa-search" style={{fontSize: '1rem'}}/>
                        </button>
                    </div>
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
                        <h3 id="lbTitle">Thêm banner</h3>
                        <div style={{display: 'flex'}}>
                            <div style={{width: '100%'}}>
                                <div id="lbMaTheLoai" style={{fontWeight: 'bold'}}>{aMaHang? aMaHang : "Mã mã banner:"}</div>
                                <h5>Tên banner:
                                    <input id="tbTenTheLoai" name={"aTenHang"} value={aTenHang} onChange={onChangeaTenHang} type="text" placeholder="Nhập tên banner"/>
                                </h5>
                                <h5>Mô tả:
                                    <input  name={"aMoTa"} value={aMoTa} onChange={onChangeaMota} type="text" placeholder="Nhập mô tả"/>
                                </h5>
                                <h5>Link:
                                    <input  name={"aLink"} value={aLink} onChange={onChangeaLink} type="text" placeholder="Nhập link"/>
                                </h5>
                                <h5>
                                    Loại:
                                    <select value={aisSlide} onChange={onChangeaisSlide}>
                                        <option value={"1"} >Slide</option>
                                        <option value={"0"} >Banner</option>
                                    </select>
                                </h5>



                                <div>Hình ảnh:
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        component="label"
                                        htmlFor="files"
                                        startIcon={<SaveIcon/>}
                                    >
                                        Select Image
                                        <input id="files" accept="image/*" style={{display: 'none'}} onChange={(e) => {
                                            uploadImage(e);
                                        }} type="file"/>
                                    </Button>
                                </div>
                                <div style={{display:'flex',justifyContent:'space-between', width:'100%',padding:'0.5rem'}}>

                                    <div  hidden={!openAnhHienTai} style={{width:'40%'}}>
                                        <div>Ảnh hiện tại</div>
                                        <img style={{width:'100%'}} src={"./" + aImage} />
                                    </div>
                                    {
                                        upUploadImage ? <div style={{width:'40%'}}><div>Ảnh vừa upload</div><img style={{width:'100%'}}  src={upUploadImage} />  </div>: <div></div>
                                    }


                                </div>



                                <div style={{height: '2rem', color: 'red'}} id="lbThongBao"/>
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
                    </div>
                </div>
            </div>
        </section>
    );
}


export default Banner;