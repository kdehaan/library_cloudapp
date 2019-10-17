import React from "react";
import SearchBar from "../Components/SearchBar";
import { Button } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <SearchBar searchLabel={"Title of Book"} />
    </React.Fragment>
  );
};

export default App;
