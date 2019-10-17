import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import dummyResults from "../../res/dummyResults.json";
import SearchResults from "../SearchResults";
import { WithStyles, withStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
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
  });

interface Props extends WithStyles<typeof styles> {
  searchLabel: string;
}

interface State {
  results: any[];
}

class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: []
    };
    this.getResults = this.getResults.bind(this);
  }

  // const handleChange = (name: keyof State) => (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setValues({ ...values, [name]: event.target.value });
  // };
  getResults() {
    this.setState({ results: dummyResults });
  }

  render() {
    // const classes = useStyles();
    const { searchLabel, classes } = this.props;
    const { results } = this.state;
    return (
      <React.Fragment>
        <div className={classes.container}>
          <TextField
            id="standard-search"
            label={searchLabel}
            type="search"
            className={classes.textField}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.searchButton}
            onClick={this.getResults}
          >
            Search
          </Button>
        </div>
        <SearchResults results={results} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SearchBar);
