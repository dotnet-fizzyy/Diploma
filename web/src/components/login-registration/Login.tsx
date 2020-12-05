import { Button, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        textField: {
            width: '350px',
        },
        title: {
            fontSize: '34px',
            fontFamily: 'Poppins',
            marginBottom: '20px',
            color: '#242126',
        },
        linkContainer: {
            display: 'inherit',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '40px 0',
            fontFamily: 'Poppins',
            fontSize: '22px',
            '& a': {
                marginTop: '10px',
                textDecoration: 'none',
            },
        },
        fieldContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '450px',
            marginTop: '30px',
        },
        keyWord: {
            fontFamily: 'Poppins',
            fontSize: '22px',
            color: '#75BAF7',
        },
        button: {
            height: '45px',
            fontFamily: 'Poppins',
            fontSize: '18px',
            textTransform: 'capitalize',
            width: '150px',
            color: 'white',
            backgroundColor: '#75BAF7',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
            },
        },
        textInput: {
            fontFamily: 'Poppins',
            fontSize: '20px',
        },
        focusedInput: {
            borderColor: '#75BAF7',
            outline: 'none',
        },
        errorMessage: {
            marginTop: '30px',
            fontFamily: 'Poppins',
            fontSize: '20px',
            color: 'red',
        },
        errorMessageMargin: {
            marginTop: '30px',
        },
        spinnerMargin: {
            marginTop: '20px',
        },
        spinner: {
            color: '#75BAF7',
            fontSize: '20px',
            marginTop: '20px',
        },
    })
);

export interface ILoginPageProps {
    name: string;
    password: string;
    wasAttemptToLogIn: boolean;
    isSpinnerVisible: boolean;
    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitLogIn: () => void;
}

const LoginPage = (props: ILoginPageProps) => {
    const classes = useStyles();
    const {
        name,
        isSpinnerVisible,
        password,
        wasAttemptToLogIn,
        onChangeName,
        onChangePassword,
        onSubmitLogIn,
    } = props;

    return (
        <div className={classes.root}>
            <span className={classes.title}>Sign In</span>
            <div className={classes.fieldContainer}>
                <span className={classes.keyWord}>Name</span>
                <TextField
                    InputProps={{ classes: { input: classes.textInput, focused: classes.focusedInput } }}
                    className={classes.textField}
                    value={name}
                    onChange={onChangeName}
                    variant="outlined"
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.keyWord}>Password</span>
                <TextField
                    InputProps={{ classes: { input: classes.textInput } }}
                    className={classes.textField}
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    variant="outlined"
                />
            </div>
            {isSpinnerVisible && <CircularProgress className={classes.spinner} />}
            {wasAttemptToLogIn && !isSpinnerVisible && (
                <span className={classes.errorMessage}>Unable to login with following credentials</span>
            )}
            <div
                className={classnames(classes.linkContainer, {
                    [classes.errorMessageMargin]: wasAttemptToLogIn,
                    [classes.spinnerMargin]: isSpinnerVisible,
                })}
            >
                <span>Don't you have project yet?</span>
                <Link to={`${routeConstants.RegistrationScreenRoute}`}>Create it!</Link>
            </div>
            <Button className={classes.button} color="primary" variant="contained" onClick={onSubmitLogIn}>
                Sign in
            </Button>
        </div>
    );
};

export default LoginPage;
