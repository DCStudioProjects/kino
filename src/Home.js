import React from 'react'
import Favourite from './Favourite'
import { Helmet } from 'react-helmet-async';

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
