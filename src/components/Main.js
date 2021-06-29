import React from 'react';
// import '../assets/css/DungChung/font.css'
// import '../assets/css/DungChung/DungChung.css'
import Navbar from "./DungChung/Navbar/Navbar";
import Footer from "./DungChung/Footer";

import {Outlet} from "react-router-dom";

function Main() {
    const convertRemToPixels = (rem) => {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    const NavbarChange = () => {
        document.addEventListener("DOMContentLoaded", function () {
            const asd = document.getElementsByTagName("NAV")[0];
            const video = document.getElementsByTagName("VIDEO")[0];
            const slideToDung = document.getElementsByClassName("slideAnh1")[0];
            window.addEventListener("scroll", function () {
                if (window.pageYOffset > 1) {
                    asd.style.position = "fixed";
                    asd.style.top = "0";
                    // video.style.display = "none";
                    // asd.style.background = "#282828";
                    // slideToDung.style.position = "fixed";
                    // slideToDung.style.top = "0";
                    // slideToDung.style.zIndex = "999";
                } else {
                    asd.style.position = "relative";
                    // asd.style.background = "none";
                    // video.style.display = "block";
                    // slideToDung.style.position = "static";
                }
                if (window.pageYOffset > convertRemToPixels(21.875)) {
                    // slideToDung.style.position = "relative";
                }
            })
        })
    }

    return (
        <body>
        <Navbar/>
        <Outlet/>
        <Footer/>
        {NavbarChange()}
        </body>

    );
}

export default Main;
