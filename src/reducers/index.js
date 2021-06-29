import {combineReducers} from "redux"
import userProfile from "./username";
import filterTrangPhuc from "./filterTrangPhuc";
import filterListProduct from "./filterListProduct";
import test from "./test";
import listGiohang from "./listGiohang";
import reRenderGiohang from "./reRenderGiohang";
import tongTienThanhToan from "./tongTienThanhToan";
const myReducer = combineReducers({
    userProfile,filterTrangPhuc, filterListProduct,test, listGiohang, reRenderGiohang, tongTienThanhToan
});
export default myReducer;