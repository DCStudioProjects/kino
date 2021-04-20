import React, { useEffect, useState } from 'react'
import style from './CSS/Favourite.module.sass'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { get } from 'idb-keyval';

const Favourite = () => {

    const [favourite, setFavourite] = useState(null);

    useEffect(() => {
        const Favourite = async () => {
            setFavourite(await get('Избранное'));
            if (await get('Избранное') === undefined) {
                setFavourite([{ blank: 'Пока здесь пусто :(' }]);

            }
        }
        Favourite();
    }, [])

    return (
        <div className={style.favourite_section}>
            <p className={style.favourite_title}>Избранное</p>
            <div className={style.favourite}>
                {favourite?.map((res, key) => (
                    <div className={style.favourite_item} key={key}>
                        <p>{res?.blank}</p>
                        <Link to={`/film/${res?.id}`}><img className={style.favourite_image} alt={res?.name} src={res?.poster}></img>
                            <p>{res?.name}</p></Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Favourite