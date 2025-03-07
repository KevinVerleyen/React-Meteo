import { useState } from "react";

const SearchBar = ({ label, placeholder, onSearch = () => {} }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query) {
      return;
    }
    onSearch(query);
    setQuery("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {label && <label htmlFor="{label}">{label}</label>}
        <input
          type="text"
          placeholder={placeholder ?? ""}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
        <button type="submit">Recherche</button>
      </form>
    </>
  );
};

export default SearchBar;
