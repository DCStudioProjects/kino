import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import style from './CSS/Film.module.css'
import { Helmet } from 'react-helmet-async';

const Film = () => {
    const { film: id } = useParams();
    const [name, setName] = useState(null);
    const [info, setInfo] = useState(null);

    console.log(id)
    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const result = await response.json();
            console.log(result.data);
            setInfo(result.data);
        }
        Fetch();
    }, [id])
    useEffect(() => {
        setName(id)
    }, [id])

    return (
        <div>
            <div className={style.container}>
                <img className={style.poster} src={info?.posterUrl}></img>
                <div className={style.content}>
                    <h1>{info?.nameRu}</h1>
                    <p>{info?.nameEn}</p>
                    {info?.slogan !== null && (<i>"{info?.slogan}"</i>)}
                    <p>Страна:&nbsp;
            {info?.countries.map((res, key) => (
                        <>{res.country}&nbsp;</>
                    ))}
                    </p>
                    <p>Год: {info?.year}</p>
                    <p>Режиссёр: </p>
                    <p>Я на <select>
                        {info?.seasons.map((res, key) => (
                            <option>{res.number}</option>
                        ))}
                    </select> сезоне и
            на <select>
                            {info?.seasons.map((res, key) => {
                                res?.episodes.map((res, key) => (
                                    <option>{res?.nameEn}</option>
                                ))
                            }
                            )}
                        </select> серии

            </p>
                    <p>{info?.description}</p>
                    <Helmet>
                        <script src="//yohoho.cc/yo.js"></script>
                        <title>{`${name} смотреть у Дядьки`}</title>
                    </Helmet>
                </div>
            </div>
            <div id="yohoho" className={style.player} data-kinopoisk={`${name}`}></div>

        </div>
    )
}

export default Film
