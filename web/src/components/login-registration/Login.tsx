import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import * as routeConstants from "../../constants/routeConstants";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "400px",
      height: "500px",
      borderRadius: "5px",
      backgroundColor: "rgba(221, 217, 217, 0.6)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textField: {
      width: "250px",
      marginTop: "30px",
    },
    title: {
      fontSize: "26px",
      fontFamily: "Roboto",
      marginTop: "20px",
    },
    linkContainer: {
      display: "inherit",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px 0",
    },
    keyWord: {
      marginTop: "10px",
    },
    button: {
      marginTop: "30px",
    },
  })
);

export interface ILoginPageProps {
  name: string;
  password: string;
  onChangeName: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmitLogIn: () => void;
}

const LoginPage = (props: ILoginPageProps) => {
  const classes = useStyles();
  const {
    name,
    password,
    onChangeName,
    onChangePassword,
    onSubmitLogIn,
  } = props;

  return (
    <div className={classes.root}>
      <span className={classes.title}>Sign In</span>
      <TextField
        className={classes.textField}
        value={name}
        onChange={(event: { target: { value: string } }) =>
          onChangeName(event.target.value)
        }
      />
      <span className={classes.keyWord}>Name</span>
      <TextField
        className={classes.textField}
        type="password"
        value={password}
        onChange={(event: { target: { value: string } }) =>
          onChangePassword(event.target.value)
        }
      />
      <span className={classes.keyWord}>Password</span>
      <div className={classes.linkContainer}>
        <span>Don't you have project yet?</span>
        <Link to={`${routeConstants.RegistrationScreenRoute}`}>Create it!</Link>
      </div>
      <Button color="primary" variant="contained" onClick={onSubmitLogIn}>
        Sign in
      </Button>
    </div>
  );
};

export default LoginPage;
