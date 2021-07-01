import React, {useEffect, useState} from 'react';
import BannerItem from "./BannerItem";
import {BannerAPI} from "../../../../api/BannerAPI";

function Banner() {

    const [BannerData, setBannerData] = useState();

    const getBanner = async () => {
        const response = await BannerAPI.getBanner()
        setBannerData(response)
    }

    useEffect(() => {
        getBanner()
    }, [])

    // const BannerData = [
    //     {
    //         image : "Image/slider_5_image.png.jpg",
    //         title: "UP TO 40% OFF NEW COLLECTIONS",
    //         content: "Ưu đãi độc quyền - giảm đến 40% loạt BST mới đến từ các NTK hàng đầu Việt Nam",
    //         type:'Mua ngay'
    //     },
    //     {
    //         image : "Image/sale-123tren-tiki.jpg",
    //         title: "BEST SELLERS CLEARANCE SALE",
    //         content: "Những items được yêu thích nhất tại HHNStore nay đã được ưu đãi lên đến 80%",
    //         type:'Mua ngay'
    //
    //     },
    //     {
    //         image : "Image/64274455_1189417311229093_9078253299605438464_n.jpg",
    //         title: "ƯU ĐÃI ĐỘC QUYỀN ĐẾN TỪ CHIC-LAND",
    //         content: "Ưu đãi độc quyền được áp dụng với những mẫu thiết kế bán chạy nhất tại thương hiệu CHIC-LAND",
    //         type:'Mua ngay'
    //     },
    //     {
    //         image : "Image/20190831090857_22584.png",
    //         title: "HHNStore 'S BIRTHDAY - 50% OFF ALL ITEMS",
    //         content: "HHNStore tri ân khách hàng nhân dịp sinh nhật lần thứ 4 với ưu đãi nửa giá toàn bộ sản phẩm",
    //         type:'Mua ngay'
    //     }
    // ]


    return (
        <div className="showshowcontainer">
            {
                BannerData?BannerData.map(((value, index) =>
                <BannerItem data={value}/>)) : ""
            }
        </div>
    );
}

export default Banner;