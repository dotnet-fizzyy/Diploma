import { MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { FieldProps } from 'formik';
import React from 'react';
import { ISelectedItem } from '../../types/story';
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
        dropdown: {
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

export interface IFormDropdownProps {
    items: ISelectedItem[];
    isPrimaryTitle?: boolean;
    label?: string;
    disabled?: boolean;
    customError?: string;
}

const FormDropdown = (props: IFormDropdownProps & FieldProps) => {
    const classes = useStyles();
    const {
        items,
        label,
        field,
        disabled,
        customError,
        field: { name },
        form: { touched, errors, setFieldTouched, setFieldValue },
    } = props;

    const onChange = (event: any) => {
        setFieldTouched(name);
        setFieldValue(name, event.target.value);
    };

    return (
        <div className={classes.root}>
            {label && <FormInputLabel isPrimaryTitle={false} label={`${label}:`} />}
            <Select
                {...field}
                variant="outlined"
                displayEmpty={true}
                disabled={disabled}
                onChange={onChange}
                className={classes.dropdown}
            >
                {items && items.length
                    ? items.map((x) => (
                          <MenuItem key={x.key} value={x.key}>
                              {x.value}
                          </MenuItem>
                      ))
                    : null}
            </Select>
            {(customError || (touched[field.name] && errors[field.name])) && (
                <div className={classes.errorMessageContainer}>
                    <ErrorIcon className={classes.errorIcon} />
                    <span className={classes.errorMessage}>{customError || errors[field.name]}</span>
                </div>
            )}
        </div>
    );
};

export default FormDropdown;
