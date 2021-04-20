import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import style from "./CSS/Search.module.sass";
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";

const Search = () => {
    const { search, number } = useParams();
    const [result, setResult] = useState(null);
    const [pages, setPages] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${search}&page=${number}`, {
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
    }, [search, number])
    return (
        <div>
            {search !== 'null' && search !== ' ' && (<h1 className={style.search_title}>Результаты поиска по запросу: "{search}"</h1>)}
            {(search === 'null' || search === ' ')  && (<h1 className={style.search_title}>Пустой поисковый запрос</h1>)}
            {search !== 'null' && search !== ' ' && (<div>
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
                    {number > 1 && (<Link to={`/${number - 1}`}><span className={style.pages_a}>&lt;</span></Link>)}
                    {pages?.map((res, key) => (
                        <NavLink to={`${res + 1}`} key={key} className={style.pages_a} activeClassName={style.pages_a_active}>{res + 1}</NavLink>
                    ))}
                    {number < result?.pagesCount && (<Link to={`/${number + 1}`}><span className={style.pages_a}>&gt;</span></Link>)}
                </div>
            </div>)}
        </div>
    )
}

export default Search
