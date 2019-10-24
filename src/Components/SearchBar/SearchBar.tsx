import React from "react";
import { Button } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchResults from "../SearchResults";
import { WithStyles, withStyles } from "@material-ui/core";
const ENDPOINT = "https://p0jz5oh0u4.execute-api.us-east-2.amazonaws.com/Dev";

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
  query: string;
}

class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
      query: ""
    };
    this.getResults = this.getResults.bind(this);
    this.setQuery = this.setQuery.bind(this);
  }

  getResults() {
    fetch(ENDPOINT, {
      method: "POST",
      body: `${this.state.query}`
    }).then((response: Response) => {
      console.log(response.text());
    });

    // this.setState({ results: [] });
  }

  setQuery(e: any) {
    this.setState({ query: e.target.value });
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
            onChange={this.setQuery}
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
