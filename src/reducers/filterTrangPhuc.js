// import {}

import * as types from "../constants/ActionTypes"

export let initialState = {
    "ma_hang": "",
    "ten_hang": "",
    "gia_moi": 0,
    "gia_cu": 900000000,
    "thuong_hieu": "",
    "ma_the_loai": "TL",
    "ma_loai":"CT",
    "numget":12,
    "order":0
}


const myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TRANG_PHUC:
            return action.data;
        default:
            return state;
    }
};
export default myReducers;