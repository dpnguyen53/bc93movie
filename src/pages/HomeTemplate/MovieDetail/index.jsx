import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

export default function MovieDetail() {
  const { maPhim } = useParams();

  const [phim, setPhim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then((res) => {
        setPhim(res.data.content);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải thông tin phim!");
        setLoading(false);
      });
  }, [maPhim]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status" />
        <p className="mt-2 text-muted">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  // Chuyển link YouTube sang dạng embed để nhúng vào iframe
  // VD: https://youtube.com/watch?v=abc123 => https://www.youtube.com/embed/abc123
  const trailerEmbed = phim.trailer?.replace("watch?v=", "embed/");

  return (
    <div className="container py-4">
      {/* ---- THÔNG TIN PHIM ---- */}
      <div className="row g-4">
        {/* Cột trái: Poster */}
        <div className="col-md-4">
          <img
            src={phim.hinhAnh}
            alt={phim.tenPhim}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Cột phải: Chi tiết */}
        <div className="col-md-8">
          {/* Tên phim */}
          <h2 className="fw-bold">{phim.tenPhim}</h2>

          {/* Badges trạng thái */}
          <div className="mb-3">
            {phim.hot && <span className="badge bg-danger me-2">🔥 HOT</span>}
            {phim.dangChieu && <span className="badge bg-success me-2">Đang chiếu</span>}
            {phim.sapChieu && <span className="badge bg-warning text-dark">Sắp chiếu</span>}
          </div>

          {/* Thông tin dạng bảng */}
          <table className="table table-bordered w-auto mb-3">
            <tbody>
              <tr>
                <th>Mã phim</th>
                <td>{phim.maPhim}</td>
              </tr>
              <tr>
                <th>Nhóm</th>
                <td>{phim.maNhom}</td>
              </tr>
              <tr>
                <th>Khởi chiếu</th>
                <td>{new Date(phim.ngayKhoiChieu).toLocaleDateString("vi-VN")}</td>
              </tr>
              <tr>
                <th>Đánh giá</th>
                <td>⭐ {phim.danhGia} / 10</td>
              </tr>
            </tbody>
          </table>

          {/* Mô tả */}
          <p className="text-muted">
            {phim.moTa || "Nội dung đang được cập nhật..."}
          </p>

          {/* Nút hành động */}
          <a href="#trailer" className="btn btn-danger me-2">▶ Xem Trailer</a>
          <button className="btn btn-outline-secondary">🎟 Đặt vé ngay</button>
        </div>
      </div>

      <hr className="my-4" />

      {/* ---- TRAILER ---- */}
      <h5 className="fw-bold mb-3">Trailer chính thức</h5>
      <div className="ratio ratio-16x9 w-50">
        <iframe
          src={trailerEmbed}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
