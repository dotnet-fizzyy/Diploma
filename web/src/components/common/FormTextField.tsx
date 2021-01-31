import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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
        textField: {},
        title: {
            fontSize: '16px',
            fontFamily: 'Poppins',
            color: '#242126',
            marginBottom: '4px',
        },
    })
);

export interface IFormTextFieldProps {
    label?: string;
    placeholder?: string;
    type?: string;
}

const FormTextField = (props: IFormTextFieldProps & FieldProps) => {
    const classes = useStyles();
    const {
        label,
        placeholder,
        type,
        field,
        form: { touched, errors },
    } = props;

    return (
        <div className={classes.root}>
            {label && <span className={classes.title}>{label}</span>}
            <TextField
                {...field}
                type={type ? type : 'text'}
                placeholder={placeholder}
                className={classes.textField}
                variant="outlined"
            />
            {touched[field.name] && errors[field.name] && <span>{errors[field.name]}</span>}
        </div>
    );
};

export default FormTextField;
