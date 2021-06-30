import React from 'react';
import '../../../assets/css/Admin/admin.css'
import {Outlet} from "react-router-dom";

function PhanTrang(props) {
    const numOfTaiKhoan = props.numOfTaiKhoan

    const func = () => {
        const list = []
        for (let i = 0; i < 5; i++) {
            list.push(<div>{i}</div>)
        }
        return list;
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <input id="btnPhanTrangPrev" style={{width: '5%'}} className="thongkeb1button" type="button"
                   defaultValue="PREV"/>

            <input id="btnPhanTrangNext" style={{width: '5%'}} className="thongkeb1button" type="button"
                   defaultValue="NEXT"/>
        </div>
    );
}


export default PhanTrang;