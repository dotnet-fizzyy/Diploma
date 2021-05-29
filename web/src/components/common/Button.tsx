import { Button as MuiButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

export enum ButtonVariant {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
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
            border: ({ buttonVariant }: IButtonProps) => {
                switch (buttonVariant) {
                    case ButtonVariant.SECONDARY:
                        return '1px solid #75BAF7';
                    case ButtonVariant.SUCCESS:
                    case ButtonVariant.DANGER:
                    case ButtonVariant.PRIMARY:
                    default:
                        return null;
                }
            },
            color: ({ buttonVariant }: IButtonProps) => {
                switch (buttonVariant) {
                    case ButtonVariant.SUCCESS:
                        return 'green';
                    case ButtonVariant.SECONDARY:
                        return '#75BAF7';
                    case ButtonVariant.DANGER:
                        return 'red';
                    case ButtonVariant.PRIMARY:
                    default:
                        return '#FFF';
                }
            },
            backgroundColor: ({ buttonVariant }: IButtonProps) => {
                switch (buttonVariant) {
                    case ButtonVariant.SUCCESS:
                        return '#a2ffa0';
                    case ButtonVariant.SECONDARY:
                        return '#FFF';
                    case ButtonVariant.DANGER:
                        return '#ffbdb9';
                    case ButtonVariant.PRIMARY:
                    default:
                        return '#75BAF7';
                }
            },
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                color: ({ buttonVariant }: IButtonProps) => {
                    switch (buttonVariant) {
                        case ButtonVariant.DANGER:
                            return '#FAFAFA';
                        case ButtonVariant.PRIMARY:
                        default:
                            return '#FFF';
                    }
                },
                backgroundColor: ({ buttonVariant }: IButtonProps) => {
                    switch (buttonVariant) {
                        case ButtonVariant.DANGER:
                            return 'red';
                        case ButtonVariant.PRIMARY:
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
    label?: string;
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
