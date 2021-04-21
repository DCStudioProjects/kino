import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import style from "./CSS/Genre.module.sass";

const Genre = () => {
    const { genre, number } = useParams();
    const [result, setResult] = useState(null);
    const [pages, setPages] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const title = genre[0].toUpperCase() + genre.slice(1)
            setCategory(title);
            const idresponse = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/filters`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const idresult = await idresponse.json();
            const id = idresult?.genres.filter((res) => {
                if (res.genre === genre) {
                    return res
                }
            })[0].id
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${id}&page=${number}`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const result = await response.json();
            var arr = [];
            for (var i = 0; i < result?.pagesCount; i++) {
                arr[i] = i;
            }
            setPages(arr);
            setResult(result)
        }
        Fetch();
    }, [genre, number])

    return (
        <div>
            <h1 className={style.genre_title}>{category}</h1>
            {(number > result?.pagesCount) && (<h1 className={style.genre_title}>Результатов поиска оказалось немного меньше :(</h1>)}
            <div className={style.genre_section}>
                {result?.films?.map((res, key) => (
                    <Link to={`/film/${res?.filmId}`}>
                        <div className={style.genre_item} key={key} style={{ backgroundImage: `url(${res?.posterUrl})` }}>
                        </div>
                        <p>{res?.nameRu}</p>
                    </Link>
                ))}
            </div>
            <div className={style.pages}>
                {number > 1 && (<Link to={`${Number(number) - 1}`}><span className={style.pages_a}>&lt;</span></Link>)}
                {pages?.map((res, key) => (
                    <NavLink to={`${res + 1}`} key={key} className={style.pages_a} activeClassName={style.pages_a_active}>{res + 1}</NavLink>
                ))}
                {number < result?.pagesCount && (<Link to={`${Number(number) + 1}`}><span className={style.pages_a}>&gt;</span></Link>)}
            </div>
        </div >
    )
}

export default Genre
