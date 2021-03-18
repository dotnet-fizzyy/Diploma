import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { InitialRegistrationFormValues, RegistrationFormConstants } from '../../constants';
import * as routeConstants from '../../constants/routeConstants';
import { IRegistrationForm } from '../../types/formTypes';
import Button from '../common/Button';
import FormTextField from '../common/FormTextField';
import ForwardLink from './ForwardLink';

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            width: '100%',
            padding: '0 20px',
        },
        root: {
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
        textField: {
            width: '350px',
        },
        title: {
            fontSize: '30px',
            fontFamily: 'Poppins',
            marginBottom: '10px',
        },
        linkContainer: {
            display: 'inherit',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px 0',
            fontFamily: 'Poppins',
            fontSize: '16px',
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
            width: '100%',
            maxWidth: '450px',
            marginTop: '20px',
        },
        keyWord: {
            fontFamily: 'Poppins',
            fontSize: '22px',
            color: '#75BAF7',
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
        buttonContainer: {
            width: '250px',
        },
    })
);

export interface IRegistrationPageProps {
    wasUserCreated: boolean;
    isSpinnerVisible: boolean;
    customError?: string;
    validateField: (value: string) => void;
    validateEmail: (value: string) => void;
    validatePassword: (value: string) => void;
    onSubmitRegistration: (values: IRegistrationForm) => void;
}

const RegistrationPage = (props: IRegistrationPageProps) => {
    const classes = useStyles();
    const {
        isSpinnerVisible,
        customError,
        wasUserCreated,
        validatePassword,
        validateField,
        validateEmail,
        onSubmitRegistration,
    } = props;

    return (
        <Formik
            initialValues={InitialRegistrationFormValues}
            onSubmit={onSubmitRegistration}
            validateOnBlur={false}
            validateOnChange={true}
        >
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <Form className={classes.form}>
                        <div className={classes.root}>
                            <span className={classes.title}>Registration</span>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={RegistrationFormConstants.name}
                                    component={FormTextField}
                                    validate={validateField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Email"
                                    name={RegistrationFormConstants.email}
                                    component={FormTextField}
                                    validate={validateEmail}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Password"
                                    name={RegistrationFormConstants.password}
                                    type="password"
                                    component={FormTextField}
                                    validate={validatePassword}
                                    customError={customError}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Repeat your password"
                                    name={RegistrationFormConstants.repeatedPassword}
                                    type="password"
                                    component={FormTextField}
                                    validate={validatePassword}
                                    customError={customError}
                                />
                            </div>
                            {isSpinnerVisible && <CircularProgress className={classes.spinner} />}
                            <ForwardLink
                                mainLabel="Do you have account?"
                                link={routeConstants.LoginScreenRoute}
                                linkLabel="Sign in"
                            />
                            {wasUserCreated && (
                                <span className={classes.createdAccountLabel}>
                                    Your account was successfully created!
                                </span>
                            )}
                            <div className={classes.buttonContainer}>
                                <Button
                                    disabled={!isAnyFieldTouched || !isValid}
                                    type="submit"
                                    label="Create your account"
                                />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RegistrationPage;
