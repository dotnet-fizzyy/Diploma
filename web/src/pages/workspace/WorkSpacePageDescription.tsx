import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import PageHeaderTab from '../../components/header/page-header/PageHeaderTab';
import WorkSpaceTab from '../../components/workspace/WorkSpaceTab';
import WorkSpaceTable from '../../components/workspace/WorkSpaceTable';
import { DateFormat } from '../../constants';
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
            marginTop: '20px',
        },
        settingsHeaderPart: {
            flexGrow: 0,
            flexBasis: '180px',
            flexShrink: 0,
            '& button': {
                marginBottom: '10px',
            },
        },
    })
);

export interface IWorkSpacePageDescriptionProps {
    workSpace: IWorkSpace;
    workSpaceProjects: IWorkSpacePageProject[];
    selectedProjectId: string;
    onClickUpdateWorkSpaceInfo: () => void;
    onClickCreateProject: () => void;
    onClickViewProject: (projectId: string) => void;
    onClickViewTeam: (teamId: string) => void;
    onChangeSelectedProjectId: (projectId: string) => void;
    onClickRemoveProject: () => void;
}

const WorkSpacePageDescription = (props: IWorkSpacePageDescriptionProps) => {
    const classes = useStyles();
    const {
        selectedProjectId,
        workSpace: { workSpaceName, workSpaceDescription, creationDate },
        workSpaceProjects,
        onClickUpdateWorkSpaceInfo,
        onClickViewProject,
        onClickViewTeam,
        onClickCreateProject,
        onChangeSelectedProjectId,
        onClickRemoveProject,
    } = props;

    return (
        <div className={classes.root}>
            <WorkSpaceTab
                onClickUpdateWorkSpaceInfo={onClickUpdateWorkSpaceInfo}
                onClickCreateProject={onClickCreateProject}
            />
            <div className={classes.body}>
                <PageHeaderTab
                    title={workSpaceName}
                    descriptionItems={[
                        { title: 'Description', description: workSpaceDescription },
                        { title: 'Creation date', description: moment(creationDate).format(DateFormat) },
                    ]}
                />
                <div className={classes.table}>
                    <WorkSpaceTable
                        selectedProjectId={selectedProjectId}
                        workSpaceProjects={workSpaceProjects}
                        onClickViewProject={onClickViewProject}
                        onClickViewTeam={onClickViewTeam}
                        onChangeSelectedProjectId={onChangeSelectedProjectId}
                        onClickRemoveProject={onClickRemoveProject}
                    />
                </div>
            </div>
        </div>
    );
};

export default WorkSpacePageDescription;
