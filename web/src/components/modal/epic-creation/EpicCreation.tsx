import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { epicFields } from '../../../constants/epicConstants';
import { IEpic } from '../../../types/epicTypes';
import GenericFormDates from '../generic-form/GenericFormDates';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '600px',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
        },
        header: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            color: '#242126',
            fontWeight: 'bold',
        },
        button: {
            width: '150px',
            height: '40px',
            marginTop: '30px',
            backgroundColor: '#75BAF7',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
            border: 'none',
            textTransform: 'capitalize',
            color: '#FFF',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
            },
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
    })
);

export interface IEpicCreationProps {
    epic: IEpic;
    onChangeEpicField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickCreateEpic: () => void;
}

const EpicCreation = (props: IEpicCreationProps) => {
    const classes = useStyles();
    const { epic, onChangeEpicField, onClickCreateEpic } = props;

    const names = [epicFields.epicName, epicFields.epicDescription, epicFields.startDate, epicFields.endDate];
    const values = [
        epic.epicName,
        epic.epicDescription,
        moment(epic.startDate).format('yyyy-MM-DD'),
        moment(epic.endDate).format('yyyy-MM-DD'),
    ];

    return (
        <div className={classes.root}>
            <span className={classes.header}>Create a new epic</span>
            <GenericFormDates names={names} values={values} onChangeField={onChangeEpicField} />
            <Button onClick={onClickCreateEpic} className={classes.button}>
                Create epic
            </Button>
        </div>
    );
};

export default EpicCreation;
