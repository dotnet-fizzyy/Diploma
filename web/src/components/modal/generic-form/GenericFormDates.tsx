import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        fieldContainer: {
            margin: '20px 0',
        },
        textField: {
            width: '100%',
            marginTop: '10px',
        },
        footer: {
            display: 'inherit',
            width: '100%',
            height: '200px',
            flexWrap: 'wrap',
            marginTop: '30px',
            justifyContent: 'space-between',
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
    })
);

export interface IGenericFormDatesProps {
    names: string[];
    values: string[];
    onChangeField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hideDescription: boolean;
}

const GenericFormDates = (props: IGenericFormDatesProps) => {
    const classes = useStyles();
    const { names, hideDescription, values, onChangeField } = props;

    return (
        <>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Name: </span>
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    name={names[0]}
                    value={values[0]}
                    onChange={onChangeField}
                />
            </div>
            {!hideDescription && (
                <div className={classes.fieldContainer}>
                    <span className={classes.title}>Description: </span>
                    <TextField
                        variant="outlined"
                        multiline={true}
                        className={classes.textField}
                        name={names[3]}
                        value={values[3]}
                        onChange={onChangeField}
                    />
                </div>
            )}
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Start date: </span>
                <TextField
                    variant="outlined"
                    type="date"
                    className={classes.textField}
                    name={names[1]}
                    value={values[1]}
                    onChange={onChangeField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>End date: </span>
                <TextField
                    variant="outlined"
                    type="date"
                    className={classes.textField}
                    name={names[2]}
                    value={values[2]}
                    onChange={onChangeField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        </>
    );
};

export default GenericFormDates;
