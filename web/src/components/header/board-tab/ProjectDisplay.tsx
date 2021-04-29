import { createStyles, makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import classnames from 'classnames';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 0 0',
        },
        text: {
            fontSize: '20px',
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: '#242126',
        },
        projectLabel: {
            fontSize: '16px',
            color: '#AFC1C4',
        },
    })
);

export interface IProjectDisplayProps {
    projectName: string;
}

export const ProjectDisplay = (props: IProjectDisplayProps) => {
    const classes = useStyles();
    const { projectName } = props;

    return (
        <div className={classes.root}>
            <span className={classnames(classes.projectLabel)}>Projects</span>
            <NavigateNextIcon />
            {projectName && <span className={classes.text}>{projectName}</span>}
        </div>
    );
};

export default ProjectDisplay;
