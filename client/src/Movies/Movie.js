import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom"

function Movie( props ) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { goBack } = useHistory();
  
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log("Delete Success", res);
        props.getMovieList();
        goBack();
      })
      .catch(err => 
        console.log("Delete Error", err));
  }


  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="save-button update">
        <Link to={`/update-movie/${movie.id}`}>Edit Movie</Link>
      </div>
      <div className="save-button delete" onClick={() => handleDelete(movie.id)}>
        <p>Delete Movie</p>
      </div>
    </div>
  );
}

export default Movie;
