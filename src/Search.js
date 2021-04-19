import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import style from "./CSS/Search.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Search = () => {
    const { search } = useParams();
    const [result, setResult] = useState(null);
    const [pages, setPages] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${search}&page=1`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const result = await response.json();
            setResult(result)
        }
        Fetch();
    }, [search])
    var arr = [];
    useEffect(() => {
        for (var i = 0; i < result?.pagesCount; i++) {
            arr[i] = i;
        }
        setPages(pages)
    })
    return (
        <div>
            <h1 className={style.search_title}>Результаты поиска по запросу: {search}</h1>
            <div className={style.search_section}>
                {result?.films?.map((res, key) => (
                    <div className={style.search_item} key={key}>
                        <Link to={`/film/${res?.filmId}`}>
                            <img src={res?.posterUrl} className={style.search_image} />
                            <p>{res?.nameRu}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={style.pages}>

            </div>
        </div>
    )
}

export default Search
