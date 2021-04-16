import React, { useState } from 'react'
import style from './CSS/Header.module.css'
import { BrowserRouter as Router, Link } from "react-router-dom";

const Home = () => {

    const [display, setDisplay] = useState(false);
    const [input, setInput] = useState('');
    const [border, setBorder] = useState(null);
    const [search, setSearch] = useState(['Ничего не найдено']);
    const [status, setStatus] = useState('Пустой поисковый запрос');

    const nav = [
        { url: '/', text: 'Главная' },
        { url: '/new', text: 'Новинки в HD' },
        { url: '/new', text: 'Сериалы' },
        { url: '/new', text: 'Фильмы' },
        { url: '/new', text: 'Мультсериалы' },
        { url: '/new', text: 'Подборки' }
    ]

    const Fetch = async () => {
        setStatus('Загрузка...')
        await new Promise(r => setTimeout(r, 1500));
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${input}&page=1`, {
            headers: {
                "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
            }
        });
        const result = await response.json();
        setSearch(result.films);

        if (result.films.length === 0 || result.films[0] === "Ничего не найдено" || result.films[0] === undefined) {
            setStatus('Ничего не найдено')
        } else {
            setDisplay(true);
            setBorder('opened')
            setStatus(false)
        }
    }
    const Click = () => {
        if (display === false) {
            setBorder('opened')
        } else {
            setBorder('')
        }
    }
    return (
        <div>
            <header>
                <Link to={'/'} className={style.logo}>Дядька в кино</Link>
                <div className={style.search}>
                    <input type="text" className={`search_input ${border}`} onClick={() => { setDisplay(!display); Click(); }} onChange={e => { setInput(e.target.value); setDisplay(true); setBorder('opened'); Fetch(); }} placeholder="Привет от дядьки! ❤️"></input>
                    {display && (<div className={style.search_results}>
                        {status && (<p className={style.loading}>{status}</p>)}
                        {search.map((res, key) => (
                            <div className={style.search_result} key={key}>
                                <Link className={style.search_result} to={`/film/${res.filmId}`} key={key} onClick={() => { setDisplay(!display); setBorder(''); console.log(input) }}>
                                    <img className={style.result_image} src={res.posterUrl}></img>
                                    <div>
                                        <p>{res.nameRu}</p>
                                        {res.rating !== undefined && (<p>Рейтинг: {res.rating} ({res.ratingVoteCount})</p>)}
                                        {res.year !== undefined && (<p>Год: {res.year}</p>)}
                                        <p>{res.description}</p>
                                        {res.genres !== undefined && (<p> Жанры:&nbsp;
                                            {res?.genres?.map((res) => (
                                                <>{res.genre} </>
                                            ))}
                                        </p>)}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>)}
                </div>
            </header>
            <nav className={style.nav}>
                {nav.map((res, key) => (
                    <Link to={`${res.url}`} key={key}>{res.text}</Link>
                ))}
            </nav>

        </div >
    )
}

export default Home
