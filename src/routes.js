import AdminMain from "./components/Admin/Main/AdminMain";
import Hang from "./components/Admin/Hang/Hang";
import Test from "./components/Test";
import TheLoai from "./components/Admin/TheLoai/TheLoai";
import CtTheLoai from "./components/Admin/CtTheLoai/CtTheLoai";
import TaiKhoan from "./components/Admin/TaiKhoan/TaiKhoan";

const routes = [
    {
        path: 'app',
        element: <AdminMain/>,
        children: [
            {path: 'hang', element: <Hang/>},
            {path: 'theloai', element: <TheLoai/>},
            {path: 'cttheloai', element: <CtTheLoai/>},
            {path: 'test', element: <Test/>},
            {path:'taikhoan', element: <TaiKhoan/>}
        ]
    },
];

export default routes;