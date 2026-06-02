import { useState } from "react";

export default function Auth() {
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [validation, setValidation] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleValidation = (event) => {
    const { name, value } = event.target;
    if (value.trim() === "") {
      let message = `${name} không được bỏ trống!`;
      setValidation({
        ...validation,
        [name]: message,
      });
    } else {
      setValidation({
        ...validation,
        [name]: "",
      });
    }
    setDisabled(!user.taiKhoan || !user.matKhau);
  };

  const handleSubmit = (event) => {
    // Ngăn chặn trang web tự động reload khi submit form
    event.preventDefault();
    console.log("User:", user);
  };

  return (
    <div>
      <h1>Auth</h1>
      <div className="container">
        <div className="row">
          <div className="col-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Tài khoản</label>
                <input
                  name="taiKhoan"
                  onChange={handleOnchange}
                  onBlur={handleValidation}
                  type="text"
                  className="form-control"
                  placeholder=""
                />
                {validation.taiKhoan && (
                  <div className="alert alert-danger">
                    {validation.taiKhoan}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  name="matKhau"
                  onChange={handleOnchange}
                  onBlur={handleValidation}
                  type="text"
                  className="form-control"
                  placeholder=""
                />
                {validation.matKhau && (
                  <div className="alert alert-danger">{validation.matKhau}</div>
                )}
              </div>
              <button disabled={disabled} className="btn btn-success">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
