import React, {useEffect, useState} from 'react';
import {TheloaiAPI} from "../../../../api/theloaiApi";
import ListTheLoaiItem from "./ListTheLoaiItem";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../../constants/ActionTypes";

function ListTheLoai() {
    const [ListTheLoaiData, setListTheLoaiData] = useState("")
    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)
    const dispatch = useDispatch()

    const getListTheLoai = async () => {
        const response = await TheloaiAPI.getTheLoai()
        setListTheLoaiData(response)
    }

    useEffect(() => {
        if (!ListTheLoaiData)
            getListTheLoai()
    })


    const ListTheLoaiItemOnClick = () => {
        let temp = filterTrangPhuc;

        temp.ma_hang = ""
        temp.order = 0
        temp.ten_hang = ""
        temp.gia_cu = 900000000
        temp.gia_moi = 0
        temp.thuong_hieu = ""
        temp.ma_loai = "CT"
        temp.ma_the_loai = "TL"
        temp.numget = 12
        dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
        dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
    }


    return (
        <ul id="ngothihue">
            <li className="section2shop_item1_" onClick={ListTheLoaiItemOnClick}>
                <div>Tất cả</div>
                <hr/>
            </li>
            {
                ListTheLoaiData ? ListTheLoaiData.map((value, index) => {
                    return <ListTheLoaiItem data={value}/>
                }) : <div/>
            }
        </ul>
    );
}

export default ListTheLoai;