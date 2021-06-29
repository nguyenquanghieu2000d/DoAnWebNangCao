// import {}

import * as types from "../constants/ActionTypes"
const localstorage = window.localStorage;

const Json = {
    "username": {
        "HG0001": 4,
        "HG0002": 6
    }
}



let initialState = true


const myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.RE_RENDER_GIO_HANG:
            return action.data;
        default:
            return state;
    }
};
export default myReducers;