import { Tooltip as MuiTooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontFamily: 'Poppins',
            fontSize: '10px',
            fontWeight: 500,
        },
    })
);

export interface ITooltipProps {
    message: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ message, children }) => {
    const classes = useStyles();

    return (
        <MuiTooltip title={message} classes={{ tooltip: classes.root }} arrow={true}>
            <span>{children as JSX.Element}</span>
        </MuiTooltip>
    );
};

export default Tooltip;
