import { createStyles, makeStyles } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: '#75BAF7',
            fontSize: '16px',
        },
        icon: {
            fontSize: '16px',
            color: '#75BAF7',
            margin: '4px 5px 0 0',
        },
    })
);

const ModalAdditionalInfo = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <HelpOutlineIcon className={classes.icon} />
            <span className={classes.text}>You will be able to update these information whenever you want.</span>
        </div>
    );
};

export default ModalAdditionalInfo;
