import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IWorkSpace, IWorkSpacePageProject } from '../../types/workSpaceTypes';
import WorkSpacePageDescription from './WorkSpacePageDescription';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            backgroundColor: '#FAFAFA',
        },
    })
);

export interface IWorkSpacePageProps {
    workSpace: IWorkSpace;
    workSpaceProjects: IWorkSpacePageProject[];
    isLoading: boolean;
    onClickCreateProject: () => void;
    onClickUpdateWorkSpaceInfo: () => void;
    onClickViewProject: (projectId: string) => void;
}

const WorkSpacePage = (props: IWorkSpacePageProps) => {
    const classes = useStyles();
    const {
        isLoading,
        workSpace,
        workSpaceProjects,
        onClickUpdateWorkSpaceInfo,
        onClickViewProject,
        onClickCreateProject,
    } = props;

    return (
        <div className={classes.root}>
            {!isLoading && workSpace && workSpace.workSpaceId && (
                <WorkSpacePageDescription
                    workSpace={workSpace}
                    workSpaceProjects={workSpaceProjects}
                    onClickUpdateWorkSpaceInfo={onClickUpdateWorkSpaceInfo}
                    onClickViewProject={onClickViewProject}
                    onClickCreateProject={onClickCreateProject}
                />
            )}
        </div>
    );
};

export default WorkSpacePage;
