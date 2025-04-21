import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/IU/Navbar';
import { PokemonCatalog } from '../components/pokemon/PokemonCatalog';

export const MainSite = () => {
    const { isLogin, userData, getUserData } = useAppContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getUserData();
            setIsLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading && (isLogin === false || userData === null)) {
            navigate('/login');
        }
    }, [isLoading, isLogin, userData, navigate]);

    console.log('isLogin:', isLogin);
    console.log('userData:', userData);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar/>
            {userData && (
                
                    <></>
            )}
        <PokemonCatalog/>
        </>
    );
}