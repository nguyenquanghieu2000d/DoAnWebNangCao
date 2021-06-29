import React, {useEffect, useState} from 'react';
import {TheloaiAPI} from "../../../../api/theloaiApi";
import ListTheLoaiItem from "./ListTheLoaiItem";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../../constants/ActionTypes";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox, FormControlLabel} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function ListTheLoai() {
    const classes = useStyles();
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
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        <Box
                            style={{ width:'100%',fontSize:'1.2rem'}}
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            Tất cả
                        </Box>
                    </AccordionSummary>
                </Accordion>
                {
                    ListTheLoaiData ? ListTheLoaiData.map((value, index) => {
                        return <ListTheLoaiItem data={value}/>
                    }): ""
                }
            </div>





            {/*<li className="section2shop_item1_" >*/}
            {/*    <div>Tất cả</div>*/}
            {/*    <hr/>*/}
            {/*</li>*/}
            {/*{*/}
            {/*    ListTheLoaiData ? ListTheLoaiData.map((value, index) => {*/}
            {/*        return <ListTheLoaiItem data={value}*/}
            {/*    }) : <div/>*/}
            {/*}*/}
        </ul>
    );
}

export default ListTheLoai;