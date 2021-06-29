import React, {useState} from 'react';

import ListTheLoai from "./ListTheLoai/ListTheLoai";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../constants/ActionTypes"
import {Slider, TextField, Tooltip} from "@material-ui/core";
import {convertToVND} from "../../../assets/js/tools";
import {getListHangFilter} from "../../../constants/jsContants";
import ListChip from "./ListChip";

function TimKiemFilter() {

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(1000000)
    const [tbTenHang, setTbTenHang] = useState("")

    const filterTrangPhuc = useSelector(state => state.filterTrangPhuc)
    const reRenderFilterTK = useSelector(state => state.reRenderFilterTimKiem)
    const dispatch = useDispatch()
    
    const [value, setValue] = React.useState([0, 1000000]);


    const onChangetbUsername = (event) => {
        onChange(event, setTbTenHang)
    }

    const onChange = (event, setFunction) => {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setFunction(value)
    }
    
    
    const handleChange = (event, newValue) => {
        setMin(newValue[0])
        setMax(newValue[1])
        setValue(newValue);
        // alert("Hello")
    };

    function valuetext(value) {
        return value;
    }

    const onDispatchChange = (e) => {
        e.preventDefault()
        let temp = filterTrangPhuc
        temp.gia_cu = parseInt(max);
        temp.gia_moi = parseInt(min);
        // dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
        dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
        dispatch({type: actions.RE_RENDER_FILTER_TK, data: !reRenderFilterTK})
        window.scrollTo(0,0)
        // getListHangFilter(filterTrangPhuc, dispatch)
    }

    function ValueLabelComponent(props) {
        const {children, open, value} = props;

        return (
            <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
                {children}
            </Tooltip>
        );
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // alert(tbTenHang)
            const temp = filterTrangPhuc;
            temp.ten_hang = tbTenHang

            dispatch({type: actions.FILTER_TRANG_PHUC, data: ""})
            dispatch({type: actions.FILTER_TRANG_PHUC, data: temp})
            dispatch({type: actions.RE_RENDER_FILTER_TK, data: !reRenderFilterTK})
        }
    }

    return (
        <div id="section2shop_item1">
            <h1>
                TÌM KIẾM
            </h1>



            <ListChip/>
            <br/>
            <TextField onKeyDown={_handleKeyDown} onChange={onChangetbUsername} id="outlined-search" label="Nhập để tìm kiếm" type="search" variant="outlined" />
            <h1 style={{padding:'2rem'}}>
                DANH MỤC
            </h1>
            <ListTheLoai/>

            <h1>
                TÌM KIẾM
            </h1>
            <h3>GIÁ</h3>
            <Slider style={{zIndex: 10}}
                    value={value}
                    ValueLabelComponent={ValueLabelComponent}
                    onChange={handleChange}
                    scale={(x) => {
                        return convertToVND(x)
                    }}
                    aria-labelledby="range-slider"
                    valueLabelDisplay="on"
                    getAriaValueText={valuetext}
                    min={10000}
                    max={1000000}
            />
            <button style={{width:'50%', height:50}} className={"button_a"} onClick={onDispatchChange} >Xác nhận giá</button>

            {/*<hr/>*/}
            {/*<h3>MÀU</h3>*/}
            {/*<label>Chọn màu: <input className="color" type="color"/></label>*/}
            {/*/!*            <select class="minimal">*!/*/}
            {/*/!*                <option>Đỏ</option>*!/*/}
            {/*/!*                <option>Xanh Lam</option>*!/*/}
            {/*/!*                <option>Xanh Lá</option>*!/*/}
            {/*/!*            </select>*!/*/}
            {/*<hr/>*/}
            {/*<h3>SIZE</h3>*/}
            {/*<select>*/}
            {/*    <option>S</option>*/}
            {/*    <option>M</option>*/}
            {/*    <option>L</option>*/}
            {/*</select>*/}
            {/*/!*            <div class="size">*!/*/}
            {/*/!*                <input type="button" value="XS">*!/*/}
            {/*/!*                <input type="button" value="S">*!/*/}
            {/*/!*                <input type="button" value="M">*!/*/}
            {/*/!*                <input type="button" value="L">*!/*/}
            {/*/!*                <input type="button" value="XL">*!/*/}
            {/*/!*                <input type="button" value="XXL">*!/*/}
            {/*/!*            </div>*!/*/}
            {/*<hr/>*/}
            {/*<h3>BRAND</h3>*/}
            {/*<ul>*/}
            {/*    <li><a href="#">Gucci</a></li>*/}
            {/*    <hr/>*/}
            {/*    <li><a href="#">Elise</a></li>*/}
            {/*    <hr/>*/}
            {/*    <li><a href="#">SYO FASHION</a></li>*/}
            {/*    <hr/>*/}
            {/*    <li><a href="#">DE LEAH</a></li>*/}
            {/*    <hr/>*/}
            {/*</ul>*/}
        </div>
    );
}

export default TimKiemFilter;