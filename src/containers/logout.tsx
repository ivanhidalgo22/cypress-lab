import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid item>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Hello {user.name}, Please confirm loguout action here:{" "}
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            dir="center"
            size="large"
            data-test="bankaccount-delete"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default App;
