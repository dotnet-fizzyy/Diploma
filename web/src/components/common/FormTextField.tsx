import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { FieldProps } from 'formik';
import React, { ChangeEvent } from 'react';
import FormInputLabel from './FormInputLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        errorMessageContainer: {
            color: '#c33a00',
            display: 'flex',
            alignItems: 'center',
            marginTop: '5px',
        },
        textField: {
            '& .MuiOutlinedInput-input': {
                fontFamily: 'Poppins',
                fontWeight: 500,
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
    isPrimaryTitle?: boolean;
    label?: string;
    placeholder?: string;
    type?: string;
    customError?: string;
}

const FormTextField = (props: IFormTextFieldProps & FieldProps) => {
    const classes = useStyles(props);
    const {
        label,
        placeholder,
        customError,
        type,
        field,
        form: { touched, errors, setFieldTouched, handleChange },
    } = props;

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {
            target: { name },
        } = e;

        setFieldTouched(name);
        handleChange(e);
    };

    return (
        <div className={classes.root}>
            {label && <FormInputLabel isPrimaryTitle={false} label={`${label}:`} />}
            <TextField
                {...field}
                className={classes.textField}
                type={type ? type : 'text'}
                placeholder={placeholder}
                variant="outlined"
                value={field.value}
                onChange={onChange}
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
