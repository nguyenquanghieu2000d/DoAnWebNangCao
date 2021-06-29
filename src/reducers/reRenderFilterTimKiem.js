// import {}

import * as types from "../constants/ActionTypes"
const localstorage = window.localStorage;



let initialState = true


const myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.RE_RENDER_FILTER_TK:
            return action.data;
        default:
            return state;
    }
};
export default myReducers;