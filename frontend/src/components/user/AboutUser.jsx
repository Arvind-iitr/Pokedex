import React from 'react';
import "../../styles/AboutUser.css";
import { useAppContext } from '../../context/AppContext';

export const AboutUser = () => {
    const stats = [
        { label: 'Height', value: 120, max: 150 },
        { label: 'Weight', value: 60, max: 150 },
        { label: 'Age', value: 21, max: 100 },
        { label: 'Power', value: 78, max: 100 },
        { label: 'Experience', value: 88, max: 100 },
        { label: 'Stamina', value: 72, max: 100 },
    ];

    const { userData } = useAppContext();

    return (
        <div className="about-card">
            <div className="about-user-left">
                <div className="about-avatar">
                    {userData?.avatarUrl ? (
                        <img src={userData.avatarUrl} alt="User avatar" />
                    ) : (
                        <span>{userData?.username ? userData.username[0].toUpperCase() : "U"}</span>
                    )}
                </div>
                <div className="about-user-basic">
                    <div className="about-username">{userData?.username || "Trainer"}</div>
                    <div className="about-user-id">ID: 45281</div>
                </div>
            </div>
            <div className="about-user-right">
                <div className="about-user-info">
                    <div><span className="about-label">Gender:</span> {userData?.gender || "male"}</div>
                    <div><span className="about-label">Hometown:</span> {userData?.hometown || "sikar"}</div>
                    <div><span className="about-label">Trainer Type:</span> {userData?.trainerType || "bug"}</div>
                    <div><span className="about-label">Favourite Pokémon:</span> {userData?.favPokemon || "pikachu"}</div>
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
