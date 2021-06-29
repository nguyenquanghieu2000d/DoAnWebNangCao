// import {}

import * as types from "../constants/ActionTypes"

let initialState = ""


const myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_LIST_PRODUCT:
            return action.data;
        default:
            return state;
    }
};
export default myReducers;