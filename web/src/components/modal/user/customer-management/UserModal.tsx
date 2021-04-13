import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { userFields } from '../../../../constants/userConstants';
import { ISelectedItem } from '../../../../types/storyTypes';
import { IUser } from '../../../../types/userTypes';
import Button from '../../../common/Button';
import FormDropdown from '../../../common/FormDropdown';
import FormTextField from '../../../common/FormTextField';
import MainLabel, { LabelType } from '../../../common/MainLabel';
import ModalCloseButtonContainer from '../../close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '600px',
            width: '100%',
            height: 'max-content',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
            position: 'relative',
        },
        fieldContainer: {
            paddingTop: '20px',
            '&:first-child': {
                paddingTop: 0,
            },
        },
        buttonContainer: {
            marginTop: '30px',
            width: '150px',
        },
    })
);

export interface IUserCreationProps {
    mainLabel: string;
    initialState: IUser;
    userRoles: ISelectedItem[];
    userPositions: ISelectedItem[];
    validateField: (value: string) => void;
    validateEmail: (value: string) => void;
    validatePassword: (value: string) => void;
    onClickSubmit: (values: IUser) => void;
}

const UserModal = (props: IUserCreationProps) => {
    const classes = useStyles();
    const {
        mainLabel,
        initialState,
        userRoles,
        userPositions,
        validateField,
        validateEmail,
        validatePassword,
        onClickSubmit,
    } = props;

    return (
        <Formik initialValues={initialState} onSubmit={onClickSubmit}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <div className={classes.root}>
                        <Form>
                            <MainLabel title={mainLabel} variant={LabelType.PRIMARY} />
                            <ModalCloseButtonContainer />
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={userFields.userName}
                                    component={FormTextField}
                                    validate={validateField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Password"
                                    type="password"
                                    name={userFields.password}
                                    component={FormTextField}
                                    validate={validatePassword}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Email"
                                    name={userFields.email}
                                    component={FormTextField}
                                    validate={validateEmail}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Position"
                                    name={userFields.userPosition}
                                    items={userPositions}
                                    component={FormDropdown}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Role"
                                    name={userFields.userRole}
                                    items={userRoles}
                                    component={FormDropdown}
                                />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button label="Create user" type="submit" disabled={!isAnyFieldTouched || !isValid} />
                            </div>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default UserModal;
