import React from 'react';

// import


function Footer() {
    return (
        <footer style={{backgroundColor: '#282828'}}>
            <h1>HHNStore</h1>
            <div className="footerfirst">
                <h4 style={{textAlign: 'center', color: 'white'}}><b>NGƯỜI THỰC HIỆN</b></h4>
                <div id="footer1" style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{padding:'1rem'}}>
                        <p>Nguyễn Quang Hiếu</p>
                        <p>D13CNPM7</p>
                        <div id="QuanHieuImageContainer"><img id="helloooo" src="Image/Hieu.jpg"
                                                              alt=""/></div>
                    </div>
                    <div style={{padding:'1rem'}}>
                        <p>Ngô Thị Huệ</p>
                        <p>D13CNPM5</p>
                        <div id="QuanHieuImageContainer"><img id="helloooo" src="Image/Hue.jpg"
                                                              alt=""/></div>
                    </div>
                </div>

                <div id="footer_container">
                    <div className="footer2">
                        <h4><b>CÂU HỎI</b></h4>
                        <a href="#">Ship hàng</a>
                        <a href="#">Tuyển nhân viên</a>
                        <a href="#">Blog</a>
                        <a href="#">Giấy phép bán hàng</a>
                    </div>
                    <div className="footer2">
                        <h4><b>HỖ TRỢ KHÁCH HÀNG</b></h4>
                        <a href="#">Phí Vận Chuyển</a>
                        <a href="#">Trả Lại</a>
                        <a href="#">Làm Thế Nào Để Theo Dõi</a>
                        <a href="#">Hướng Dẫn Kích Thước</a>
                    </div>
                    <div className="footer2">
                        <h4><b>DỊCH VỤ KHÁCH HÀNG</b></h4>
                        <a href="#">Liên hệ chúng tôi</a>
                        <a href="#">Phương Thức Thanh Toán</a>
                        <a href="#">Điểm Thưởng</a>
                    </div>
                    <div id="footer3">
                        <h4><b>BLOG</b></h4>
                        <div>
                            <img src="Image/Footer/unnamed.jpg"/>
                            <a className="footer3title" href="#">HOT TREND NĂM NAY</a>
                            <p>10/03/2020</p>
                            <a className="readmore" href="#">Read more</a>
                        </div>
                        <div>
                            <img src="Image/Footer/unnamed.jpg"/>
                            <a className="footer3title" href="#">LỜI KHUYÊN CHO CHỊ EM</a>
                            <p>10/03/2020</p>
                            <a className="readmore" href="#">Read more</a>
                        </div>
                        <div>
                            <img src="Image/Footer/unnamed.jpg"/>
                            <a className="footer3title" href="#">THỜI TRANG SINH VIÊN</a>
                            <p>10/03/2020</p>
                            <a className="readmore" href="#">Read more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footersecond">
                <h1>LIÊN HỆ</h1>
                <div className="footersecondcontainer">
                    <a href="#"><img className="imagefootergray" src="Image/Icon/grayIcon/facebook.png"/> <img
                        className="imagefootercolor" src="Image/Icon/colorIcon/facebook.png"/></a>
                    <a href="#"><img className="imagefootergray" src="Image/Icon/grayIcon/youtube.png"/><img
                        className="imagefootercolor" src="Image/Icon/colorIcon/youtube.png"/></a>
                    <a href="#"><img className="imagefootergray" src="Image/Icon/grayIcon/tumblr.png"/><img
                        className="imagefootercolor" src="Image/Icon/colorIcon/tumblr.png"/></a>
                    <a href="#"><img className="imagefootergray" src="Image/Icon/grayIcon/twitter.png"/><img
                        className="imagefootercolor" src="Image/Icon/colorIcon/twitter.png"/></a>
                    <a href="#"><img className="imagefootergray" src="Image/Icon/grayIcon/instagram.png"/><img
                        className="imagefootercolor" src="Image/Icon/colorIcon/instagram.png"/></a>
                    <a href="#"><img className="imagefootergray" src="Image/Icon/grayIcon/pinterest.png"/><img
                        className="imagefootercolor" src="Image/Icon/colorIcon/pinterest.png"/></a>
                </div>
            </div>
        </footer>
    );
}


export default Footer;
