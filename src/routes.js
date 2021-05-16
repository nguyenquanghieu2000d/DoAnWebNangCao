import Main from "./components/Main";
import TrangChu from "./components/TrangChu/TrangChu";
import TimKiem from "./components/TimKiem/TimKiem";
import DangNhap from "./components/DangNhap/DangNhap";
import DangKy from "./components/DangKy/DangKy";
import ThongTinCaNhan from "./components/ThongTinCaNhan/ThongTinCaNhan";
import ChiTietSanPham from "./components/ChiTietSanPham/ChiTietSanPham";

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
            { path: 'chitietsanpham', element: <ChiTietSanPham /> },
        ]
    },
];

export default routes;