import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { sprintFields } from '../../../constants/sprintConstants';
import { ISprint } from '../../../types/sprintTypes';
import GenericFormDates from '../generic-form/GenericFormDates';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '500px',
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
            width: '170px',
            height: '40px',
            marginTop: '30px',
            backgroundColor: '#75BAF7',
            border: 'none',
            color: '#FFF',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
                color: '#75BAF7',
                border: '1px solid lightgrey',
            },
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
    })
);

export interface ISprintCreationProps {
    sprint: ISprint;
    onChangeSprintField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickSprintCreate: () => void;
}

const SprintCreation = (props: ISprintCreationProps) => {
    const classes = useStyles();
    const { sprint, onClickSprintCreate, onChangeSprintField } = props;

    const names = [sprintFields.sprintName, sprintFields.startDate, sprintFields.endDate];
    const values = [
        sprint.sprintName,
        moment(sprint.startDate).format('yyyy-MM-DD'),
        moment(sprint.endDate).format('yyyy-MM-DD'),
    ];

    return (
        <div className={classes.root}>
            <span className={classes.header}>Create a sprint</span>
            <GenericFormDates
                names={names}
                values={values}
                onChangeField={onChangeSprintField}
                hideDescription={true}
            />
            <Button onClick={onClickSprintCreate} className={classes.button} variant="outlined">
                Create sprint
            </Button>
        </div>
    );
};

export default SprintCreation;
