import React, { useEffect, useState } from 'react'
import style from './CSS/Favourite.module.css'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { setMany, set, del, get, clear } from 'idb-keyval';

const Favourite = () => {

    const [films, setFilms] = useState([]);
    const [favourite, setFavourite] = useState(null);

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
            setFilms(result?.films?.slice(0, 9));
        }
        Fetch();
    }, [])

    useEffect(() => {
        const Favourite = async () => {
            setFavourite(await get('Избранное'));
            if (await get('Избранное') === undefined) {
                setFavourite([{ blank: 'Пока здесь пусто :(' }]);

            }
        }
        Favourite();
    }, [])

    console.log(favourite)

    return (
        <div className={style.favourite_section}>
            <p className={style.favourite_title}>Избранное</p>
            <div className={style.favourite}>
                {favourite?.map((res, key) => (
                    <div className={style.favourite_item} key={key}>
                        <p>{res?.blank}</p>
                        <Link to={`/film/${res.id}`}><img className={style.favourite_image} alt='Произошла ошибка при загрузке данных!' src={res.poster}></img>
                            <p>{res.name || 'Произошла ошибка при загрузке данных!'}</p></Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Favourite