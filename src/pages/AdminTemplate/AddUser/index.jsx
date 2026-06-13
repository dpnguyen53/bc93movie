import { useState } from "react";
import api from "../../../services/api";

// Giá trị ban đầu của form — khớp với body API yêu cầu
const INITIAL_FORM = {
  taiKhoan: "",
  matKhau: "",
  email: "",
  soDt: "",
  maNhom: "GP01",        // mặc định GP01
  maLoaiNguoiDung: "KhachHang", // mặc định KhachHang
  hoTen: "",
};

export default function AddUser() {
  // ============================================================
  // STATE
  // ============================================================
  const [form, setForm] = useState(INITIAL_FORM);

  // loading: đang gọi API
  const [loading, setLoading] = useState(false);

  // success: thông báo thêm thành công
  const [success, setSuccess] = useState("");

  // error: thông báo lỗi từ API
  const [error, setError] = useState("");

  // ============================================================
  // HANDLER: cập nhật field khi gõ/chọn
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Xóa thông báo cũ khi user bắt đầu sửa
    setSuccess("");
    setError("");
  };

  // ============================================================
  // HANDLER: submit form — gọi API ThemNguoiDung
  // Authorization: Bearer token được tự động gắn từ api.js interceptor
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      // POST /QuanLyNguoiDung/ThemNguoiDung
      await api.post("QuanLyNguoiDung/ThemNguoiDung", form);

      // Thành công: hiện thông báo và reset form
      setSuccess(`Thêm tài khoản "${form.taiKhoan}" thành công!`);
      setForm(INITIAL_FORM);
    } catch (err) {
      const message =
        err.response?.data?.message || "Thêm người dùng thất bại. Vui lòng thử lại!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-bold">Thêm người dùng</h4>

      <div className="row">
        <div className="col-md-7">
          {/* Thông báo thành công */}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Thông báo lỗi */}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Tài khoản */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Tài khoản</label>
              <input
                name="taiKhoan"
                type="text"
                className="form-control"
                placeholder="Nhập tài khoản"
                value={form.taiKhoan}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mật khẩu */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Mật khẩu</label>
              <input
                name="matKhau"
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                value={form.matKhau}
                onChange={handleChange}
                required
              />
            </div>

            {/* Họ tên */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Họ tên</label>
              <input
                name="hoTen"
                type="text"
                className="form-control"
                placeholder="Nhập họ tên"
                value={form.hoTen}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Nhập email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Số điện thoại */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Số điện thoại</label>
              <input
                name="soDt"
                type="text"
                className="form-control"
                placeholder="Nhập số điện thoại"
                value={form.soDt}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mã nhóm */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Mã nhóm</label>
              <input
                name="maNhom"
                type="text"
                className="form-control"
                value={form.maNhom}
                onChange={handleChange}
                required
              />
            </div>

            {/* Loại người dùng — dùng select cho dễ chọn */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Loại người dùng</label>
              <select
                name="maLoaiNguoiDung"
                className="form-select"
                value={form.maLoaiNguoiDung}
                onChange={handleChange}
              >
                <option value="KhachHang">Khách hàng</option>
                <option value="QuanTri">Quản trị</option>
              </select>
            </div>

            {/* Nút submit */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Đang thêm...
                </>
              ) : (
                "Thêm người dùng"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
