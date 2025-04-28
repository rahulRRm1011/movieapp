import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TextField, Button } from '@mui/material';

const Fetch = () => {
    const [movieName,setMoviename] = useState(null)
  const [movie, setmovie] = useState(null);
  const [invalidMovie,setinvalidMovie]=useState(false)
  const api_url = "https://www.omdbapi.com/?apikey=fa1c9c03&t=${movieName}";
  const apifetch = async () => {
    if (!movieName || invalidMovie) return;
    let result = await fetch(api_url);
    let resultData = await result.json();

    setmovie(resultData);
  };
  useEffect(() => {
    apifetch();
  }, []);
  console.log(movie);

  
  const validateForm=(e)=>{
    const {value} =e
    !!value(/^[a-zA-z0-9]+$/)? setinvalidMovie(false) :setinvalidMovie(true)
  setMoviename(value)
 }


  }
  
  return (
         
        
      <div style={{ marginBottom: "20px" }}>
        <TextField
          id="outlined-basic"
          label="Movie Name"
          variant="outlined"
          onChange={(e)=>validateForm(e.target.value)}
          
        />
        <Button
          variant="contained"
          onClick={apifetch}
          style={{ marginLeft: "10px" }}
        >
          SEARCH
        </Button>
      </div>

        {movie && 
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Released</th>
              <th>Director</th>
              <th>Writer</th>
              <th>Actors</th>
              <th>language</th>
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
                <img src={movie.Poster} alt="" /></td>
            
            </tr>
          </tbody>
        </Table>
      }

  )


export default Fetch;
