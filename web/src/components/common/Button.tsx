import { Button as MuiButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '40px',
            fontFamily: 'Poppins',
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
    })
);

export interface IButtonProps {
    label: string;
    disabled: boolean;
    onClick?: () => void;
    type?: string;
}

const Button = (props: IButtonProps) => {
    const classes = useStyles();
    const { label, disabled, onClick, type } = props;

    return (
        <MuiButton
            disabled={disabled}
            className={classes.root}
            onClick={onClick}
            color="primary"
            variant="contained"
            type={(type as any) || 'button'}
        >
            {label}
        </MuiButton>
    );
};

export default Button;
