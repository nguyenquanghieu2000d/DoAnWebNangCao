import React from 'react';
import "../../../assets/css/Client/DangKy/DangKy.css"
function DangKy() {
    return (
        <section>
            <img id="backgroundimage" src="Image/short-girl-golden-hairs-girl-4k-er-3840x2400%20(1).jpg" alt="" />
            <div id="formDangKy">
                <div className="containter">
                    <div className="fromContainer">
                        <label id="item1" className="uni1">
                            Họ và tên:
                            <input id="hoten" className="input_2" type="text" name="hoten" placeholder="Nhập họ và tên" />
                        </label>
                        <div className="gioitinh">
                            Giới tính:
                            <label>
                                <input className="checkboxstyle" name="gioitinh" defaultValue="Nam" type="radio" defaultChecked />Nam
                                <input className="checkboxstyle" name="gioitinh" defaultValue="Nu" type="radio" />Nữ
                            </label>
                        </div>
                        <label id="item7">
                            Số điện thoại:
                            <input id="sdt" className="input_2" name="sdt" type="text" placeholder="Nhập số điện thoại" />
                        </label>
                    </div>
                    <div className="fromContainer">
                        <label id="item3">
                            Nhập địa chỉ:
                            <input id="email" className="input_2" name="email" type="text" placeholder="Nhập email" />
                        </label>
                        {/*                <div class="checkbox">*/}
                        {/*                    <input  class="okok" type="checkbox" placeholder="Nhập số điện thoại">*/}
                        {/*                    <p>Giới tính</p>*/}
                        {/*                    <a href="#">Điều khoản dịch vụ</a>*/}
                        {/*                </div>*/}
                        <label id="item4">
                            Nhập tên tài khoản:
                            <input id="username" className="input_2" name="username" type="text" placeholder="Nhập tên tài khoản" />
                        </label>
                        <label id="item5">
                            Nhập mật khẩu (từ 8 -16 ký tự):
                            <input id="password" className="input_2" name="password" type="password" placeholder="Nhập mật khẩu (từ 8 -16 ký tự)" />
                        </label>
                        <label id="item6">
                            Xác nhận lại mật khẩu:
                            <input id="passwordvalid" className="input_2" type="password" placeholder="Xác nhận lại mật khẩu" />
                        </label>
                        <div className="checkbox">
                            <input className="checkboxstyle" type="checkbox" />
                            <p>Đồng ý với</p>
                            <a href="#">Điều khoản dịch vụ</a>
                        </div>
                        <input type="button" className="input_1" id="btnXacNhanDangKy" defaultValue="Xác nhận" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DangKy;