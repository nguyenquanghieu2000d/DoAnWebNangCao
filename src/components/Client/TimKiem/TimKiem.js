import React from 'react';
import "../../../assets/css/Client/TimKiem/TimKiem.css"
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../constants/ActionTypes";
import TimKiemFilter from "./TimKiemFilter";
import ListSanPhamFilter from "./ListSanPhamFilter";
import GeneralBanner from "../../DungChung/GeneralBanner";

function TimKiem() {
    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)
    const dispatch = useDispatch()
    const ThemNuaNheOnclick = (e) => {
        e.preventDefault();
        let temp = filterTrangPhuc
        temp.numget = parseInt(temp.numget) + 12;
        dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
        dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
    }


    return (
        <div>
            <GeneralBanner text="SHOP"/>
            <section id="section2shop">
                <div id="section2shopcontainer">
                    <TimKiemFilter/>
                    <div style={{width: '75%'}}>
                        <div id="section2shop_item2">
                            <ListSanPhamFilter gridItemPerColumn={3}/>
                        </div>
                        <div id="ButtonThemNua">
                            <button className="themnua button_a" onClick={ThemNuaNheOnclick}>THÊM NỮA NHÉ</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TimKiem;