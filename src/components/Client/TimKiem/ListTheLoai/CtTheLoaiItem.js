import React from 'react';
import * as actions from "../../../../constants/ActionTypes";
import {useDispatch, useSelector} from "react-redux";

function CtTheLoaiItem(props) {
    const data = props.data;
    const ma_the_loai = props.ma_the_loai


    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)
    const dispatch = useDispatch()

    const onDispatchChange = () => {
        let temp = filterTrangPhuc
        temp.ma_the_loai = ma_the_loai
        temp.ma_loai = data.ma_loai
        dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
        dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
        // getListHangFilter(filterTrangPhuc, dispatch)
    }

    const ListTheLoaiItemOnClick = (event) => {
        event.preventDefault()
        onDispatchChange()
    }

    return (
        <li onClick={ListTheLoaiItemOnClick}>
            <p>
                {data.ten_ct_the_loai}
            </p>
        </li>
    );
}

export default CtTheLoaiItem;