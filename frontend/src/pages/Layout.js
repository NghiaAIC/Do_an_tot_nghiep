import { Outlet, NavLink } from "react-router-dom";
import "../css/Layout.css";

function Layout() {
  return (
    <div>
      <div id="navigate">
        <NavLink
          id="nav"
          to="/"
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : "",
            };
          }}
        >
          Trang chủ
        </NavLink>

        <NavLink
          id="nav"
          to="/GiangVien"
          style={({ isActive, isPending }) => {
            return {
              color: isActive ? "red" : "",
            };
          }}
        >
          Danh sách giảng viên
        </NavLink>

        <NavLink
          id="nav"
          to="/LopHoc"
          style={({ isActive, isPending }) => {
            return {
              color: isActive ? "red" : "",
            };
          }}
        >
          Lớp học
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
