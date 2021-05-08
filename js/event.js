
//
// /* Danh sach biến toàn cục sử dụng cho cả project*/
//
// let main_account = null;
// let main_password = null;
//
//
// /* ------------------------------------------*/
//
// function LoadTaiKhoanDangLogin() {
//     let taiKhoanDangLogin = readTextFile("data/account_on_login.txt");
//     // alert(taiKhoanDangLogin)
//     let taiKhoanDangLoginTach = taiKhoanDangLogin.split("--");
//     if(taiKhoanDangLoginTach.length < 2) return;
//     else{
//         main_account = taiKhoanDangLoginTach[0];
//         main_password = taiKhoanDangLoginTach[1];
//     }
// }
//
// function DangXuat() {
//     alert('Saved!');
//     const fs = require('fs');
//     alert('Saved!');
//     fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
//         if (err) throw err;
//         alert('Saved!');
//     });
//
// }
//
//
// function loadTaiKhoanVaoMain() {
//     LoadTaiKhoanDangLogin();
//     if(main_account === null || main_password === null) return;
//     else{
//         let ThanhDangNhap = document.getElementById("SignUpAndCreate_item1");
//         // alert(ThanhDangNhap.innerHTML);
//         ThanhDangNhap.innerHTML = "";
//         ThanhDangNhap.innerHTML =
//             "<p class=\"SignUpAndCreate_item1_item\">Xin chào,&nbsp; </p>" +
//             "<a class=\"SignUpAndCreate_item1_item\" href=\"dangNhap.html\">" +
//             main_account +
//             "</a>" +
//             "<a class=\"SignUpAndCreate_item1_item\" href=\"#\" onclick='DangXuat()'>&nbsp;&nbsp;  Đăng xuất</a>";
//     }
// }






function slide1(value) {
    const slides = document.getElementsByClassName("section1");
    const s = document.getElementsByClassName("section1");
    const dot = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
        s[i].style.display = "none";
        dot[i].style.background = "none";
    }
    dot[value].style.backgroundColor = "white";
    s[value].style.display = "block";
}

function loadMiniDress() {
    let img = document.getElementsByClassName("sanpham_img");
    let p1 = $(".p1");
    let p2 = $(".p2");
    let a;
    // alert(img.length);
    // alert(img[1].innerHTML);
    // alert("2");
    // alert("1");
    a = readTextFile("Image/product/text/Minidress1.txt");
    // alert(a);
    // a = "Image/product/minidress/mini1.jpg-Váy babydoll đáng yêu-159000đ\n" +
    //     "Image/product/minidress/mini2.jpg-Váy ngắn trắng nhẹ nhàng-259000đ\n" +
    //     "Image/product/minidress/mini3.jpg-Váy ngắn mùa hè-309000đ\n" +
    //     "Image/product/minidress/mini4.jpg-Váy ngắn đáng yêu-129000đ\n" +
    //     "Image/product/minidress/mini5.jpg-Váy ngắn chấm bi-399000đ\n" +
    //     "Image/product/minidress/mini6.jpg-Màu trắng tinh khôi-299000đ\n" +
    //     "Image/product/minidress/mini7.jpg-Váy ngắn chân sọc-259000đ\n" +
    //     "Image/product/minidress/mini8.jpg-Váy ngắn nhẹ nhàng-199000đ\n" +
    //     "Image/product/minidress/mini9.jpg-Váy công sở-299000đ";
    let b = a.split("\n");

    for(let i=0; i<9; i++){
        const x = b[i].split("-")[0];
        const y = b[i].split("-")[1];
        const z = b[i].split("-")[2];
        console.log(b);
        // console.log(z+ "đ");
        img[i].src = x;
        p1[i].innerHTML = y;
        p2[i].innerHTML = z;
    }
}

function readTextFile(file)
{
    let result = null   ;
    // alert("Nhan Pham");
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            // alert("2");
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                result = rawFile.responseText;
            }
            else alert("something wrong")
        }
        else alert("read failed")
    };
    rawFile.send(null);
    rawFile = null;
    return result;
}


