import React, {useEffect, useState} from 'react';
import {TheLoaiAPI} from "../../../api/theloaiAPI";
import Loading from "../DungChung/Loading";

function ComboBoxTheLoai(props) {
    const [ListTheLoai, setListTheLoai] = useState("")
    const currentCTTheLoai = props.currentCTTheLoai
    const value = props.value

    const getListTheLoai = async () => {
        const response = await TheLoaiAPI.getTheLoai()
        if (response) {
            for (let i = 0; i < response.length; i++) {
                const response2 = await TheLoaiAPI.getCTTheLoai(response[i].ma_the_loai)
                if (response2) response[i].list_ct_the_loai = response2
            }
            await setListTheLoai(response)
        }
    }

    const selectOnChange = (e) => {
        currentCTTheLoai(e.target.value)
    }

    useEffect(() => {
        getListTheLoai()
    }, [])

    return (
        <div>
            Chọn thể loại:
            <select value={value} onChange={selectOnChange} id="selectTheLoai" style={{
                borderRadius: '1rem',
                width: '100%',
                height: '3rem',
                fontFamily: 'JosefinSans,serif'
            }}>
                <option value={""}>Chưa chọn</option>
                {
                    ListTheLoai ? ListTheLoai.map((value, index) => {
                        return <optgroup label={value.ten_loai}>
                            {
                                value.list_ct_the_loai ? value.list_ct_the_loai.map((value2, index2) => {
                                    return <option value={value2.ma_loai}>{value2.ten_ct_the_loai}</option>
                                }) : <Loading/>
                            }
                        </optgroup>
                    }) : <Loading/>
                }
            </select>
        </div>
    );
}


export default ComboBoxTheLoai;