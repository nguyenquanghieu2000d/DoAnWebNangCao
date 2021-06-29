import React, {useEffect, useState} from 'react';
import {CtTheloaiAPI} from "../../../../api/cttheloaiApi";
import CtTheLoaiItem from "./CtTheLoaiItem";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../../constants/ActionTypes";

function ListTheLoaiItem(props) {
    const data = props.data;
    const [ListCtTheLoaiData, setListCtTheLoaiData] = useState("")


    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)
    const dispatch = useDispatch()


    const onDispatchChange = () => {
        let temp = filterTrangPhuc
        temp.ma_the_loai = data.ma_the_loai
        dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
        dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
    }

    const ListTheLoaiItemOnClick = (event) => {
        event.preventDefault()
        onDispatchChange()
    }

    const getListTheLoai = async () => {
        if (data) {
            const response = await CtTheloaiAPI.getCtTheLoai(data.ma_the_loai)
            // alert(response)
            setListCtTheLoaiData(response)
        }

    }

    useEffect(() => {
        if (!ListCtTheLoaiData)
            getListTheLoai()
    })

    const onMouseHover = (e, id) => {
        e.preventDefault();
        const ele = document.getElementById(id)
        ele.style.display = "block"
    }
    const onMouseUnHover = (e, id) => {
        e.preventDefault();
        const ele = document.getElementById(id)
        ele.style.display = "none"
        // alert(1)
    }

    return (
        <li onMouseEnter={(e) => onMouseHover(e, data.ma_the_loai)}
            onMouseLeave={(e) => onMouseUnHover(e, data.ma_the_loai)}
            className="section2shop_item1_" onClick={ListTheLoaiItemOnClick}>
            <div
                className={"onDivhover"}>{data.ten_loai}</div>
            <div id={data.ma_the_loai} className={"divhover"}>
                {
                    ListCtTheLoaiData ? ListCtTheLoaiData.map((value, index) => {
                        return <CtTheLoaiItem ma_the_loai={data.ma_the_loai} data={value}/>
                    }) : <div/>
                }
            </div>
            <hr/>
        </li>
    );
}

export default ListTheLoaiItem;