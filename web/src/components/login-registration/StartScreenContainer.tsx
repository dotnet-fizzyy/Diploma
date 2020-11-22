import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import * as currentUserActions from "../../redux/actions/currentUserActions";
import { StartPageTypes } from "../../types/pageTypes";
import { ILoginPageProps } from "./Login";
import { IRegistrationPageProps } from "./Registrations";
import StartScreen, { IStartScreenProps } from "./StartScreen";

const StartScreenContainer = () => {
  const dispatch = useDispatch();

  const { path } = useRouteMatch();
  const startPage = path.split("/")[2];
  const startPageType =
    startPage.toUpperCase() === StartPageTypes.REGISTRATION
      ? StartPageTypes.REGISTRATION
      : StartPageTypes.LOGIN;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onChangeName = (value: string) => {
    setName(value);
  };

  const loginProps: ILoginPageProps = {
    name,
    password,
    onChangeName,
    onChangePassword,
    onSubmitLogIn: () => {
      dispatch(currentUserActions.authenticationRequest(name, password));
    },
  };

  const registrationProps: IRegistrationPageProps = {
    name,
    password,
    repeatedPassword,
    onChangeName,
    onChangePassword,
    onChangeRepeatedPassword: (value: string) => {
      setRepeatedPassword(value);
    },
    onSubmitRegistration: () => {
      dispatch(currentUserActions.registrationRequest(name, password));
      dispatch(currentUserActions.registrationRequest(name, password));
    },
  };

  const startScreenProps: IStartScreenProps = {
    startPageType,
    loginProps,
    registrationProps,
  };

  return <StartScreen {...startScreenProps} />;
};

export default StartScreenContainer;
