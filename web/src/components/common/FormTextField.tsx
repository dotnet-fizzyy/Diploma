import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { FieldProps } from 'formik';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        title: {
            fontSize: '16px',
            fontFamily: 'Poppins',
            color: '#242126',
            marginBottom: '4px',
        },
        errorMessageContainer: {
            color: '#c33a00',
            display: 'flex',
            alignItems: 'center',
            marginTop: '5px',
        },
        textField: {
            '& .MuiOutlinedInput-input': {
                padding: '12px',
            },
        },
        errorIcon: {
            fontSize: '16px',
        },
        errorMessage: {
            marginLeft: '5px',
            fontSize: '14px',
        },
    })
);

export interface IFormTextFieldProps {
    label?: string;
    placeholder?: string;
    type?: string;
    customError?: string;
}

const FormTextField = (props: IFormTextFieldProps & FieldProps) => {
    const classes = useStyles();
    const {
        label,
        placeholder,
        customError,
        type,
        field,
        form: { touched, errors },
    } = props;

    return (
        <div className={classes.root}>
            {label && <span className={classes.title}>{label}:</span>}
            <TextField
                {...field}
                className={classes.textField}
                type={type ? type : 'text'}
                placeholder={placeholder}
                variant="outlined"
            />
            {(customError || (touched[field.name] && errors[field.name])) && (
                <div className={classes.errorMessageContainer}>
                    <ErrorIcon className={classes.errorIcon} />
                    <span className={classes.errorMessage}>{customError || errors[field.name]}</span>
                </div>
            )}
        </div>
    );
};

export default FormTextField;