function checkAccount() {
    let id = document.getElementById("id").value;
    let password = document.getElementById("pass").value;
    let danhSachTaiKhoanChuaXuLy = readTextFile("data/account.txt");
    let danhSachTaiKhoan = danhSachTaiKhoanChuaXuLy.split("\n");
    // alert(danhSachTaiKhoan);
    for(let i =0; i<danhSachTaiKhoan.length; i++){
        // if(id === danhSachTaiKhoan[i].split("--")[0]) alert("OKOK");
        // if(password === danhSachTaiKhoan[i].split("--")[1]) alert("OKOK1");
        // alert(password + " " + danhSachTaiKhoan[i].split("--")[1]);
        if( id === danhSachTaiKhoan[i].split("--")[0] && password === danhSachTaiKhoan[i].split("--")[1]){
            main_account = id;
            main_password = password;
            return true;
        }

    }
    return false;
}


function slideToDungActive() {
    const slides = document.getElementsByClassName("section1");
    const dot = document.getElementsByClassName("dot");
    let myIndex = 0;
    carousel();
    function carousel() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dot[i].style.background = "none";
        }
        dot[myIndex].style.backgroundColor = "white";
        $("#" + slides[myIndex].id).fadeIn(500);
        // $("#" + slides[myIndex].id).fadeOut(1000);
        slides[myIndex].style.display = "block";
        myIndex++;
        if(myIndex === 3) myIndex = 0;
        setTimeout(carousel, 8000);
    }
}

function slide5Active() {

    const slides5 = document.getElementsByClassName("slide5item");
    const dot = document.getElementsByClassName("slide5button");
    // alert(slides5[0].innerHTML);
    let myIndex4 = 0;
    carousel11();

    function carousel11() {
        console.log("OK2222OK");
        for (let i = 0; i < slides5.length; i++) {
            slides5[i].style.display = "none";
            dot[i].style.color = "gray";
        }
        dot[myIndex4].style.color = "black";
        // alert("#" + slides5[myIndex4].id );
        // $("#" + slides5[myIndex4].id).fadeOut(500);
        // $("#" + slides[myIndex].id).fadeOut(1000);

        slides5[myIndex4].style.display = "block";
        myIndex4++;
        if(myIndex4 === 4) myIndex4 = 0;
        setTimeout(carousel11, 4000);
    }
}

function slide5click(value) {
    const slides = document.getElementsByClassName("slide5item");
    const s = document.getElementsByClassName("slide5item");
    const dot = document.getElementsByClassName("slide5button");
    for (let i = 0; i < slides.length; i++) {
        s[i].style.display = "none";
        dot[i].style.color = "gray";
    }
    dot[value].style.color = "black";
    s[value].style.display = "block";
}

function BlogTagOnclick(value) {
    var a = document.getElementsByClassName("BlogTagbtn");
    var b = document.getElementsByClassName("ImageList");
    for(var i=0;i<a.length;i++){
        a[i].innerHTML = a[i].innerHTML.toString().split("<hr>")[0];
        b[i].style.display = "none";
        // alert(a[i].innerHTML);
    }
    a[value].innerHTML += "<hr>";
    b[value].style.display = "block";
}


function chiTietSanPhamOnclick(value) {
    const a = document.getElementsByClassName("BlogTagbtn");
    const b = document.getElementsByClassName("chiTietItem");
    for(let i=0; i<a.length; i++){
        a[i].innerHTML = a[i].innerHTML.toString().split("<hr>")[0];
        b[i].style.display = "none";
        // alert(a[i].innerHTML);
    }
    a[value].innerHTML += "<hr>";
    b[value].style.display = "block";
}

function BinhLuanThaySao(value) {
    let count = 0;
    const x = document.getElementsByClassName("Sao");
    for(let i = 0;i<x.length;i++){
        x[i].innerHTML = "<img src=\"Image/Icon/stargray.png\" alt=\"\">";
    }
    for(let i = 0 ;i<value;i++){
        x[i].innerHTML = "<img src=\"Image/Icon/stargold.png\" alt=\"\">";
        count++;
    }
    const y = document.getElementById("ChuSao");
    y.innerHTML = count.toString() + "/5";
}

function thanhtoan(value) {
    var x = document.getElementById("NhanHang");
    var x1 = document.getElementById("ThanhToan");
    if(value === 1){
        x.style.display = "none";
        x1.style.display = "block";
    }
    else if (value ===2){
        x.style.display = "block";
        x1.style.display = "none";
    }
    else {
        x.style.display = "none";
        x1.style.display = "none";
        document.getElementById("ThanhToanThanhCong").style.display = "block"
    }


}

function responsiveNavClick() {
    //alert(document.getElementsByClassName("responsiveNavItem").length);
    const x = document.getElementsByClassName("responsiveNavItem")[0];
    if (x.style.display === "none"){
        x.style.display = "flex"
    }
    else{
        x.style.display = "none"
    }

}