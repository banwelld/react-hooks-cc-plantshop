import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all plants on component mount

  useEffect(() => {
    getAllPlants();
  }, []);

  // Server interaction functions

  const getAllPlants = () => {
    fetch('http://localhost:6001/plants')
      .then((r) => r.json())
      .then((data) => {
        setPlants(data);
      });
  };

  const addNewPlant = (plantObj) => {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(plantObj),
    })
     .then((r) => r.json())
     .then((newPlant) => setPlants([...plants, newPlant]));
  };

  // Callback props

  const displayPlants = (filterTerm) => {
    const lcTerm = filterTerm.toLowerCase();
    return plants.filter(
      (plant) => filterTerm ? plant.name.toLowerCase().includes(lcTerm) : true
    );
  };

  const updateSetter = (updatedPlant) => {
    const newPlants = plants.map((plant) => plant.id === updatedPlant.id ? updatedPlant : plant)
    setPlants(newPlants);
  };

  const deleteSetter = (plantId) => {
    const newPlants = plants.filter((plant) => plant.id!== plantId);
    setPlants(newPlants);
  };

  // Component JSX

  return (  
    <main>
      <NewPlantForm pushNewPlant={addNewPlant}/>
      <Search
        getSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />

      {plants.length === 0 ? <h3>Loading...</h3> :
        <PlantList 
          pushDelete={deleteSetter} 
          pushUpdate={updateSetter} 
          plantData={displayPlants(searchTerm)}
        />
      }
    </main>
  );

};

export default PlantPage;