import React from 'react'

function Slide1Item(props) {

    const data = props.data;

    return (
        <div className="section1"  id={data.id}>
            <div/>
            <div className="TamgiacContainer">
                <div className="Left">
                    <div className="tamgiac1"/>
                    <div className="tamgiac4"/>
                </div>
                <div className="Right">
                    <div className="tamgiac3"/>
                    <div className="tamgiac2"/>
                </div>
            </div>
            <div className="section1_1">
                <div>
                    <h2>{data.title1}</h2>
                    <h1>{data.title2}</h1>
                    <p>{data.title3}</p>
                    <a href="#" className="section1_1_btn black">XEM NGAY</a>
                    <a href="#" className="section1_1_btn white">THÊM VÀO GIỎ ĐỒ</a>
                </div>
            </div>
        </div>
    );
}
export default Slide1Item