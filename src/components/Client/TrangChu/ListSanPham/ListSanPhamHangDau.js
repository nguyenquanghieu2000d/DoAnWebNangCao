import React, {useEffect, useState} from 'react';
import ListProduct from "../../../DungChung/ListProduct";
import {HangAPI} from "../../../../api/hangAPI";

function ListSanPhamHangDau(props) {
    const gridItemPerColumn = props.gridItemPerColumn
    const [ListProductData, setListProductData] = useState()


    const GetHangByCategory = async () => {
        const data = "CT0001"
        const response = await HangAPI.getHangByCategory(
            data
        );
        // alert(JSON.stringify(response))
        setListProductData(response)
    }

    useEffect(() => {
        GetHangByCategory()
    }, [])
    return (
        <>
            {
                ListProductData?<ListProduct gridItemPerColumn={gridItemPerColumn} data={ListProductData}/>:<div/>
            }
        </>

    );
}

export default ListSanPhamHangDau;