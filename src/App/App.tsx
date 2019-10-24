import React from "react";
import SearchBar from "../Components/SearchBar";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <SearchBar searchLabel={"Title of Book"} />
    </React.Fragment>
  );
};

export default App;
