import React, { useState, useEffect } from "react";

function Search({ getSearchTerm }) {

  // State variables

  const [searchTerm, setSearchTerm] = useState('');

  // Call getSearchTerm whenever searchTerm or getSearchTerm changes

  useEffect(() => {
    getSearchTerm(searchTerm);
  }, [getSearchTerm, searchTerm]);

  // Event handlers

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Component JSX

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;
