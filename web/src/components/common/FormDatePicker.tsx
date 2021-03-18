import { createStyles, makeStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ErrorIcon from '@material-ui/icons/Error';
import { DatePicker } from '@material-ui/pickers';
import { FieldProps } from 'formik';
import { Moment } from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';

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
        calendar: {
            '&:hover': {
                cursor: 'pointer',
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

export interface IFormDatePickerProps {
    label: string;
    disabled?: boolean;
    customError?: string;
}

const FormDatePicker = (props: IFormDatePickerProps & FieldProps) => {
    const classes = useStyles();
    const {
        label,
        field,
        field: { value, name },
        disabled,
        customError,
        form: { setFieldTouched, setFieldValue, touched, errors },
    } = props;

    const onChange = (date: Moment) => {
        setFieldTouched(name);
        setFieldValue(name, date.toISOString());
    };

    return (
        <div className={classes.root}>
            {label && <span className={classes.title}>{label}:</span>}
            <DatePicker
                {...field}
                autoOk={true}
                inputVariant="outlined"
                variant="inline"
                disablePast={true}
                disabled={disabled}
                format={DateFormat}
                views={['year', 'month', 'date']}
                value={value ? new Date(value) : null}
                onChange={onChange}
                error={false}
                helperText={false}
                InputProps={{ endAdornment: <DateRangeIcon />, classes: { input: classes.calendar } }}
            />
            {(customError || (touched[name] && errors[name])) && (
                <div className={classes.errorMessageContainer}>
                    <ErrorIcon className={classes.errorIcon} />
                    <span className={classes.errorMessage}>{customError || errors[name]}</span>
                </div>
            )}
        </div>
    );
};

export default FormDatePicker;
