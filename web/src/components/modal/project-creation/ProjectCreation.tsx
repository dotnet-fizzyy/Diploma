import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { projectFields } from '../../../constants/projectConstants';
import { IProject } from '../../../types/projectTypes';

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
        fieldContainer: {
            margin: '20px 0',
        },
        textField: {
            width: '100%',
            marginTop: '10px',
        },
        footer: {
            display: 'inherit',
            width: '100%',
            height: '200px',
            flexWrap: 'wrap',
            marginTop: '30px',
            justifyContent: 'space-between',
        },
        footerItem: {
            flexBasis: '230px',
            flexShrink: 0,
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

    return (
        <div className={classes.root}>
            <span className={classes.header}>Create a project</span>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Name: </span>
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    name={projectFields.projectName}
                    value={project.projectName}
                    onChange={onChangeProjectField}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Description: </span>
                <TextField
                    variant="outlined"
                    multiline={true}
                    className={classes.textField}
                    name={projectFields.projectDescription}
                    value={project.projectDescription}
                    onChange={onChangeProjectField}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Start date: </span>
                <TextField
                    variant="outlined"
                    type="date"
                    className={classes.textField}
                    name={projectFields.startDate}
                    value={moment(project.startDate).format('yyyy-MM-DD')}
                    onChange={onChangeProjectField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>End date: </span>
                <TextField
                    variant="outlined"
                    type="date"
                    className={classes.textField}
                    name={projectFields.endDate}
                    value={moment(project.endDate).format('yyyy-MM-DD')}
                    onChange={onChangeProjectField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <Button onClick={onClickProjectCreate} className={classes.button} variant="outlined">
                Create project
            </Button>
        </div>
    );
};

export default ProjectCreation;
