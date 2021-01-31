import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { InitialRegistrationFormValues, RegistrationFormConstants } from '../../constants';
import * as routeConstants from '../../constants/routeConstants';
import { IRegistrationForm } from '../../types/formTypes';
import FormTextField from '../common/FormTextField';

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
    arePasswordsSame: boolean;
    wasUserCreated: boolean;
    isSpinnerVisible: boolean;
    onSubmitRegistration: (values: IRegistrationForm) => void;
}

const RegistrationPage = (props: IRegistrationPageProps) => {
    const classes = useStyles();
    const { isSpinnerVisible, wasUserCreated, onSubmitRegistration } = props;

    return (
        <Formik initialValues={InitialRegistrationFormValues} onSubmit={onSubmitRegistration}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <Form>
                        <div className={classes.root}>
                            <span className={classes.title}>Registration</span>
                            <div className={classes.fieldContainer}>
                                <Field label="Name" name={RegistrationFormConstants.name} component={FormTextField} />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Password"
                                    name={RegistrationFormConstants.password}
                                    type="password"
                                    component={FormTextField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Repeat your password"
                                    name={RegistrationFormConstants.repeatedPassword}
                                    type="password"
                                    component={FormTextField}
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
                                <span className={classes.createdAccountLabel}>
                                    Your account was successfully created!
                                </span>
                            )}
                            <Button
                                disabled={!isAnyFieldTouched || !isValid}
                                className={classes.button}
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Create your account
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RegistrationPage;
