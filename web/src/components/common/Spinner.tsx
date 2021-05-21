import { CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        spinner: {
            color: '#75BAF7',
        },
    })
);

export interface SpinnerProps {
    size: number;
}

const Spinner = (props: SpinnerProps) => {
    const classes = useStyles();
    const { size } = props;

    return <CircularProgress size={size} className={classes.spinner} />;
};

export default Spinner;
