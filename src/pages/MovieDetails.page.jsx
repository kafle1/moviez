import React from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import Footer from '../components/Footer'
const MovieDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <MovieDetail id={id} />
      <Footer/>
    </div>
  );
};

export default MovieDetails;
