import React from 'react';

function TimKiemFilter() {
    


    return (
        <div id="section2shop_item1">
            <h1>
                DANH MỤC
            </h1>
            <ul id="ngothihue">
                <li className="section2shop_item1_" onClick>
                    <a href="TimKiem.aspx">Tất cả</a>
                    <hr/>
                </li>
            </ul>
            <h1>
                TÌM KIẾM
            </h1>
            <h3>GIÁ</h3>
            <div id="gia">
                <label>MIN: <input id="gia_min" onKeyUp="kkkk()" className="input_2" type="text"
                                   placeholder="Giá nhỏ nhất"/></label>
                <label>MAX: <input id="gia_max" onKeyUp="kkkk()" className="input_2" type="text"
                                   placeholder="Giá nhỏ nhất"/></label>
            </div>
            <hr/>
            <h3>MÀU</h3>
            <label>Chọn màu: <input className="color" type="color"/></label>
            {/*            <select class="minimal">*/}
            {/*                <option>Đỏ</option>*/}
            {/*                <option>Xanh Lam</option>*/}
            {/*                <option>Xanh Lá</option>*/}
            {/*            </select>*/}
            <hr/>
            <h3>SIZE</h3>
            <select>
                <option>S</option>
                <option>M</option>
                <option>L</option>
            </select>
            {/*            <div class="size">*/}
            {/*                <input type="button" value="XS">*/}
            {/*                <input type="button" value="S">*/}
            {/*                <input type="button" value="M">*/}
            {/*                <input type="button" value="L">*/}
            {/*                <input type="button" value="XL">*/}
            {/*                <input type="button" value="XXL">*/}
            {/*            </div>*/}
            <hr/>
            <h3>BRAND</h3>
            <ul>
                <li><a href="#">Gucci</a></li>
                <hr/>
                <li><a href="#">Elise</a></li>
                <hr/>
                <li><a href="#">SYO FASHION</a></li>
                <hr/>
                <li><a href="#">DE LEAH</a></li>
                <hr/>
            </ul>
        </div>
    );
}

export default TimKiemFilter;