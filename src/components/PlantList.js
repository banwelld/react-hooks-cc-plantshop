import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plantData }) {

  const plantCards = plantData.map((plant) => (
    <PlantCard key={plant.name} plant={plant} />
  ));

  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
