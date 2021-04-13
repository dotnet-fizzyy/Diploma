import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '../../components/common/Button';
import PageHeaderTab from '../../components/header/page-header/PageHeaderTab';
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
                <PageHeaderTab
                    title={workSpaceName}
                    descriptionItems={[{ title: 'Description', description: workSpaceDescription }]}
                    creationDate={creationDate}
                    options={
                        <div className={classes.settingsHeaderPart}>
                            <Button label="Update info" disabled={false} onClick={onClickUpdateWorkSpaceInfo} />
                            <Button label="Create project" disabled={false} onClick={onClickCreateProject} />
                            <Button label="Create customer" disabled={false} onClick={onClickCreateCustomer} />
                        </div>
                    }
                />
                <div className={classes.table}>
                    <WorkSpaceTable workSpaceProjects={workSpaceProjects} onClickViewProject={onClickViewProject} />
                </div>
            </div>
        </div>
    );
};

export default WorkSpacePageDescription;
