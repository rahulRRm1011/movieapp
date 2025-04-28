import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { TextField, Button } from "@mui/material";

const Fetch = () => {
  const [movieName, setMoviename] = useState("");
  const [movie, setmovie] = useState(null);
  const [invalidMovie, setinvalidMovie] = useState(false);

  const apifetch = async () => {
    if (!movieName || invalidMovie) return;
    const api_url = `https://www.omdbapi.com/?apikey=fa1c9c03&t=${movieName}`;
    let result = await fetch(api_url);
    let resultData = await result.json();
    setmovie(resultData);
  };

  const validateForm = (e) => {
    const { value } = e.target;
    !!value.match(/^[a-zA-Z0-9]+$/) ? setinvalidMovie(false) : setinvalidMovie(true);
    setMoviename(value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-3 flex-column bg-warning">
    <div style={{ marginBottom: "20px", alignItems:"center"}}>
      <TextField
        id="outlined-basic"
        label="Movie Name"
        variant="outlined"
        onChange={validateForm}
        error={invalidMovie}
        helperText={invalidMovie ? "Invalid Movie Name" : ""}
      />
      <Button
        variant="contained"
        onClick={apifetch}
        style={{ marginLeft: "10px" }}
      >
        SEARCH
      </Button>
      </div>
      {movie && movie.Response !== "False" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Released</th>
              <th>Director</th>
              <th>Writer</th>
              <th>Actors</th>
              <th>Language</th>
              <th>Country</th>
              <th>Awards</th>
              <th>Poster</th>
              <th>Ratings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{movie.Title}</td>
              <td>{movie.Released}</td>
              <td>{movie.Director}</td>
              <td>{movie.Writer}</td>
              <td>{movie.Actors}</td>
              <td>{movie.Language}</td>
              <td>{movie.Country}</td>
              <td>{movie.Awards}</td>
              <td>
                <img src={movie.Poster} alt="Poster" style={{ width: "100px" }} />
              </td>
              <td>
                {movie.Ratings?.map((rating, index) => (
                  <div key={index}>{rating.Source}: {rating.Value}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
      )}

      {movie && movie.Response === "False" && (
        <div style={{ marginTop: "20px", color: "red" }}>
          Movie not found.
        </div>
      )}
    
    </div>
  );
};

export default Fetch;
