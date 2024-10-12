import React, { useState } from 'react';
import CardButton from './CardButton';

function PlantCard({ pushDelete, pushUpdate, plantInfo: { id, name, image, price } }) {

  // State variables

  const [isInStock, setInStock] = useState(true);
  const [isEditState, setEditState] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [inputPrice, setInputPrice] = useState(price);

  // Server interaction functions

  const updatePlantInfo = (plantObj) => {
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
  };

  const deletePlantInfo = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then(() => pushDelete(id));
  };

  // Event handlers

  const toggleInStock = () => setInStock((prevState) => !prevState);
  const toggleEditState = () => setEditState((prevState) => !prevState);
  const toggleMouseState = () => setHovered((prevState) => !prevState);
  const handleInputChange = (e) => setInputPrice(e.target.value);

  const handleEditPriceClick = () => {
    switch (isEditState) {
      case true:
        processPriceUpdate(inputPrice);
        break;
      default:
        toggleEditState();
        break;
    }
  };

  // Price update function

  function processPriceUpdate(newPrice) {
    const numPrice = parseFloat(newPrice)
    if (!isNaN(numPrice) && numPrice > 0) { // Check validity
      if (numPrice !== price) { // Update prices that differ from the current
        updatePlantInfo({ price: numPrice })
      };
      toggleEditState();
    } else {
      // Alert user to invalid price and remain in edit state so user can re-enter
      alert("Invalid price. Please enter a positive number.");
    };
  };

  // Component JSX

  return (
    <li
      id={id}
      className="card"
      data-testid={"plant-item"}
      onMouseEnter={toggleMouseState}
      onMouseLeave={toggleMouseState}
    >

      {isHovered &&
        <div
          className="delete-banner"
          onClick={deletePlantInfo}
        >
          Delete Plant
        </div>
      }

      <img src={image} alt={name} />
      <div className="flex cont horiz">
        <h4>{name}</h4>
      </div>

      {!isEditState ? <p>Price: {price}</p> :
        <input
          className="price-input"
          type="number"
          step="0.01"
          value={inputPrice}
          onChange={handleInputChange}
          autofocus
        />
      }

      <div className="flex cont vert">
        <CardButton
          activeState={isInStock}
          actionCallback={toggleInStock}
          buttonTextTrue="In Stock"
          buttonTextFalse="Out of Stock"
        />
        <CardButton
          activeState={isEditState}
          actionCallback={handleEditPriceClick}
          buttonTextTrue="Save Price"
          buttonTextFalse="Edit Price"
        />
      </div>
    </li>
  );
}

export default PlantCard;