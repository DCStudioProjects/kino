import React from 'react';
import { Helmet } from 'react-helmet-async';
import Favourite from './Home/Favourite';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>{`Привет, это Дядька в кино!`}</title>
            </Helmet>
            <Favourite />
        </div>
    )
}

export default Home
