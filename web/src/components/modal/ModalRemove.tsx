import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button, { ButtonVariant } from '../common/Button';
import MainLabel, { LabelType } from '../common/MainLabel';
import ModalCloseButtonContainer from './close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '500px',
            width: '100%',
            height: 'max-content',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            position: 'relative',
        },
        body: {
            marginTop: '20px',
        },
        buttonContainer: {
            marginTop: '30px',
            width: '150px',
        },
        text: {
            fontFamily: 'Poppins',
            color: '#242126',
            fontWeight: 500,
            fontSize: '16px',
        },
    })
);

export interface IModalRemoveProps {
    entity: string;
    entityName: string;
    onClick: () => void;
}

const ModalRemove = (props: IModalRemoveProps) => {
    const classes = useStyles();
    const { entity, entityName, onClick } = props;

    return (
        <div className={classes.root}>
            <MainLabel title={`Remove ${entity}`} variant={LabelType.PRIMARY} />
            <ModalCloseButtonContainer />
            <div className={classes.body}>
                <span className={classes.text}>
                    Are you sure you want to remove <b>{entityName}</b>? You will not be able to undo this action, all
                    attached items will be disabled automatically
                </span>
            </div>
            <div className={classes.buttonContainer}>
                <Button label="Remove" buttonVariant={ButtonVariant.DANGER} disabled={false} onClick={onClick} />
            </div>
        </div>
    );
};

export default ModalRemove;
