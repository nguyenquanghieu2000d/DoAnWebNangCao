import React from 'react';
import "../../assets/css/ChiTietSanPham/ChiTietSanPham.css"
import GeneralBanner from "../DungChung/GeneralBanner";
import Slide3 from "./Slide3";
import BannerItem from "../TrangChu/Banner/BannerItem";
import {convertToVND} from "../../assets/js/tools";


function ChiTietSanPham() {
    return (
        <div>
            <section id="ChiTietSanPhamSection1">
                <GeneralBanner text="CHI TIẾT SẢN PHẨM"/>
                <div id="ChiTietSanPhamBoCuc">
                    <Slide3/>
                    <div id="ChiTietSanPhamSection1Item2">
                        <div id="ma_hang" style={{fontSize: '3rem', display: 'none'}}>1123123</div>
                        <div id="hinh_dai_dien" style={{fontSize: '3rem', display: 'none'}}>1123123</div>
                        <div id="thuong_hieu" style={{fontSize: '3rem'}}>1123123</div>
                        <br/>
                        <div id="ten_hang" style={{fontWeight: 'bold', fontSize: '2rem'}}>9000</div>
                        <br/><br/>
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex'}}>
                                <h2 id="gia_moi" style={{fontSize: '3rem'}}>{convertToVND(9000)}</h2>
                            </div>
                            <div>&nbsp;&nbsp;&nbsp;</div>
                            <div style={{display: 'flex'}}>
                                <h2><strike id="gia_cu" style={{color: '#282828'}}>{convertToVND(100000)}</strike></h2>
                            </div>
                        </div>
                        <div className="TinhTrang"><h3>TÌNH TRẠNG:</h3> <p id="ChiTietSanPhamTinhTrang">Còn hàng
                            nhé!!!</p></div>
                        <div className="TinhTrang"><h3>KÍCH CỠ:</h3> <label>
                            <select>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                            </select>
                        </label></div>
                        <div className="TinhTrang"><h3>SỐ LƯỢNG:</h3>
                            <div className="ThanhCongTru ThanhCongTruVTKC">
                                <input type="button" className="ThanhCongTruTru" onClick="minus()" defaultValue="-"/>
                                <p id="thanhCongTruSo" className="ThanhCongTruSo">1</p>
                                <input type="button" className="ThanhCongTruCong" onClick="push()" defaultValue="+"/>
                            </div>
                        </div>
                        <div className="TinhTrang"><h3>MÀU SẮC: </h3> <label>
                            <select>
                                <option>ĐEN</option>
                                <option>ĐỎ</option>
                                <option>LAM</option>
                            </select>
                        </label></div>
                        <div className="TinhTrang1">
                            <input type="button" id="btnMuaNgay" onClick="okokoksssss()"
                                   className="ChiTietSanPhamNutXacNhan button buttonMuaNgay" defaultValue="MUA NGAY"/>
                            <input type="button" id="btnGioHang" onClick
                                   className="ChiTietSanPhamNutXacNhan button buttonMuaNgay"
                                   defaultValue="THÊM VÀO GIỎ HÀNG"/>
                        </div>
                        <div id="ChuaTab">
                            <div><img src="Image/Icon/giaohangdoitra/dp.png" alt=""/>
                                <p>MIỄN PHÍ GIAO HÀNG TOÀN QUỐC<br/>
                                    (Sản phẩm giảm giá từ 30% trở xuống)</p></div>
                            <div><img src="Image/Icon/giaohangdoitra/dp2.png" alt=""/>
                                <p>ĐỔI TRẢ DỄ DÀNG<br/>
                                    ( Hỗ trợ đổi hàng trong vòng 7 ngày kể từ ngày mua hàng )</p></div>
                            <div><img src="Image/Icon/giaohangdoitra/dp3.png" alt=""/>
                                <p>TỔNG ĐÀI TƯ VẤN 1900.56.56.55 - 0943.049.820<br/>
                                    ( Từ 8h30 - 22h00 mỗi ngày)</p></div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div id="BlogTab">
                    <div><input type="button" className="BlogTagbtn" id="bt1" onClick="chiTietSanPhamOnclick(0)"
                                defaultValue="THÔNG TIN SẢN PHẨM"/>
                        <hr/>
                    </div>
                    <div><input type="button" className="BlogTagbtn" id="bt2" onClick="chiTietSanPhamOnclick(1)"
                                defaultValue="ĐÁNH GIÁ"/></div>
                    <div><input type="button" className="BlogTagbtn" id="bt3" onClick="chiTietSanPhamOnclick(2)"
                                defaultValue="HỎI ĐÁP"/></div>
                </div>
                <div id="mo_ta" className="chiTietItem">
                    {/*            <b>Áo khoác nữ chống tia UV Lime Orange AlRun Air Hoodie 2 LO19707101-LBL</b> được may từ chất liệu cao cấp, áp dụng kỹ thuật cao được tích lũy từ doanh nghiệp toàn cầu HYOSUNG và LIMEORANGE cho cuộc sống thường ngày của bạn thoái mái nhất dù ở bất kỳ đâu, đưa bạn đi từ ngạc nhiên này nhạc nhiên này đến ngạc nhiên khác. Sự tự do cảm nhận ngay giây phút khoác lên người Always Refreshing Life. Cuộc sống của bạn sẽ trở nên đặc biệt, khác lạ và mới mẻ hơn khi đồng hành áo khoác Limeorange Air Hoodie 2 - nhẹ nhàng và thoáng mát, thản nhiên không lo lắng trước ánh mặt trời thiêu đốt.*/}
                    {/*            <br>*/}
                    {/*            <br>*/}
                    {/*            <b>Thông tin chi tiết</b><br>*/}
                    {/*            - Thương hiệu: Lime Orange<br>*/}
                    {/*            - Xuất xứ: Thương hiệu Hàn Quốc, sản xuất Việt Nam<br>*/}
                    {/*            - Chất liệu: 87% Polyester, 13% Spandex.<br>*/}
                    {/*            - Màu sắc: Xanh biển nhạt<br>*/}
                    - Size: S/M/L/XL<br/>
                </div>
                <div id="chiTietItem2" className="chiTietItem">
                    <div className="DanhGia">
                        <div className="DanhGia1">
                            <h1>5/5</h1>
                            <img src="Image/Icon/stargold.png" alt=""/>
                            <img src="Image/Icon/stargold.png" alt=""/>
                            <img src="Image/Icon/stargold.png" alt=""/>
                            <img src="Image/Icon/stargold.png" alt=""/>
                            <img src="Image/Icon/stargray.png" alt=""/>
                        </div>
                        <div className="DanhGia2">
                            <h2>Đánh giá của bạn</h2>
                            <h2 id="ChuSao">0/5</h2>
                            <ul>
                                <li className="Sao" onClick="BinhLuanThaySao(1)"><img src="Image/Icon/stargray.png"
                                                                                      alt=""/></li>
                                <li className="Sao" onClick="BinhLuanThaySao(2)"><img src="Image/Icon/stargray.png"
                                                                                      alt=""/></li>
                                <li className="Sao" onClick="BinhLuanThaySao(3)"><img src="Image/Icon/stargray.png"
                                                                                      alt=""/></li>
                                <li className="Sao" onClick="BinhLuanThaySao(4)"><img src="Image/Icon/stargray.png"
                                                                                      alt=""/></li>
                                <li className="Sao" onClick="BinhLuanThaySao(5)"><img src="Image/Icon/stargray.png"
                                                                                      alt=""/></li>
                            </ul>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <label className="DanhGia2Textarea">
                        <textarea placeholder="Bình luận của bạn ... " defaultValue={""}/>
                    </label>
                    <br/>
                    <button onClick className="BinhLuan button buttonMuaNgay" href="#">BÌNH LUẬN</button>
                </div>
                <div id="chiTietItem3" className="chiTietItem">
                    <label className="DanhGia2Textarea">
                        <textarea placeholder="Câu hỏi của bạn ... " defaultValue={""}/>
                    </label>
                    <br/>
                    <button onClick className="BinhLuan button buttonMuaNgay" href="#">GỬI CÂU</button>
                </div>
            </section>
            <section id="ChiTietSanPhamSection2">
                <GeneralBanner text="MỘT SỐ HÌNH ẢNH MÔ TẢ"/>
                <div id="imageContainer">
                    {/*            <img src="Image/product/productdetail/mini4/1.JPG">*/}
                    {/*            <img src="Image/product/productdetail/mini4/1.JPG" >*/}
                </div>
            </section>
        </div>

    );
}

export default ChiTietSanPham;