import AdminMain from "./components/Admin/Main/AdminMain";
import Hang from "./components/Admin/Hang/Hang";
import Test from "./components/Test";
import TheLoai from "./components/Admin/TheLoai/TheLoai";
import CtTheLoai from "./components/Admin/CtTheLoai/CtTheLoai";
import TaiKhoan from "./components/Admin/TaiKhoan/TaiKhoan";
import Banner from "./components/Admin/Banner/Banner";
import DonHang from "./components/Admin/DonHang/DonHang";
import DangNhap from "./components/Admin/DangNhap/DangNhap";

const routes = [
    {
        path: 'app',
        element: <AdminMain/>,
        children: [
            {path: 'hang', element: <Hang/>},
            {path: 'theloai', element: <TheLoai/>},
            {path: 'cttheloai', element: <CtTheLoai/>},
            {path: 'test', element: <Test/>},
            {path: 'taikhoan', element: <TaiKhoan/>},
            {path: 'banner', element: <Banner/>},
            {path: 'donhang', element: <DonHang/>}
        ]
    },
    {
        path: 'dangnhap',
        element: <DangNhap/>,
    },
];

export default routes;