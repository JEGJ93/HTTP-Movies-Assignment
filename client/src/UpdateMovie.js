import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
    const [edit, setEdit] = useState({
        
        title: "",
        director: "",
        metascore: "",
        stars: []

      })

    const { id } = useParams();
    const { goBack } = useHistory();

        useEffect(() => {
            axios
                .get(`http://localhost:5000/api/movies/${id}`)
                .then((res) => {
                    console.log("API Response", res);
                    setEdit( res.data )
                })
                .catch((err) => 
                console.log("API Error", err))
            
            console.log(props.movies)
        }, [id])

        const submitHandler = e => {
            e.preventDefault();

            axios
                .put(`http://localhost:5000/api/movies/${edit.id}`, edit)  
                .then((res) => {
                    console.log("Submit Success", res);
                props.getMovieList();
                goBack();
            })
            .catch((err) => 
            console.log("Submit Error", err)) 
        };

        const handleChanges = e => {
            e.persist();
            setEdit({ ...edit, [e.target.name]: e.target.value})

        }

        return (
            <div>
                <form onSubmit={submitHandler}>
                    <h1>Update Form</h1>
                        <label htmlFor="title">
                            <input name="title" type="text" placeholder="Enter Title" onChange={handleChanges} />
                        </label>
                        <label htmlFor="director">
                            <input name="director" type="text" placeholder="Enter Director" onChange={handleChanges} />
                        </label>
                        <label htmlFor="metascore">
                            <input name="metascore" type="text" placeholder="Enter Metascore" onChange={handleChanges} />
                        </label>
                        <label htmlFor="stars">
                            <input name="stars" type="text" placeholder="Enter Stars" onChange={handleChanges} />
                        </label>
                        <button>Update Movie</button>
                </form>
            </div>
        )
}

export default UpdateMovie;