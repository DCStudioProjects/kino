import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import style from './CSS/Film.module.css'
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { setMany, set, del, get, clear } from 'idb-keyval';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/lazy/lazy.scss';

const Film = () => {
    const { film } = useParams();
    const [info, setInfo] = useState(null);
    const [gallery, setGallery] = useState(null);
    const [add, setAdd] = useState(null);

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

    const Fav = async () => {
        var arr = await get('Избранное');

        if (arr?.find(item => item.id === film) === undefined) {
        if (arr === undefined) {
            var arr = [];
            arr.push({ name: info?.nameRu, poster: info?.posterUrl, id: film });
            console.log(arr);
            set('Избранное', arr);
            setAdd('Удалить из избранного')
        } else {
            if (arr?.find(item => item.id === film) === undefined) {
                console.log(arr.find(item => item.id !== film));
                arr.push({ name: info?.nameRu, poster: info?.posterUrl, id: film });
                console.log(arr);
                set('Избранное', arr);
                setAdd('Удалить из избранного')
            } 
        }
        } else {
            clear();
            setAdd('Добавить в избранное')
        }
    }

    //console.log(gallery)
    return (
        <div className={style.film_container}>
            <Helmet>
                <title>{`${info?.nameRu || 'Произошла ошибка при загрузке данных!'} — смотреть у Дядьки онлайн без регистрации и СМС :)`}</title>
            </Helmet>
            <div className={style.header_film}>
                <h1 className={style.film_title_page}>{info?.nameRu || 'Произошла ошибка при загрузке данных!'}</h1>
                <button onClick={() => {console.log('Нажаль добавить'); Fav();}}>{add}</button>
            </div>
            <div key={film}>
                <div id="yohoho" className={style.player} data-kinopoisk={film} data-resize="1"></div>
            </div>
            <div className={style.container}>
                <img className={style.poster} src={info?.posterUrl}></img>
                <div className={style.content}>
                    <p className={style.film_title}>{info?.nameRu || 'Произошла ошибка при загрузке данных!'}</p>
                    <p>{info?.nameEn}</p>
                    {info?.slogan && (<i>"{info?.slogan}"</i>)}
                    {info?.countries &&(<p>Страна:&nbsp;
                        {info?.countries.map((res, key) => (
                            <span>{res.country}&nbsp;</span>
                    ))}
                    </p>)}
                    {info?.year &&(<p>Год: {info?.year}</p>)}
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
