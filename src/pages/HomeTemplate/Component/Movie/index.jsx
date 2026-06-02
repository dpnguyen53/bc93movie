export default function Movie(props) {
  const { movie } = props;

  return (
    <div className="col-3">
      <div className="card">
        <img className="card-img-top" src={movie.hinhAnh} alt="Title" />
        <div className="card-body">
          <h4 className="card-title">{movie.tenPhim}</h4>
        </div>
      </div>
    </div>
  );
}
