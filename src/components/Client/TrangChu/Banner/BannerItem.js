import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import Box from "@material-ui/core/Box";

function BannerItem(props) {
    const data = props.data;
    const navigate = useNavigate();
    const func = (e,link) => {
        navigate(link)
        window.scrollTo(0,0)
    }

    return (
        <Box style={{cursor:'pointer'}} onClick={(e) => func(e,data.link)}>
            <img src={data.image} alt=""/>
            <h3>{data.ten_banner}</h3>
            <p>{data.mo_ta}</p>
            <h1>Xem ngay</h1>
        </Box>
    );
}

export default BannerItem;