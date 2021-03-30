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
            fontSize: '18px',
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
        textArea: ({ minHeight }: IFormTextArea) => ({
            minHeight: minHeight ? minHeight : 0,
            fontSize: '16px',
            fontFamily: 'Poppins Medium',
            borderRadius: '5px',
            border: '1px solid #AFC1C4',
            padding: '10px',
            resize: 'none',
        }),
        errorIcon: {
            fontSize: '16px',
        },
        errorMessage: {
            marginLeft: '5px',
            fontSize: '14px',
        },
        counter: {
            fontSize: '14px',
            fontFamily: 'Poppins Medium',
            alignSelf: 'flex-end',
            marginTop: '5px',
        },
    })
);

export interface IFormTextArea {
    label: string;
    displayLength: boolean;
    minHeight?: string;
    placeholder?: string;
    maxLength?: number;
    customError?: string;
}

const FormTextArea = (props: IFormTextArea & FieldProps) => {
    const classes = useStyles(props);
    const {
        label,
        displayLength,
        placeholder,
        maxLength,
        customError,
        field,
        field: { value, name },
        form: { touched, errors },
    } = props;

    return (
        <div className={classes.root}>
            <span className={classes.title}>{label}:</span>
            <textarea {...field} className={classes.textArea} placeholder={placeholder} maxLength={maxLength} />
            {displayLength && maxLength && (
                <span className={classes.counter}>Allowed symbols left amount is {maxLength - value.length}</span>
            )}
            {(customError || (touched[name] && errors[name])) && (
                <div className={classes.errorMessageContainer}>
                    <ErrorIcon className={classes.errorIcon} />
                    <span className={classes.errorMessage}>{customError || errors[name]}</span>
                </div>
            )}
        </div>
    );
};

export default FormTextArea;
