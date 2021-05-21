import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Spinner from '../common/Spinner';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
        },
    })
);

const ModalSpinner = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Spinner size={40} />
        </div>
    );
};

export default ModalSpinner;
