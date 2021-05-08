import React from 'react';

function BannerItem(props) {
    const data = props.data

    return (
        <a href="#">
            <img src={data.image} alt=""/>
            <h3>{data.title}</h3>
            <p>{data.content}</p>
            <h1>{data.type}</h1>
        </a>
    );
}

export default BannerItem;