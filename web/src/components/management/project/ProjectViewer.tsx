import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import classnames from 'classnames';
import React from 'react';
import { ISelectedItem } from '../../../types/storyTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFAFA',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            marginTop: '20px',
            fontSize: '26px',
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        projectLink: {
            fontSize: '18px',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                cursor: 'pointer',
            },
            height: '50px',
            display: 'flex',
            alignItems: 'center',
        },
        projectName: {
            width: '200px',
        },
        button: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            width: '145px',
            height: '45px',
            fontSize: '16px',
            textTransform: 'capitalize',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                border: '1px solid lightgrey',
                backgroundColor: '#E8F4FF',
                color: '#75BAF7',
                boxShadow: 'none',
            },
        },
        manageButton: {
            height: 'auto',
            marginRight: '20px',
            width: '170px',
        },
        emptyProjects: {
            fontFamily: 'Poppins',
            fontSize: '20px',
            display: 'flex',
            justifyContent: 'center',
        },
    })
);

export interface IProjectViewerProps {
    projects: ISelectedItem[];
    onProjectSelect: (value: string) => void;
    onClickAddProject: () => void;
}

const ProjectViewer = (props: IProjectViewerProps) => {
    const classes = useStyles();
    const { projects, onClickAddProject, onProjectSelect } = props;

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <Button
                    onClick={onClickAddProject}
                    className={classes.button}
                    variant="outlined"
                    startIcon={<AddIcon />}
                >
                    Add Project
                </Button>
                <span className={classes.header}>Your projects</span>
                <div className={classes.body}>
                    {projects && projects.length ? (
                        projects.map((project) => (
                            <div key={project.key} className={classes.projectLink}>
                                <span className={classes.projectName}>{project.value}</span>
                                <Button
                                    className={classnames(classes.button, classes.manageButton)}
                                    variant="outlined"
                                    onClick={() => onProjectSelect(project.key)}
                                >
                                    Manage project
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className={classes.emptyProjects}>Create your first project!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectViewer;
