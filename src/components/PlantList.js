import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ pushUpdate, pushDelete, plantData }) {

  // Plant card list

  const plantCards = plantData.map((plant) => (
    <PlantCard
      key={plant.id}
      pushUpdate={pushUpdate}
      pushDelete={pushDelete}
      plantInfo={plant}
    />
  ));

  // Component JSX

  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
