// import {}

import * as types from "../constants/ActionTypes"
let initialState = 0

const myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.TONG_TIEN_THANH_TOAN:
            return action.data;
        default:
            return state;
    }
};
export default myReducers;