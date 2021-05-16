// import {}

import * as types from "../constants/ActionTypes"
const localstorage = window.localStorage;

let initialState = ""

try{
    initialState = JSON.parse(localstorage.getItem(process.env.USERPROFILE));
} catch (e){
    alert(e)
}


const myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_PROFILE:
            return action.data;
        default:
            return state;
    }
};
export default myReducers;