import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {convertToVND} from "../../../assets/js/tools";
import * as actions from "../../../constants/ActionTypes";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function ListChip(props) {
    const classes = useStyles();
    const [stringList, setStringList] = useState("")


    const flrTp = useSelector(state => state.filterTrangPhuc)
    const reRenderFilterTK = useSelector(state => state.reRenderFilterTimKiem)
    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)

    const dispatch = useDispatch()

    const handleDelete = (index, value) => () => {
        const temp = filterTrangPhuc
        if (value[0] === "gia_cu"){
            temp.gia_cu = 1000000
            temp.gia_moi = 0
        }
        else if (value[0] === "numget"){
            if(filterTrangPhuc.numget === 12){
                alert("Luôn hiển thị 12 sản phẩm, không xóa nhé")
            }

            else temp.numget = 12
        }
        else if(value[0] === "order" )
            temp.order = 0
        else if(value[0] === "ma_loai"){
            temp.ma_loai = "CT"
            temp.ten_ct_the_loai = ""
        }
        else if (value[0] === "ma_the_loai"){
            temp.ma_the_loai = "TL"
            temp.ten_loai = ""
            temp.ma_loai = "CT"
            temp.ten_ct_the_loai = ""
        }
        else if (value[0] === "ten_hang"){
            temp.ten_hang = ""
        }
        dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
        dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
        dispatch({type: actions.RE_RENDER_FILTER_TK, data: !reRenderFilterTK})
        // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };



    const constMakeFilter = () =>{
        const temp = []
        // alert(JSON.stringify(flrTp))
        let ele1 = ["gia_cu", "Giá " + convertToVND(flrTp.gia_moi) + " - " + convertToVND(flrTp.gia_cu)];
        // if (flrTp.ma_loai) =
        let ele2 = ["numget","Hiển thị " + flrTp.numget + " sản phẩm"]

        if (flrTp.order === 1){
            let ele3 = ["order","Giá từ thấp đến cao"]
            temp.push(ele3)
        }
        else if (flrTp.order === 2 ){
            let ele3 = ["order"+ "Giá từ cao đến thấp"]
            temp.push(ele3)
        }

        if (flrTp.ma_loai !== "CT"){
            let ele4 = ["ma_loai", flrTp.ten_ct_the_loai];
            temp.push(ele4);
        }

        if (flrTp.ma_the_loai !== "TL"){
            let ele5 = ["ma_the_loai",flrTp.ten_loai];
            temp.push(ele5);
        }
        if(flrTp.ten_hang !== ""){
            let ele6 = ["ten_hang",flrTp.ten_hang];
            temp.push(ele6);
        }






        temp.push(ele2)
        temp.push(ele1)
        setStringList(temp)

    }
    useEffect(() => {
        constMakeFilter()
        // alert(JSON.stringify(stringList))
    }, [
        reRenderFilterTK,
        flrTp.numget,
        flrTp.order,
        flrTp.ma_the_loai,
        flrTp.ma_loai,
        flrTp.thuong_hieu,
        flrTp.ten_hang,
        flrTp.ma_hang,
        flrTp.gia_cu,
        flrTp.gia_moi,
        reRenderFilterTK
    ])

    return (
        <Paper component="ul" className={classes.root}>
            {
                stringList ? stringList.map((value, index) => {
                        // encodeURIComponent(k) + '=' +
                        return (<li key={index}>
                            <Chip
                                label={value[1]}
                                onDelete={handleDelete(index, value)}
                                className={classes.chip}
                            />
                        </li>)
                    }) : ""
                }
        </Paper>
    );
}

