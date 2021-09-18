import { useState } from "react";

const Search = (props: any) => {
  const [search, setSearch] = useState("");

  const onInputChange = (searchText: string) => {
    setSearch(searchText);
    props.onSearchHandler(searchText);
  };
  return (
    <div className="input-group">
      <input
        style={{ width: "100%" }}
        type="search"
        className="form-control"
        placeholder="search..."
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
