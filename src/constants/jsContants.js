import axios from "axios";
import React from "react";
import {HangAPI} from "../api/hangAPI";
import * as actions from "./ActionTypes";


export async function fetchPostList(url, setFunction, setLoading) {
    await axios.get(url)
        .then(result => {
            setFunction(result.data);
            if (setLoading !== 0) setLoading(true)
            // setLoading(false);
        })
        .catch(error => {
            console.log('error', error)
        });
}

export const getListHangFilter = async (filterTrangPhuc, dispatch) => {

    let data = JSON.parse(JSON.stringify(filterTrangPhuc));
    // alert(JSON.stringify(data))
    if (filterTrangPhuc.ma_the_loai && filterTrangPhuc.ma_loai) {
        const ma_the_loai = data.ma_the_loai
        const ma_loai = data.ma_loai
        const numget = data.numget
        const order = data.order
        delete data["numget"]
        delete data['ma_the_loai']
        delete data['ma_loai']
        delete data["order"]
        // alert("snjdfs")
        // alert(data["order"])
        const response = await HangAPI.gethangByFilter(data, ma_the_loai, ma_loai, numget, order)
        dispatch({type: actions.FILTER_LIST_PRODUCT, data: response})
    }
}


export const url = "http://localhost:8000"
export const reacturl = "http://localhost:3000"


