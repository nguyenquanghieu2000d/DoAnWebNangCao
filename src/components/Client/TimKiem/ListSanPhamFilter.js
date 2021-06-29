import React, {useEffect} from 'react';
import ListProduct from "../../DungChung/ListProduct";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../constants/ActionTypes"
import {getListHangFilter} from "../../../constants/jsContants";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Loading from "../../DungChung/Loading";
import {useLocation, useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function ListSanPhamFilter(props) {
    // const test_redux = useSelector(state => state.test)
    const classes = useStyles();
    const gridItemPerColumn = props.gridItemPerColumn

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const navigate = useNavigate();
    //
    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)
    const filterListProduct = useSelector(state => state.filterListProduct)
    const dispatch = useDispatch()
    //
    // const kkkk = (filterTrangPhuc, navigate) => {
    //     let interval = null;
    //     const LoadingUrl = () => {
    //         if (filterTrangPhuc) {
    //             const url = Object.keys(filterTrangPhuc).map(function (k) {
    //                 return encodeURIComponent(k) + '=' + encodeURIComponent(filterTrangPhuc[k])
    //             }).join('&')
    //             navigate("/app/timkiem?" + url)
    //             stopStuff()
    //         }
    //     }
    //
    //     function startStuff(func, time) {
    //         interval = setInterval(func, time);
    //     }
    //
    //     function stopStuff() {
    //         clearInterval(interval);
    //     }
    //     // startStuff(LoadingUrl, 500)
    // }


    const handleChange = (event) => {
        event.preventDefault();
        let temp = filterTrangPhuc
        temp.order = parseInt(event.target.value)
        dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
        dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})

    };


    useEffect(() => {
        getListHangFilter(filterTrangPhuc, dispatch)
    },[
        filterTrangPhuc.ma_hang,
        filterTrangPhuc.ten_hang,
        filterTrangPhuc.gia_moi,
        filterTrangPhuc.gia_cu,
        filterTrangPhuc.thuong_hieu,
        filterTrangPhuc.ma_the_loai,
        filterTrangPhuc.ma_loai,
        filterTrangPhuc.numget,
        filterTrangPhuc.order,

    ])
    return (
        <>
            {filterTrangPhuc ? <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <p>Đang hiển thị {filterTrangPhuc.numget} kết quả đầu tiên</p>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Sắp xếp theo</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={filterTrangPhuc.order}
                        onChange={(e) => handleChange(e)}
                        label="Sắp xếp theo"
                    >
                        <MenuItem value={0}>
                            <em>Sắp xếp theo</em>
                        </MenuItem>
                        <MenuItem value={1}>Giá từ thấp đến cao</MenuItem>
                        <MenuItem value={2}>Giá từ cao xuống thấp</MenuItem>
                    </Select>
                </FormControl>
            </div> : <Loading/>
            }
            {
                filterListProduct ? <ListProduct gridItemPerColumn={gridItemPerColumn} data={filterListProduct}/> :
                    <div/>
            }
        </>

    );
}


export default ListSanPhamFilter;