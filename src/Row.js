import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // useState() is something where you can put your variable(dynamic) like arrays, objects, etc.
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code that runs on specific conditions/variable
  useEffect(() => {
    // if [], run once when the row loads and don't run again.
    // if [movies], it runs everytime when the movie changes. a row has lots of movies

    async function fetchData() {
      const request = await axios.get(fetchUrl); //await- wait for the promise to come.

      // console.log(request); // this is just to check what is coming,
      // since we are concerned with the results of data, we have called
      // request.data.results

      // Now, to show movies, we will call the function
      setMovies(request.data.results); // this is an array of movies, we are setting
      return request;
    }

    fetchData();
  }, [fetchUrl]); // if you are using any variable which is outside the useEffect(), then you must use it here

  console.table(movies); // to check in the console the array of movies we are getting.

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8QKqU&t=9142s
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row_posters */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
