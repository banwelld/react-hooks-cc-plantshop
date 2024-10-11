import React, { useState } from "react";

function NewPlantForm({ pushNewPlant }) {

  // Empty plant object

  const emptyPlant = { name: '', image: '', price: '' };

  // State variables

  const [plantInfo, setPlantInfo] = useState({ ...emptyPlant });

  // Event handlers

  const handleFormInfoChange = (e) => {
    setPlantInfo({...plantInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    pushNewPlant(plantInfo);
    setPlantInfo({ ...emptyPlant });
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
          autoComplete="off"
          onChange={handleFormInfoChange}
        />
        <input
          type="text"
          name="image"
          value={plantInfo.image}
          placeholder="Image URL"
          autoComplete="off"
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
