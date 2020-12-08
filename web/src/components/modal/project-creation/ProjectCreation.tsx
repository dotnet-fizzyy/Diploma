import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { projectFields } from '../../../constants/projectConstants';
import { IProject } from '../../../types/projectTypes';
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

export interface IProjectCreationProps {
    project: IProject;
    onChangeProjectField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickProjectCreate: () => void;
}

const ProjectCreation = (props: IProjectCreationProps) => {
    const classes = useStyles();
    const { project, onChangeProjectField, onClickProjectCreate } = props;

    const names = [
        projectFields.projectName,
        projectFields.startDate,
        projectFields.endDate,
        projectFields.projectDescription,
    ];
    const values = [
        project.projectName,
        moment(project.startDate).format('yyyy-MM-DD'),
        moment(project.endDate).format('yyyy-MM-DD'),
        project.projectDescription,
    ];

    return (
        <div className={classes.root}>
            <span className={classes.header}>Create a project</span>
            <GenericFormDates
                names={names}
                values={values}
                onChangeField={onChangeProjectField}
                hideDescription={false}
            />
            <Button onClick={onClickProjectCreate} className={classes.button} variant="outlined">
                Create project
            </Button>
        </div>
    );
};

export default ProjectCreation;
