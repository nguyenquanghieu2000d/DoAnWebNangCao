import React, {useEffect} from 'react';
import {useRoutes} from "react-router-dom";
import routes from './routes';
import {useSelector} from "react-redux";
import {DonHangAPI} from "./api/donhangApi";


function App() {
    const routing = useRoutes(routes);
    const localstorage = window.localStorage;
    const reRenderGioHang = useSelector(state => state.reRenderGiohang)

    const createGiohang = async () => {
        let listGiohang = {};
        const data = localstorage.getItem(process.env.REACT_APP_LIST_GIO_HANG);
        if (!data) {
            localstorage.setItem(process.env.REACT_APP_LIST_GIO_HANG, JSON.stringify(listGiohang))
        }
        const user = localstorage.getItem(process.env.REACT_APP_USER_PROFILE)
        if(user){
            const User = JSON.parse(user)
            // alert("OKOKOK")
            // alert()
            const response1 = await DonHangAPI.ThietLapGioHang(User.username)
        }
    }

    useEffect(() => {
        createGiohang()
    }, [reRenderGioHang])


    return (
        <div>
            {routing}
        </div>

    );
}

export default App;
