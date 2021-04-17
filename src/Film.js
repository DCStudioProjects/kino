import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import style from './CSS/Film.module.css'
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/lazy/lazy.scss';

const Film = () => {
    const { film } = useParams();
    const [info, setInfo] = useState(null);
    const [gallery, setGallery] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['Favourite']);

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${film}`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const result = await response.json();
            //console.log(result.data);
            setInfo(result.data);
        }
        Fetch();
    }, [film])

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//yohoho.cc/yo.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
          }
    }, [film])

    useEffect(() => {
        const Fetch = async () => {
        const response = await fetch (`https://kinopoiskapiunofficial.tech/api/v2.1/films/${film}/frames`, {
            headers: {
                "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
            }
        });
        const result = await response.json();
        setGallery(result.frames)
    }
    Fetch();
    }, [film])
    //console.log(gallery)
    return (
        <div className={style.film_container}>
            <Helmet>
                <title>{`${info?.nameRu} — смотреть у Дядьки онлайн без регистрации и СМС :)`}</title>
            </Helmet>
            <h1 className={style.film_title_page}>{info?.nameRu} — смотреть у Дядьки</h1>
            <button onClick={() => {console.log('Нажаль добавить'); localStorage.setItem('id', film)}}>Добавить в избранное</button>
            <button onClick={() => {console.log('Нажаль удалить'); removeCookie('Favourite', { path: '/' }); console.log(cookies)}}>Удалить</button>

            <div key={film}>
                <div id="yohoho" className={style.player} data-kinopoisk={film}></div>
            </div>
            <div className={style.container}>
                <img className={style.poster} src={info?.posterUrl}></img>
                <div className={style.content}>
                    <p className={style.film_title}>{info?.nameRu}</p>
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
                    <p className={style.description_desc}>{info?.description}</p>
                </div>
            </div>
            <p className={style.description_mob}>{info?.description}</p>

            <div className={style.gallery}>
            <Swiper
                spaceBetween={50}
                navigation
                lazy={{loadPrevNext: true}}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {gallery?.map((res, key) =>(
                    <SwiperSlide>
                        <img data-src={res?.image} className="swiper-lazy" />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Film
