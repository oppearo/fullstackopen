import React from "react";

const Filter = (props) => {
  return (
    <form onSubmit={props.handleNewSearch}>
      <div>
        filter shown with{" "}
        <input value={props.search} onChange={props.handleSearch} />
      </div>
    </form>
  );
};

export default Filter;
