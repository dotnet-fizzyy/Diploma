import { createStyles, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '26px',
            height: '26px',
            position: 'absolute',
            top: '30px',
            right: '30px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    })
);

export interface IModalCloseButtonProps {
    onClickCloseModal: () => void;
}

const ModalCloseButton = (props: IModalCloseButtonProps) => {
    const classes = useStyles();
    const { onClickCloseModal } = props;

    return <CloseIcon className={classes.root} onClick={onClickCloseModal} />;
};

export default ModalCloseButton;
