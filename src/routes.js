import Main from "./components/Main";
import TrangChu from "./components/Client/TrangChu/TrangChu";
// import TimKiem from "./components/TimKiem/temp/TimKiem";
import DangNhap from "./components/Client/DangNhap/DangNhap";
import DangKy from "./components/Client/DangKy/DangKy";
import ThongTinCaNhan from "./components/Client/ThongTinCaNhan/ThongTinCaNhan";
import ChiTietSanPham from "./components/Client/ChiTietSanPham/ChiTietSanPham";
import TimKiem from "./components/Client/TimKiem/TimKiem";
import Test2 from "./components/Test2";
import GioHang from "./components/Client/GioHang/GioHang";
import ThanhToan from "./components/Client/ThanhToan/ThanhToan";

const routes = [
    {
        path: 'app',
        element: <Main />,
        children: [
            { path: 'trangchu', element: <TrangChu /> },
            { path: 'timkiem', element: <TimKiem /> },
            { path: 'dangnhap', element: <DangNhap /> },
            { path: 'dangky', element: <DangKy /> },
            { path: 'thongtincanhan', element: <ThongTinCaNhan /> },
            { path: 'chitietsanpham',
                element: <ChiTietSanPham />},
            {path:'giohang', element: <GioHang/>},
            { path: 'test', element: <Test2/> },
            {path: 'thanhtoan', element: <ThanhToan/>}
        ]
    },
];

export default routes;