import { Navigate, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function AdminTemplate() {
  // ============================================================
  // GUARD: kiểm tra user đã đăng nhập chưa
  // Nếu chưa có token => redirect về trang login
  // ============================================================
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user?.accessToken) {
    // <Navigate> thay thế trang hiện tại bằng /auth
    return <Navigate to="/auth" />;
  }

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
