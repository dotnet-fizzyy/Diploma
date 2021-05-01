import { Button as MuiButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

export enum ButtonVariant {
    DEFAULT = 'DEFAULT',
    SUCCESS = 'SUCCESS',
    DANGER = 'DANGER',
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: ({ isSmall }: IButtonProps) => (isSmall ? '34px' : '40px'),
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: ({ isSmall }: IButtonProps) => (isSmall ? '14px' : '16px'),
            textTransform: 'capitalize',
            color: ({ buttonVariant }: IButtonProps) => {
                switch (buttonVariant) {
                    case ButtonVariant.SUCCESS:
                        return 'green';
                    case ButtonVariant.DANGER:
                        return 'red';
                    case ButtonVariant.DEFAULT:
                    default:
                        return '#FFF';
                }
            },
            backgroundColor: ({ buttonVariant }: IButtonProps) => {
                switch (buttonVariant) {
                    case ButtonVariant.SUCCESS:
                        return '#a2ffa0';
                    case ButtonVariant.DANGER:
                        return '#ffbdb9';
                    case ButtonVariant.DEFAULT:
                    default:
                        return '#75BAF7';
                }
            },
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                color: ({ buttonVariant }: IButtonProps) => {
                    switch (buttonVariant) {
                        case ButtonVariant.DEFAULT:
                        default:
                            return '#FFF';
                    }
                },
                backgroundColor: ({ buttonVariant }: IButtonProps) => {
                    switch (buttonVariant) {
                        case ButtonVariant.DEFAULT:
                        default:
                            return '#E8F4FF';
                    }
                },
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
    buttonVariant?: ButtonVariant;
    isSmall?: boolean;
}

const Button = (props: IButtonProps) => {
    const classes = useStyles(props);
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
