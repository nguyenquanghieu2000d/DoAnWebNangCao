import React from 'react';
import "../../assets/css/ThongTinCaNhan/ThongTinCaNhan.css"

function ThongTinCaNhan() {
    return (
        <div>
            <section id="form">
                <section id="section1shop" className="section1shop">
                    <div>
                    </div>
                    <h1>
                        THÔNG TIN TÀI KHOẢN
                    </h1>
                </section>
                {/*    <img src="Image/short-girl-golden-hairs-girl-4k-er-3840x2400%20(1).jpg">*/}
                <div id="formDangKy">
                    <div className="containter">
                        <div className="fromContainer">
                            <label id="item4">
                                Tên tài khoản:
                                <p id="tbUsername" className="input_2"/>
                            </label>
                            <label id="item5">
                                Mật khẩu:
                                <input id="password" className="input_2" type="password"
                                       placeholder="Nhập mật khẩu (từ 8 -16 ký tự)" defaultValue/>
                            </label>
                            <label id="item6">
                                Xác nhận lại mật khẩu:
                                <input id="passwordvalid" className="input_2" type="password"
                                       placeholder="Xác nhận lại mật khẩu" defaultValue/>
                            </label>
                            <br/>
                            <input className="input_1" id="btnXacNhanSua" type="button" defaultValue="Xác nhận sửa"/>
                            <div id="lbThongBao" style={{color: 'red'}}/>
                        </div>
                        <div className="fromContainer">
                            <label id="item1" className="uni1">
                                Họ và tên:
                                <input id="hoten" className="input_2" type="text" placeholder="Nhập họ và tên"
                                       defaultValue/>
                            </label>
                            <div className="gioitinh">
                                Giới tính:
                                <label>
                                    <input className="checkboxstyle" name="gioitinh" defaultValue="Nam" type="radio"
                                           defaultChecked/>Nam
                                    <input className="checkboxstyle" name="gioitinh" defaultValue="Nu" type="radio"/>Nữ
                                </label>
                            </div>
                            <label id="item7">
                                Số điện thoại:
                                <input id="sdt" className="input_2" type="text" placeholder="Nhập số điện thoại"
                                       defaultValue/>
                            </label>
                            <label id="item7">
                                Địa chỉ:
                                <input id="dia_chi" className="input_2" type="text" placeholder="Nhập số địa chỉ"
                                       defaultValue/>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section2">
                <h1>Đơn hàng gần nhất</h1>
                <div className="section2container">
                    {/*            <div id="section2containeritem1">*/}
                    <table>
                        <thead>
                        <tr>
                            <th className="product-th">Mã đơn hàng</th>
                            <th className="quy-th">Địa chỉ</th>
                            <th className="kichco size-th">Họ tên đăng ký</th>
                            <th className="dongia size-th">Số điện thoại</th>
                            <th className="total-th size-th">Ngày thanh toán</th>
                            <th className="size-th">Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody id="tableDonHang">
                        </tbody>
                    </table>
                    {/*            </div>*/}
                    {/*            <div>*/}
                    {/*        <table>*/}
                    {/*            <thead>*/}
                    {/*            <tr>*/}
                    {/*                <th>Tổng giá sản phẩm</th>*/}
                    {/*                <th>Tiền vận chuyển	Tính</th>*/}
                    {/*                <th>TỔNG TIỀN THANH TOÁN</th>*/}
                    {/*            </tr>*/}
                    {/*            </thead>>*/}
                    {/*            <tbody>*/}
                    {/*            <tr>*/}
                    {/*                <td>1.176.000₫</td>*/}
                    {/*                <td>Tính khi thanh toán</td>*/}
                    {/*                <td>1.176.000₫</td>*/}
                    {/*            </tr>*/}
                    {/*            </tbody>*/}
                    {/*        </table>*/}
                    {/*            </div>*/}
                    {/*        <div class="section2containeritem2">*/}
                    {/*            <button class="button2 buttonMuaNgay">THANH TOÁN NGAY</button>*/}
                    {/*            <button class="button2 buttonMuaNgay2">TIẾP TỤC MUA SẮM</button>*/}
                    {/*        </div>*/}
                </div>
            </section>
            <section className="section3">
                <h1>Các sản phẩm đã mua</h1>
                <div className="section2container">
                    {/*            <div id="section2containeritem1">*/}
                    <table>
                        <thead>
                        <tr>
                            <th className="quy-th">Mã hàng</th>
                            <th className="size-th">Tên hàng</th>
                            <th className="kichco size-th">Giá cũ</th>
                            <th className="dongia size-th">Giá mới</th>
                            <th className="total-th size-th">Thương hiệu</th>
                            <th className>Hình đại diện</th>
                            <th className>Mô tả</th>
                            <th>Số lượng</th>
                        </tr>
                        </thead>
                        <tbody id="tableSanPham">
                        </tbody>
                    </table>
                    {/*            </div>*/}
                    {/*            <div>*/}
                    {/*        <table>*/}
                    {/*            <thead>*/}
                    {/*            <tr>*/}
                    {/*                <th>Tổng giá sản phẩm</th>*/}
                    {/*                <th>Tiền vận chuyển	Tính</th>*/}
                    {/*                <th>TỔNG TIỀN THANH TOÁN</th>*/}
                    {/*            </tr>*/}
                    {/*            </thead>>*/}
                    {/*            <tbody>*/}
                    {/*            <tr>*/}
                    {/*                <td>1.176.000₫</td>*/}
                    {/*                <td>Tính khi thanh toán</td>*/}
                    {/*                <td>1.176.000₫</td>*/}
                    {/*            </tr>*/}
                    {/*            </tbody>*/}
                    {/*        </table>*/}
                    {/*            </div>*/}
                    {/*        <div class="section2containeritem2">*/}
                    {/*            <button class="button2 buttonMuaNgay">THANH TOÁN NGAY</button>*/}
                    {/*            <button class="button2 buttonMuaNgay2">TIẾP TỤC MUA SẮM</button>*/}
                    {/*        </div>*/}
                </div>
            </section>
        </div>
    );
}

export default ThongTinCaNhan;