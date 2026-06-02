import { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../Component/Movie";
import Loader from "../Component/Loader";
import api from "./../../../services/api";

export default function Home() {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    const getListMovie = async () => {
      try {
        // pending => update loading: true
        setState({
          ...state,
          loading: true,
        });

        const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
        // success
        setState({
          ...state,
          loading: false,
          data: result.data.content,
        });
      } catch (error) {
        // fail
        setState({
          ...state,
          loading: false,
          error: error,
        });
      }
    };

    getListMovie();
  }, []);

  const renderListMovie = () => {
    const { data } = state;
    if (data) {
      return data.map((movie) => {
        return <Movie key={movie.maPhim} movie={movie} />;
      });
    }
  };

  if (state.loading) return <Loader />;

  return (
    <div>
      <h1>Home</h1>
      <div className="container">
        <div className="row">{renderListMovie()}</div>
      </div>
    </div>
  );
}
