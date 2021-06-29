import React, {useEffect, useState} from 'react';
import {CtTheloaiAPI} from "../../../../api/cttheloaiApi";
import CtTheLoaiItem from "./CtTheLoaiItem";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../../constants/ActionTypes";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import {AccordionDetails} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function ListTheLoaiItem(props) {
    const data = props.data;
    const [ListCtTheLoaiData, setListCtTheLoaiData] = useState("")


    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)
    const dispatch = useDispatch()


    const onDispatchChange = () => {
        let temp = filterTrangPhuc
        temp.ma_the_loai = data.ma_the_loai
        temp.ten_loai = data.ten_loai
        dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
        dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
    }

    const ListTheLoaiItemOnClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
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

        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
            >
                <Box
                    style={{ width:'100%', fontSize:'1.2rem'}}
                    onClick={(event) => ListTheLoaiItemOnClick(event)}
                    onFocus={(event) => event.stopPropagation()}
                >
                    {data.ten_loai}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <div id={data.ma_the_loai} className={"divhover"}>
                    {
                        ListCtTheLoaiData ? ListCtTheLoaiData.map((value, index) => {
                            return <CtTheLoaiItem ten_loai={data.ten_loai} ma_the_loai={data.ma_the_loai} data={value}/>
                        }) : <div/>
                    }
                </div>
            </AccordionDetails>
        </Accordion>

        // <li onMouseEnter={(e) => onMouseHover(e, data.ma_the_loai)}
        //     onMouseLeave={(e) => onMouseUnHover(e, data.ma_the_loai)}
        //     className="section2shop_item1_" onClick={ListTheLoaiItemOnClick}>
        //     <div
        //         className={"onDivhover"}>{data.ten_loai}</div>
        //
        //
        //
        //     <hr/>
        // </li>
    );
}

export default ListTheLoaiItem;