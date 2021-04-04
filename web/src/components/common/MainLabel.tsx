import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontFamily: 'Poppins',
            fontSize: '24px',
            color: '#242126',
            fontWeight: 600,
        },
    })
);

export interface IMainLabelProps {
    title: string;
}

const MainLabel = ({ title }: IMainLabelProps) => {
    const classes = useStyles();

    return <span className={classes.root}>{title}</span>;
};

export default MainLabel;
