import React, { useState, useEffect } from 'react';
import style from './CSS/Header.module.css';
import { BrowserRouter as Router, Link } from "react-router-dom";
import ScrollContainer from 'react-indiana-drag-scroll'

const Home = () => {

    const [nav, setNav] = useState(null);
    const [display, setDisplay] = useState(false);
    const [border, setBorder] = useState(null);
    const [search, setSearch] = useState(['Загрузка...']);
    const [status, setStatus] = useState('Пустой поисковый запрос');

    useEffect(() => {
        const Nav = async () => {
            const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/filters', {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            })
            const result = await response.json();
            setNav(result.genres)
        }
        Nav();
    }, [])

    useEffect(() => {
        const overflow = display === false ? 'auto' : 'hidden'
        document.body.style.overflowY = overflow;

    }, [display])
    const Fetch = async (input) => {
        setStatus('Загрузка...');
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${input}&page=1`, {
            headers: {
                "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
            }
        });
        const result = await response.json();
        await new Promise(r => setTimeout(r, 2000));

        setSearch(result.films);

        setStatus(false);

        if (input.length < 1) {
            setSearch([]);
            console.log('пустой')
            setStatus('Пустой запрос');
        }

        if (result?.searchFilmsCountResult === 0 && result?.keyboard !== "") {
            setStatus('Ничего не найдено')
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
                <div className={style.links}>
                    <Link to={'/'} className={style.logo}>Дядька в кино</Link>
                    <a className={style.ecosystem} href='https://dnazakaz.gq/' target='_blank' rel="noreferrer">#Назаказ</a>
                    <a className={style.ecosystem} href='https://namore.gq/' target='_blank' rel="noreferrer">#Наморе</a>
                </div>
                <div className={`search ${border}`}>
                    <input type="text" className={`search_input ${border}`} onClick={() => { setDisplay(!display); Click(); }} onChange={e => { setDisplay(true); setBorder('opened'); Fetch(e.target.value); }} placeholder="Привет от дядьки! ❤️"></input>
                    {display && (<div className={style.search_results}>
                        {status && (<p className={style.loading}>{status}</p>)}
                        {search?.map((res, key) => (
                            <div className={style.search_result} key={key}>
                                <Link className={style.search_result} draggable='false' to={`/film/${res?.filmId}`} key={key} onClick={() => { setDisplay(!display); setBorder('') }}>
                                    <img className={style.result_image} alt={res?.nameRu} src={res?.posterUrl}></img>
                                    <div>
                                        <p>{res?.nameRu}</p>
                                        {res?.rating !== undefined && (<p>Рейтинг: {res?.rating} ({res?.ratingVoteCount})</p>)}
                                        {res?.year !== undefined && (<p>Год: {res?.year}</p>)}
                                        {res?.genres !== undefined && (<p> Жанры:&nbsp;
                                            {res?.genres?.map((res) => (
                                                <>{res?.genre} </>
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
                <ScrollContainer className="scroll-container" horizontal='true' hideScrollbars='false'>

                    {nav?.map((res, key) => (
                        <Link to={`/genre/${res?.id}`} key={key} draggable='false' className={style.nav_element}>{res?.genre}</Link>
                    ))}
                </ScrollContainer>
            </nav>
        </div >
    )
}

export default Home
