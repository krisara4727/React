import { useState, useRef, useCallback } from "react";
import Card from "./components/Card";
import SearchComponent from "./components/SearchComponent";
import "./styles.css";
import useSearch from "./hooks/useSearch";

export default function App() {
  const [searchValue, setSearchValue] = useState("cheeseburgers");
  const [page, setPage] = useState(0);
  const { data, loading, hasMore, getData } = useSearch(searchValue, page);
  const observer = useRef();

  const handleSearchText = (e) => {
    setSearchValue(e.target.value);
  };

  const submitSearchValue = () => {
    getData();
  };

  const lastElement = useCallback(
    (node) => {
      console.log(node, "node");

      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(node, "node");
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="container">
      <SearchComponent
        value={searchValue}
        handleSearchText={handleSearchText}
        submitSearchValue={submitSearchValue}
      />
      {loading && page != 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="card__container">
          {data.length > 0 &&
            data.map((item, index) =>
              data.length === index + 1 ? (
                <Card key={item.id} refs={lastElement} data={item} />
              ) : (
                <Card key={item.id} data={item} />
              )
            )}
        </div>
      )}
    </div>
  );
}
