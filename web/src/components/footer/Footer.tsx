import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '60px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'Poppins',
            '& div': {
                padding: '0 30px',
            },
        },
        copyrights: {
            fontSize: '16px',
        },
        designDesc: {
            display: 'flex',
            flexDirection: 'column',
            '& span': {
                '&:last-child': {
                    marginTop: '5px',
                },
            },
        },
    })
);

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <span className={classes.copyrights}>© 2020 Yaniuk Dmitry. All Rights Reserved.</span>
            </div>
            <div className={classes.designDesc}>
                <span>Developed by Dmitry Yaniuk</span>
                <span>Designed by Viktoria Kantarovich</span>
            </div>
        </div>
    );
};

export default Footer;
