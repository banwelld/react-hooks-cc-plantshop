import React, { useState } from "react";

function NewPlantForm({ setterCallback }) {

  // State variables

  const [plantInfo, setPlantInfo] = useState({ name: '', image: '', price: '' });

  // Server interaction function

  const addNewPlant = () => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(plantInfo),
    })
     .then((r) => r.json())
     .then((newPlant) => setterCallback(newPlant));
  };

  // Event handlers

  const handleFormInfoChange = (e) => {
    setPlantInfo({...plantInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPlant();
    setPlantInfo({ name: '', image: '', price: '' });
  };

  // Component JSX

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={plantInfo.name}
          placeholder="Plant name"
          onChange={handleFormInfoChange}
        />
        <input
          type="text"
          name="image"
          value={plantInfo.image}
          placeholder="Image URL"
          onChange={handleFormInfoChange}
          />
        <input
          type="number"
          name="price"
          step="0.01"
          value={plantInfo.price}
          placeholder="Price"
          onChange={handleFormInfoChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
