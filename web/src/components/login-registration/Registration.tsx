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
            width: '580px',
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
        createdAccountLabel: {
            fontFamily: 'Poppins',
            fontSize: '20px',
            color: 'green',
            marginBottom: '20px',
        },
        lessMarginBottom: {
            marginBottom: '20px',
        },
        spinner: {
            color: '#75BAF7',
            fontSize: '20px',
            marginTop: '20px',
        },
        spinnerMargin: {
            marginTop: '20px',
        },
    })
);

export interface IRegistrationPageProps {
    name: string;
    password: string;
    repeatedPassword: string;
    arePasswordsSame: boolean;
    wasUserCreated: boolean;
    isSpinnerVisible: boolean;
    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeRepeatedPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitRegistration: () => void;
}

const RegistrationPage = (props: IRegistrationPageProps) => {
    const classes = useStyles();
    const {
        name,
        password,
        repeatedPassword,
        isSpinnerVisible,
        wasUserCreated,
        onChangeName,
        onChangePassword,
        onChangeRepeatedPassword,
        onSubmitRegistration,
    } = props;

    return (
        <div className={classes.root}>
            <span className={classes.title}>Registration</span>
            <div className={classes.fieldContainer}>
                <span className={classes.keyWord}>Name</span>
                <TextField
                    className={classes.textField}
                    InputProps={{ classes: { input: classes.textInput } }}
                    value={name}
                    onChange={onChangeName}
                    variant="outlined"
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.keyWord}>Password</span>
                <TextField
                    className={classes.textField}
                    InputProps={{ classes: { input: classes.textInput } }}
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    variant="outlined"
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.keyWord}>Confirm your password</span>
                <TextField
                    className={classes.textField}
                    InputProps={{ classes: { input: classes.textInput } }}
                    type="password"
                    value={repeatedPassword}
                    onChange={onChangeRepeatedPassword}
                    variant="outlined"
                />
            </div>
            {isSpinnerVisible && <CircularProgress className={classes.spinner} />}
            <div
                className={classnames(classes.linkContainer, {
                    [classes.lessMarginBottom]: wasUserCreated,
                    [classes.spinnerMargin]: isSpinnerVisible,
                })}
            >
                <span>Do you have account?</span>
                <Link to={routeConstants.LoginScreenRoute}>Sign in</Link>
            </div>
            {wasUserCreated && (
                <span className={classes.createdAccountLabel}>Your account was successfully created!</span>
            )}
            <Button className={classes.button} color="primary" variant="contained" onClick={onSubmitRegistration}>
                Create your account
            </Button>
        </div>
    );
};

export default RegistrationPage;
