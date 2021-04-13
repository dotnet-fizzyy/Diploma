import { Button as MuiButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '40px',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '16px',
            textTransform: 'capitalize',
            backgroundColor: '#75BAF7',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
            },
        },
        startIcon: {
            marginRight: '4px',
        },
    })
);

export interface IButtonProps {
    label: string;
    disabled: boolean;
    onClick?: () => void;
    type?: string;
    startIcon?: React.ReactNode;
}

const Button = (props: IButtonProps) => {
    const classes = useStyles();
    const { label, disabled, onClick, type, startIcon } = props;

    return (
        <MuiButton
            disabled={disabled}
            className={classes.root}
            onClick={onClick}
            color="primary"
            variant="contained"
            type={(type as any) || 'button'}
            startIcon={startIcon}
            classes={{ startIcon: classes.startIcon }}
        >
            {label}
        </MuiButton>
    );
};

export default Button;
