// import {}

import * as types from "../constants/ActionTypes"
const localstorage = window.localStorage;

const Json = {
    "username": {
        "HG0001": 4,
        "HG0002": 6
    }
}



let initialState = {}


const myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_GIO_HANG:
            return action.data;
        default:
            return state;
    }
};
export default myReducers;