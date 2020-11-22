import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";

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

export interface IRegistrationPageProps {
  name: string;
  password: string;
  repeatedPassword: string;
  onChangeName: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangeRepeatedPassword: (value: string) => void;
  onSubmitRegistration: () => void;
}

const RegistrationPage = (props: IRegistrationPageProps) => {
  const classes = useStyles();
  const {
    name,
    password,
    repeatedPassword,
    onChangeName,
    onChangePassword,
    onChangeRepeatedPassword,
    onSubmitRegistration,
  } = props;

  return (
    <div className={classes.root}>
      <span className={classes.title}>Registration</span>
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
      <TextField
        className={classes.textField}
        type="password"
        value={repeatedPassword}
        onChange={(event: { target: { value: string } }) =>
          onChangeRepeatedPassword(event.target.value)
        }
      />
      <span className={classes.keyWord}>Confirm your password</span>
      <Button
        color="primary"
        variant="contained"
        onClick={onSubmitRegistration}
      >
        Create your project
      </Button>
    </div>
  );
};

export default RegistrationPage;
