import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
    createStyles({
        linkContainer: {
            display: 'inherit',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px 0',
            fontFamily: 'Poppins',
            fontSize: '16px',
            '& a': {
                marginTop: '10px',
                textDecoration: 'none',
                color: '#75BAF7',
                fontWeight: 500,
            },
        },
    })
);

export interface IForwardLinkProps {
    mainLabel: string;
    link: string;
    linkLabel: string;
}

const ForwardLink = (props: IForwardLinkProps) => {
    const classes = useStyles();
    const { mainLabel, link, linkLabel } = props;

    return (
        <div className={classes.linkContainer}>
            <span>{mainLabel}</span>
            <Link to={link}>{linkLabel}</Link>
        </div>
    );
};

export default ForwardLink;
