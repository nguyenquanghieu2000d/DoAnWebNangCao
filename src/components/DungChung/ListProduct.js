import React, {useEffect, useState} from 'react';
import ProductItem from "./ProductItem";

function ListProduct(props) {

    const data = props.data
    const gridItemPerColumn = props.gridItemPerColumn ? props.gridItemPerColumn : 0;
    const [gridTemplateColumnsTxt, setgridTemplateColumnsTxt] = useState("")

    const gridTemplateColumnsCal = () => {
        if (typeof gridItemPerColumn !== "number")
            alert("Truyền nhầm giá trị cho gridTemplateColumns")
        let txt = "";
        for (let i = 0; i < gridItemPerColumn; i++) {
            txt += (100 / gridItemPerColumn).toString() + "% "
        }
        setgridTemplateColumnsTxt(txt)
    }

    useEffect(() => {
        gridTemplateColumnsCal()
    }, [])


    return (
        <div id="sanphamcontainer" style={{
            display: 'grid',
            gridTemplateColumns: gridTemplateColumnsTxt
        }}
             className="sanphamcontainer">
            {
                data.map(((value, index) => <ProductItem key={index} data={value}/>))
            }
        </div>
    );
}

export default ListProduct;