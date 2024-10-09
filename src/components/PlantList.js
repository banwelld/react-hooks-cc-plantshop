import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plantData }) {

  // Plant card list

  const plantCards = plantData.map((plant) => (
    <PlantCard key={plant.name} plant={plant} />
  ));

  // Component JSX

  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
