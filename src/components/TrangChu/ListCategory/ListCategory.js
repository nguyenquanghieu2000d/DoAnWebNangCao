import React from 'react';
import ListImageWithText from "../../DungChung/ListImageWithText";

function ListCategory(props) {
    const gridItemPerColumn = props.gridItemPerColumn

    const ListCategoryData = [
        {
            "ten_the_loai": "GIÀY DÉP",
            "hinh_dai_dien":"./Image/CategoryImage/1.jpeg"
        },
        {
            "ten_the_loai": "TÚI XÁCH",
            "hinh_dai_dien":"./Image/CategoryImage/2.jpeg"
        },
        {
            "ten_the_loai": "MĨ PHẨM",
            "hinh_dai_dien":"./Image/CategoryImage/3.jpeg"
        },
        {
            "ten_the_loai": "PHỤ KIỆN",
            "hinh_dai_dien":"./Image/CategoryImage/4.jpeg"
        }

    ]

    return (
        <div className="sanphamcontainer">
            {
                ListCategoryData ? <ListImageWithText gridItemPerColumn={gridItemPerColumn} data={ListCategoryData}/>: <div/>
            }
        </div>
    );
}

export default ListCategory;