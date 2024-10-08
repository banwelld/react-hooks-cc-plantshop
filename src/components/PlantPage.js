import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
     .then((r) => r.json())
     .then((data) => {
        setPlants(data);
     });
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants(prevPlants => [...prevPlants, newPlant]);
  }

  return (
    <main>
      <NewPlantForm setterCallback={handleAddPlant}/>
      <Search />
      <PlantList plantData={plants}/>
    </main>
  );

};

export default PlantPage;