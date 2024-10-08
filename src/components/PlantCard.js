import React, { useState } from "react";

function PlantCard({ plant }) {

  // Destructured props

  const { name, image, price } = plant;

  // State variables

  const [inStock, setInStock] = useState(true)

  // Event handlers

  const toggleInStock = () => setInStock(prevState => !prevState);

  // Component JSX

  return (
    <li className="card" data-testid={"plant-item"}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={toggleInStock}>In Stock</button>
      ) : (
        <button onClick={toggleInStock}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
