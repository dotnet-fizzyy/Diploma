import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IWorkSpace, IWorkSpacePageProject } from '../../types/workspace';
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
    selectedProjectId: string;
    onClickCreateProject: () => void;
    onClickUpdateWorkSpaceInfo: () => void;
    onClickViewProject: (projectId: string) => void;
    onClickViewTeam: (teamId: string) => void;
    onChangeSelectedProjectId: (projectId: string) => void;
    onClickRemoveProject: () => void;
}

const WorkSpacePage = (props: IWorkSpacePageProps) => {
    const classes = useStyles();
    const {
        isLoading,
        workSpace,
        workSpaceProjects,
        onClickUpdateWorkSpaceInfo,
        selectedProjectId,
        onClickViewProject,
        onClickCreateProject,
        onChangeSelectedProjectId,
        onClickViewTeam,
        onClickRemoveProject,
    } = props;

    return (
        <div className={classes.root}>
            {!isLoading && workSpace && workSpace.workSpaceId && (
                <WorkSpacePageDescription
                    workSpace={workSpace}
                    workSpaceProjects={workSpaceProjects}
                    selectedProjectId={selectedProjectId}
                    onClickUpdateWorkSpaceInfo={onClickUpdateWorkSpaceInfo}
                    onClickViewProject={onClickViewProject}
                    onClickViewTeam={onClickViewTeam}
                    onClickCreateProject={onClickCreateProject}
                    onChangeSelectedProjectId={onChangeSelectedProjectId}
                    onClickRemoveProject={onClickRemoveProject}
                />
            )}
        </div>
    );
};

export default WorkSpacePage;
