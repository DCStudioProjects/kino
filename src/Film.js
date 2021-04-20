import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import style from './CSS/Film.module.sass';
import { Helmet } from 'react-helmet-async';
import SwiperCore, { Navigation, A11y, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { set, get, clear } from 'idb-keyval';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/lazy/lazy.scss';

SwiperCore.use([Navigation, A11y, Lazy]);

const Film = () => {
    const { film } = useParams();
    const [info, setInfo] = useState(null);
    const [gallery, setGallery] = useState(null);
    const [add, setAdd] = useState(null);
    const [staff, setStaff] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            var arr = await get('Избранное');
            if (arr?.find(item => item.id === film) === undefined) {
                setAdd('Добавить в избранное')
            } else {
                setAdd('Удалить из избранного')
            }
        }
        Fetch();
    }, [film])

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${film}?append_to_response=RATING`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const result = await response.json();
            setInfo(result);
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
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${film}/frames`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const result = await response.json();
            setGallery(result.frames.reverse())
        }
        Fetch();
    }, [film])

    useEffect(() => {
        const Fetch = async () => {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${film}`, {
                headers: {
                    "X-API-KEY": "ceff3505-c77c-450a-8abb-aa29f638f5ee"
                }
            });
            const result = await response.json();
            setStaff(result)
        }
        Fetch();
    }, [film])

    const Fav = async () => {
        var arr = await get('Избранное');

        if (arr?.find(item => item.id === film) === undefined) {
            if (arr === undefined) {
                arr = [];
                arr.push({ name: info?.data.nameRu, poster: info?.data.posterUrl, id: film });
                set('Избранное', arr);
                setAdd('Удалить из избранного')
            } else {
                if (arr?.find(item => item.id === film) === undefined) {
                    arr.push({ name: info?.data.nameRu, poster: info?.data.posterUrl, id: film });
                    set('Избранное', arr);
                    setAdd('Удалить из избранного')
                }
            }
        } else {
            console.log(arr);
            arr?.reduce((resarr, res, index) => {
                console.log(res)
                if (res.id === film) {
                    arr.splice(index, 1)
                }
            }, [])
            console.log(arr);
            set('Избранное', arr);
            setAdd('Добавить в избранное')
        }
    }

    return (
        <div className={style.film_container}>
            <Helmet>
                <title>{`${info?.data.nameRu || 'Произошла ошибка при загрузке данных!'} — смотреть у Дядьки онлайн без регистрации и СМС :)`}</title>
            </Helmet>

            <div key={film} className={style.film_player}>
                <div id="yohoho" className={style.player} data-kinopoisk={film} data-resize="1"></div>
            </div>

            <h1 className={style.film_title}>{info?.data.nameRu || 'Произошла ошибка при загрузке данных!'}</h1>

            <div className={style.container}>
                <div className={style.poster_panel}>
                    <img className={style.poster} alt={info?.data.nameRu} src={info?.data.posterUrl}></img>
                </div>
                <div className={style.content}>
                    <p>{info?.data.nameEn}</p>
                    {info?.data.slogan && (<i>«{info?.data.slogan}»</i>)}
                    {info?.data.countries && (<p>Страна:&nbsp;
                        {info?.data.countries.map((res, key) => (
                            <span key={key}>{res?.country}&nbsp;</span>
                        ))}
                    </p>)}
                    {info?.data.year && (<p>Год: {info?.data.year}</p>)}
                    <div className={style.rating}>
                        <span className={style.kp_rate}>
                            <p>КП</p><p>{info?.rating.rating}</p>
                        </span>
                        <span className={style.imdb_rate}>
                            <p>IMDb</p><p>{info?.rating.ratingImdb}</p>
                        </span>
                    </div>
                    <p className={style.description_desc}>{info?.data.description}</p>
                    {(<div className={style.directors}><p>Режиссёр:&nbsp;</p>{staff?.filter(res => {
                        if (res?.professionText?.includes('Режиссеры')) {
                            return res
                        }
                        return res

                    }).slice(0, 1).map((res, key) => (
                        <p key={key}>{res?.nameRu}&nbsp;&nbsp;</p>
                    ))}</div>)}
                    {(<div className={style.directors}><p>Актёры:&nbsp;</p>{staff?.filter(res => {
                        if (res?.professionText?.includes('Актеры')) {
                            return res
                        }
                        return null

                    }).slice(0, 3).map((res, key) => (
                        <p key={key}>{res?.nameRu}&nbsp;&nbsp;</p>
                    ))}</div>)}

                </div>
            </div>
            <p className={style.description_mob}>{info?.data.description}</p>
            <div className={style.additional_block}>
                <div className={style.additional_info}>
                    <button className={style.favourite_button} onClick={() => { Fav(); }}>{add}</button>
                </div>
                <Swiper
                    spaceBetween={50}
                    navigation
                    lazy={{ loadPrevNext: true }}
                    slidesPerView={2}
                >
                    {gallery?.map((res, key) => (
                        <SwiperSlide key={key}>
                            <img data-src={res?.image} alt={info?.data.nameRu} className="swiper-lazy" />
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Film
