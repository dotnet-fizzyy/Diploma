import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import WorkSpaceHeader from '../../components/workspace/WorkSpaceHeader';
import WorkSpaceTable from '../../components/workspace/WorkSpaceTable';
import { IWorkSpace, IWorkSpacePageProject } from '../../types/workSpaceTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFAFA',
        },
        body: {
            padding: '30px',
        },
        table: {
            marginTop: '50px',
        },
    })
);

export interface IWorkSpacePageDescriptionProps {
    workSpace: IWorkSpace;
    workSpaceProjects: IWorkSpacePageProject[];
    onClickUpdateWorkSpaceInfo: () => void;
    onClickCreateProject: () => void;
    onClickCreateCustomer: () => void;
    onClickViewProject: (projectId: string) => void;
}

const WorkSpacePageDescription = (props: IWorkSpacePageDescriptionProps) => {
    const classes = useStyles();
    const {
        workSpace: { workSpaceName, workSpaceDescription, creationDate },
        workSpaceProjects,
        onClickUpdateWorkSpaceInfo,
        onClickViewProject,
        onClickCreateProject,
        onClickCreateCustomer,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <WorkSpaceHeader
                    workSpaceName={workSpaceName}
                    workSpaceDescription={workSpaceDescription}
                    workSpaceCreationDate={creationDate}
                    onClickUpdateWorkSpaceInfo={onClickUpdateWorkSpaceInfo}
                    onClickCreateProject={onClickCreateProject}
                    onClickCreateCustomer={onClickCreateCustomer}
                />
                <div className={classes.table}>
                    <WorkSpaceTable workSpaceProjects={workSpaceProjects} onClickViewProject={onClickViewProject} />
                </div>
            </div>
        </div>
    );
};

export default WorkSpacePageDescription;
