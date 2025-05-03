import React from 'react';
import "../../styles/AboutUser.css";
import { useAppContext } from '../../context/AppContext';
import { Loader } from '../IU/Loader';


export const AboutUser = () => {
    const { userData } = useAppContext();
 

    // Show loading screen while userData is undefined or null
    if (!userData) return <Loader/>;

    const stats = [
        { label: 'Height', value: userData.height, max: 150 },
        { label: 'Weight', value: userData.weight, max: 150 },
        { label: 'Age', value: userData.age, max: 100 },
        { label: 'Power', value: userData.power, max: 100 },
        { label: 'Experience', value: userData.experience, max: 100 },
        { label: 'Stamina', value: userData.stamina, max: 100 },
    ];

    return (
        <div className="about-card">
            <div className="about-user-left">
                <div className="about-avatar">
                    {userData.avatarUrl ? (
                        <img src={userData.avatarUrl} alt="User avatar" />
                    ) : (
                        <span>{userData.username ? userData.username[0].toUpperCase() : "U"}</span>
                    )}
                </div>
                <div className="about-user-basic">
                    <div className="about-username">{userData.username || "Trainer"}</div>
                    <div className="about-user-id">ID: 45281</div>
                </div>
            </div>
            <div className="about-user-right">
                <div className="about-user-info">
                    <div><span className="about-label">Gender:</span> {userData.gender || ""}</div>
                    <div><span className="about-label">Hometown:</span> {userData.hometown || ""}</div>
                    <div><span className="about-label">Trainer Type:</span> {userData.trainerType || "noob"}</div>
                    <div><span className="about-label">Favourite Pokémon:</span> {userData.favPokemon || ""}</div>
                </div>
                <div className="about-user-stats">
                    {stats.map((stat, idx) => (
                        <div className="about-stat-row" key={idx}>
                            <label className="about-stat-label">{stat.label}</label>
                            <div className="about-stat-bar-container">
                                <div
                                    className="about-stat-bar"
                                    style={{
                                        width: `${(stat.value / stat.max) * 100}%`,
                                        background:
                                            stat.value > 80
                                                ? "#4caf50"
                                                : stat.value > 50
                                                ? "#ffc107"
                                                : "#f44336"
                                    }}
                                ></div>
                            </div>
                            <span className="about-stat-value">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
