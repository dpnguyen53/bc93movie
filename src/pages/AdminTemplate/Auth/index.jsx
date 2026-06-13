import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function Auth() {
  // ============================================================
  // STATE
  // ============================================================
  const [user, setUser] = useState({ taiKhoan: "", matKhau: "" });

  const [validation, setValidation] = useState({ taiKhoan: "", matKhau: "" });

  // Lưu lỗi trả về từ API (sai tài khoản/mật khẩu...)
  const [apiError, setApiError] = useState("");

  // Trạng thái đang gọi API — để disable nút và hiện loading
  const [loading, setLoading] = useState(false);

  // Hook chuyển trang
  const navigate = useNavigate();

  // ============================================================
  // HANDLER: cập nhật state khi user gõ vào input
  // ============================================================
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    // Xóa lỗi API khi user bắt đầu gõ lại
    setApiError("");
  };

  // ============================================================
  // HANDLER: validate khi rời khỏi input (onBlur)
  // ============================================================
  const handleValidation = (event) => {
    const { name, value } = event.target;
    setValidation({
      ...validation,
      [name]: value.trim() === "" ? `${name} không được bỏ trống!` : "",
    });
  };

  // ============================================================
  // HANDLER: submit form — gọi API đăng nhập
  // ============================================================
  const handleSubmit = async (event) => {
    // Ngăn trang reload khi submit
    event.preventDefault();

    try {
      setLoading(true);
      setApiError("");

      // BƯỚC 1: Gọi API đăng nhập
      // POST /QuanLyNguoiDung/DangNhap  — body: { taiKhoan, matKhau }
      const response = await api.post("QuanLyNguoiDung/DangNhap", user);

      // BƯỚC 2: Lưu thông tin user (bao gồm accessToken) vào localStorage
      // => Các request sau sẽ tự động gắn Bearer token (xem api.js)
      const userData = response.data.content;
      localStorage.setItem("user", JSON.stringify(userData));

      // BƯỚC 3: Redirect sang trang Dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      // API trả lỗi (sai tài khoản, mật khẩu...) => hiện thông báo
      const message =
        error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  // Nút Login bị disabled khi chưa nhập đủ cả 2 field
  const isDisabled = !user.taiKhoan || !user.matKhau || loading;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow" style={{ width: 420 }}>
        <div className="card-body p-4">
          <h4 className="card-title text-center mb-4 fw-bold">🎬 Admin Login</h4>

          {/* Thông báo lỗi từ API */}
          {apiError && (
            <div className="alert alert-danger py-2">{apiError}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Tài khoản */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Tài khoản</label>
              <input
                name="taiKhoan"
                type="text"
                className="form-control"
                placeholder="Nhập tài khoản"
                onChange={handleOnChange}
                onBlur={handleValidation}
              />
              {validation.taiKhoan && (
                <div className="text-danger small mt-1">{validation.taiKhoan}</div>
              )}
            </div>

            {/* Mật khẩu */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Mật khẩu</label>
              <input
                name="matKhau"
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                onChange={handleOnChange}
                onBlur={handleValidation}
              />
              {validation.matKhau && (
                <div className="text-danger small mt-1">{validation.matKhau}</div>
              )}
            </div>

            {/* Nút submit */}
            <button
              type="submit"
              disabled={isDisabled}
              className="btn btn-success w-100"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
