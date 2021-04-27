import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { InitialLoginFormValues, LoginFormConstants } from '../../constants';
import * as routeConstants from '../../constants/routeConstants';
import { ILoginForm } from '../../types/formTypes';
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
            color: '#242126',
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
        buttonContainer: {
            width: '250px',
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
    wasAttemptToLogIn: boolean;
    validateField: (value: string) => void;
    onSubmitLogIn: (values: ILoginForm) => void;
}

const LoginPage = (props: ILoginPageProps) => {
    const classes = useStyles();
    const { validateField, wasAttemptToLogIn, onSubmitLogIn } = props;

    return (
        <Formik initialValues={InitialLoginFormValues} onSubmit={onSubmitLogIn}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <Form className={classes.form}>
                        <div className={classes.root}>
                            <span className={classes.title}>Sign In</span>
                            <div className={classes.fieldContainer}>
                                <Field
                                    name={LoginFormConstants.name}
                                    label="Name"
                                    validate={validateField}
                                    component={FormTextField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    name={LoginFormConstants.password}
                                    label="Password"
                                    type="password"
                                    validate={validateField}
                                    component={FormTextField}
                                />
                            </div>
                            {/*{isSpinnerVisible && <CircularProgress className={classes.spinner} />}*/}
                            {wasAttemptToLogIn && (
                                <span className={classes.errorMessage}>Unable to login with following credentials</span>
                            )}
                            <ForwardLink
                                mainLabel="Don't you an account yet?"
                                link={routeConstants.RegistrationScreenRoute}
                                linkLabel="Create it now!"
                            />
                            <div className={classes.buttonContainer}>
                                <Button disabled={!isAnyFieldTouched || !isValid} type="submit" label="Sign in" />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LoginPage;
