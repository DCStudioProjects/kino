import React, { useEffect, useState } from 'react'
import style from './CSS/Header.module.css'
import { BrowserRouter as Router, Link } from "react-router-dom";

const Favourite = () => {

    const [films, setFilms] = useState([]);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(
                "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1", {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            }
            );
            const result = await response.json();
            setFilms(result.films.slice(0, 9));
        }
        Fetch();
    }, [])

    return (
        <div className={style.popular_section}>
            {films.map((res, key) => (
                <div className={style.popular} key={key}>
                    <img className={style.popular_image} src={res.posterUrl}></img>
                    <Link to={`/film/${res.filmId}`} >{res.nameRu}</Link>
                </div>
            ))}
        </div>
    )
}

export default Favourite