import { useState } from "react";
import { Navigate } from "react-router-dom";
import { authLogin } from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function Auth() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);

  // ============================================================
  // STATE
  // ============================================================
  const [user, setUser] = useState({ taiKhoan: "", matKhau: "" });

  const [validation, setValidation] = useState({ taiKhoan: "", matKhau: "" });

  // ============================================================
  // HANDLER: cập nhật state khi user gõ vào input
  // ============================================================
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
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

    dispatch(authLogin(user));
  };

  // Nút Login bị disabled khi chưa nhập đủ cả 2 field
  const isDisabled = !user.taiKhoan || !user.matKhau || state.loading;

  if (state.data) {
    return <Navigate to="/admin/dashboard" />;
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow" style={{ width: 420 }}>
        <div className="card-body p-4">
          <h4 className="card-title text-center mb-4 fw-bold">
            🎬 Admin Login
          </h4>

          {/* Thông báo lỗi từ API */}
          {state.error && (
            <div className="alert alert-danger py-2">
              {state.error.response.data.content}
            </div>
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
                <div className="text-danger small mt-1">
                  {validation.taiKhoan}
                </div>
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
                <div className="text-danger small mt-1">
                  {validation.matKhau}
                </div>
              )}
            </div>

            {/* Nút submit */}
            <button
              type="submit"
              disabled={isDisabled}
              className="btn btn-success w-100"
            >
              {state.loading ? (
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
