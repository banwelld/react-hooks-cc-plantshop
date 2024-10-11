import React, { useState, useEffect, useRef, useCallback } from "react";

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
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  // Component JSX
  return (
    <li
      id={id}
      className="card"
      data-testid={"plant-item"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{position: "relative"}}
    >
      <img src={image} alt={name} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h4>{name}</h4>
      </div>

      {!isEditState ? (
        <p>Price: ${price}</p>
      ) : (
        <input
          type="number"
          step="0.01"
          ref={priceRef}
          value={userPrice}
          style={{
            border: "1px solid var(--green)",
            fontFamily: "Arial",
            fontSize: "14px",
          }}
          onChange={handlePriceChange}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {isInStock ? (
          <button className="primary" onClick={toggleInStock}>
            In Stock
          </button>
        ) : (
          <button onClick={toggleInStock}>Out of Stock</button>
        )}
        {!isEditState ? (
          <button className="primary" onClick={togglePriceEdit}>
            Update Price
          </button>
        ) : (
          <button onClick={saveNewPrice}>Save Price</button>
        )}
      </div>
      {isHovered && (
        <div
          onClick={deletePlantInfo}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "16px",
            backgroundColor: "black",
            opacity: 0.35,
            color: "white",
            fontWeight: "bold",
            fontSize: "12px",
            fontFamily: "Arial",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            cursor: "pointer"
          }}
        >
          Delete plant
        </div>
      )}
    </li>
  );
}

export default PlantCard;