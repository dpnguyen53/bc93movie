import { Link } from "react-router-dom";

export default function Movie(props) {
  const { movie } = props;

  return (
    <div className="col-3">
      {/* Link tới /detail/:maPhim — click vào card sẽ chuyển sang trang chi tiết */}
      <Link to={`/detail/${movie.maPhim}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card">
          <img className="card-img-top" src={movie.hinhAnh} alt="Title" />
          <div className="card-body">
            <h4 className="card-title">{movie.tenPhim}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
}
