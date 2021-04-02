import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '750px',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
        },
        header: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            color: '#242126',
            fontWeight: 'bold',
        },
        fieldContainer: {
            margin: '20px 0',
        },
        textField: {
            width: '100%',
            marginTop: '10px',
        },
        footerItem: {
            flexBasis: '230px',
            flexShrink: 0,
        },
        button: {
            width: '150px',
            height: '40px',
            marginTop: '30px',
            backgroundColor: '#75BAF7',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
            border: 'none',
            textTransform: 'capitalize',
            color: '#FFF',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
            },
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
    })
);

const UserModal = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span>profile</span>
        </div>
    );
};

export default UserModal;
