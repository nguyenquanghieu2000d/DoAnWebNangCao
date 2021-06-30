// import {}

import * as types from "../constants/ActionTypes"
const localstorage = window.localStorage;

let initialState = ""

try{
    initialState = JSON.parse(localstorage.getItem(process.env.REACT_APP_USER_PROFILE));
} catch (e){
    console.log(e)
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