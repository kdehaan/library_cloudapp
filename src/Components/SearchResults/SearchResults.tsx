import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Subheader from "@material-ui/core/ListSubheader";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      margin: theme.spacing(1)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      marginBottom: 0,
      marginTop: 0
    },
    searchButton: {},
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  })
);

interface State {
  searchContent: string;
}

interface Props {
  results: any[];
}

const SearchResults: React.FC<Props> = ({ results }) => {
  const classes = useStyles();
  let resultsList: any = results.map(function(result) {
    return (
      <React.Fragment>
        <ListItem key={result.title}>
          <ListItemText primary={result.title} secondary={result.author} />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  });
  let displayResults =
    results.length === 0 ? (
      <React.Fragment></React.Fragment>
    ) : (
      <List>
        <Subheader>Results</Subheader>
        {resultsList}
      </List>
    );
  return <React.Fragment>{displayResults}</React.Fragment>;
};

export default SearchResults;
