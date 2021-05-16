import axios from "axios";
import React from "react";
import {CircularProgress} from "@material-ui/core";
import WallpaperIcon from '@material-ui/icons/Wallpaper';



export async function fetchPostList(url, setFunction, setLoading){
     await axios.get( url)
        .then(result => {
            setFunction(result.data);
            if (setLoading !== 0)setLoading(true)
            // setLoading(false);
        })
        .catch(error => {
            console.log('error', error)
        });
}

export const url = "http://localhost:8000"
export const reacturl = "http://localhost:3000"
export const loading = () => <div style={{height:'100%', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}><CircularProgress /></div>
export const waitingImage = (props) =>
    <div style={{height:'100%', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'darkgray'}}>
        <div>
            {props.icon}
        </div>
        <div>

        </div>
    </div>

// Fake data

const error_json = [{

    "thiet_bi_loi": "Cột",
    "ma_tuyen": "171e39-171e10.2",
    "toa_do_vi_tri":"35.32424, 102.4235",
    "mo_ta": "Vết nứt rạn, gỉ sét, sụt lún"
},
    {
        "thiet_bi_loi": "Sứ",
        "ma_tuyen": "171e39-171e10.2",
        "toa_do_vi_tri":"35.32424, 102.4235",
        "mo_ta": "Vết nứt rạn, gỉ sét, sụt lún"
    },
    {
        "thiet_bi_loi": "Cột",
        "ma_tuyen": "171e39-171e10.2",
        "toa_do_vi_tri":"35.32424, 102.4235",
        "mo_ta": "Vết nứt rạn, gỉ sét, sụt lún"
    },
    {
        "thiet_bi_loi": "Cột",
        "ma_tuyen": "172e10.2-171e24.4",
        "toa_do_vi_tri":"35.32424, 102.4235",
        "mo_ta": "Vết nứt rạn, gỉ sét, sụt lún"
    },
    {
        "thiet_bi_loi": "Cột",
        "ma_tuyen": "172e10.2-171e24.4",
        "toa_do_vi_tri":"35.32424, 102.4235",
        "mo_ta": "Vết nứt rạn, gỉ sét, sụt lún"
    },
    {
        "thiet_bi_loi": "Cột",
        "ma_tuyen": "172e10.2-171e24.4",
        "toa_do_vi_tri":"35.32424, 102.4235",
        "mo_ta": "Vết nứt rạn, gỉ sét, sụt lún"
    }]
