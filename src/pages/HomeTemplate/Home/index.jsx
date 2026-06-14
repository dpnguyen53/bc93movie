import { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../Component/Movie";
import Loader from "../Component/Loader";
import api from "./../../../services/api";
import { getListMovie } from "./silce";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const disptach = useDispatch();
  const state = useSelector((state) => state.homeReducer);

  useEffect(() => {
    disptach(getListMovie());
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
