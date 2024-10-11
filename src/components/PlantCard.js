import React, { useState, useEffect, useRef, useCallback } from 'react';
import CardButton from './CardButton';

function PlantCard({ pushDelete, pushUpdate, plantInfo: { id, name, image, price } }) {

  // State variables

  const [isInStock, setInStock] = useState(true);
  const [isEditState, setEditState] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [userPrice, setUserPrice] = useState(price);

  // Ref for the price input field

  const priceRef = useRef(null);

  // Server interaction functions

  const updatePlantInfo = useCallback((plantObj) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(plantObj),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        pushUpdate(updatedPlant);
      });
  }, [id, pushUpdate]);

  const deletePlantInfo = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then(() => pushDelete(id));
  };

  // Event handler for saving plant price

  const saveNewPrice = useCallback(() => {
    const newPrice = parseFloat(userPrice);

    if (!isNaN(newPrice) && newPrice > 0) {
      if (newPrice !== price) updatePlantInfo({ price: newPrice });
      setEditState(false);
    } else alert("Invalid price. Please enter a positive number.");

  }, [price, userPrice, updatePlantInfo]);

  // Effect to focus the price input field

  useEffect(() => {
    if (isEditState && priceRef.current) {
      const inputEl = priceRef.current;
      inputEl.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          saveNewPrice();
        } else if (e.key === 'Escape') {
          setEditState(false);
        }
      };

      inputEl.addEventListener('keydown', handleKeyDown);
      
      return () => inputEl.removeEventListener('keydown', handleKeyDown);
    }
  }, [isEditState, saveNewPrice]);

  // Event handlers

  const toggleInStock = () => setInStock((prevState) => !prevState);
  const togglePriceEdit = () => setEditState((prevState) => !prevState);
  const handlePriceChange = (e) => setUserPrice(e.target.value);

  // Mouse event handlers

  const toggleMouseState = () => setHovered(prevState => !prevState);

  // Component JSX

  return (
    <li
      id={id}
      className="card"
      data-testid={"plant-item"}
      onMouseEnter={toggleMouseState}
      onMouseLeave={toggleMouseState}
    >

      {isHovered && (
        <div className="delete-banner" onClick={deletePlantInfo}>Delete Plant</div>
      )}

      <img src={image} alt={name} />
      <div className="flex cont horiz">
        <h4>{name}</h4>
      </div>

      {!isEditState ? (
        <p>Price: ${price}</p>
      ) : (
        <input
          className="price-input"
          type="number"
          step="0.01"
          ref={priceRef}
          value={userPrice}
          onChange={handlePriceChange}
        />
      )}

      <div className="flex cont vert">
        <CardButton
          activeState={isInStock}
          actionCallback={toggleInStock}
          buttonTextTrue="In Stock"
          buttonTextFalse="Out of Stock"
        />
        <CardButton
          activeState={isEditState}
          actionCallback={togglePriceEdit}
          buttonTextTrue="Save Price"
          buttonTextFalse="Edit Price"
        />
      </div>
    </li>
  );
}

export default PlantCard;