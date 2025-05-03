import React, { useState } from "react";
import "../styles/UpdateInfo.css"
import { UpdateData, updateProfile } from "../api/api";


const trainerTypes = [
  "Dragon Tamer",
  "Black Belt",
  "Psychic",
  "Hex Maniac",  
  "Ninja Boy",
  "Fairy Tale Girl",
  "Veteran",
  "Ruin Maniac",
];

export const UpdateInfo = () => {


  const [form, setForm] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    hometown: "",
    trainerType: "",
    favPokemon: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await UpdateData(form);
      
      console.log(res)

    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <form className="trainer-form" onSubmit={handleSubmit}>
      <div className="trainer-form-row">
        <label>Height (cm)</label>
        <input
          type="number"
          name="height"
          min="0"
          value={form.height}
          onChange={handleChange}
          required
        />
      </div>
      <div className="trainer-form-row">
        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight"
          min="0"
          value={form.weight}
          onChange={handleChange}
          required
        />
      </div>
      <div className="trainer-form-row">
        <label>Age</label>
        <input
          type="number"
          name="age"
          min="0"
          value={form.age}
          onChange={handleChange}
          required
        />
      </div>
      <div className="trainer-form-row">
        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="" disabled>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="trainer-form-row">
        <label>Hometown</label>
        <input
          type="text"
          name="hometown"
          value={form.hometown}
          onChange={handleChange}
          required
        />
      </div>
      <div className="trainer-form-row">
        <label>Trainer Type</label>
        <select name="trainerType" value={form.trainerType} onChange={handleChange} required>
          <option value="" disabled>Select type</option>
          {trainerTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="trainer-form-row">
        <label>Favourite Pokémon</label>
        <input
          type="text"
          name="favPokemon"
          value={form.favPokemon}
          onChange={handleChange}
          required
        />
      </div>
      <button className="trainer-form-submit" type="submit">Submit</button>
    </form>
  );
};

