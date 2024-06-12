import "./searchComponent.css";

function SearchComponent({ value, handleSearchText, submitSearchValue }) {
  return (
    <div className="search__container">
      <div>
        <input value={value} onChange={handleSearchText} />
      </div>
      <button onClick={submitSearchValue}>search</button>
    </div>
  );
}

export default SearchComponent;
