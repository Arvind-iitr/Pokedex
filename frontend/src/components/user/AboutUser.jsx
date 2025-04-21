import React from 'react'
import "../../styles/AboutUser.css"

export const AboutUser = () => {

    const stats = [
        { label: 'Height', value: 120 },
        { label: 'Weight', value: 60 },
        { label: 'Age', value: 21 },
        { label: 'Power', value: 78 },
        { label: 'Experience', value: 88 },
        { label: 'Stamina', value: 72 },
    ];

    return (
        <div className='about-info-container'>
            <div className="about-left">
                <div className="trainer-info">
                    <p><strong>Name: </strong> Rika Blaze</p>
                    <p><strong>Trainer ID: </strong> 45281</p>
                    <p><strong>Gender: </strong>Male</p>
                    <p><strong>Hometown: </strong> Lumiose City, Kalos</p>
                    <p><strong>Trainer Type: </strong> Fire-Type Specialist</p>
                    <p><strong>Partner Pokémon: </strong> Blaziken</p>
                </div>
                
            </div>
            <div className="about-right">
                <div className="about-trainer-stats">
                    {stats.map((stat, index) => (
                        <div className="stat-row" key={index}>
                            <label className="stat-label">{stat.label}</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={stat.value}
                                className="stat-range"
                                readOnly
                            />
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
