import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CustomersList from '../../components/workspace/CustomersList';
import WorkSpaceHeader from '../../components/workspace/WorkSpaceHeader';
import WorkSpaceList from '../../components/workspace/WorkSpaceList';
import { IProjectListItem } from '../../types/projectTypes';
import { ITeamListItem } from '../../types/teamTypes';
import { IUserListItem } from '../../types/userTypes';
import { IWorkSpace } from '../../types/workSpaceTypes';

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
        listsContainer: {
            display: 'flex',
            flexDirection: 'row',
        },
        list: {
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 0,
            '&:first-child': {
                marginRight: '30px',
            },
        },
    })
);

export interface IWorkSpacePageDescriptionProps {
    teamList: ITeamListItem[];
    projectList: IProjectListItem[];
    customersList: IUserListItem[];
    workSpace: IWorkSpace;
    onClickUpdateWorkSpaceInfo: () => void;
    onClickCreateCustomer: () => void;
    onClickViewProject: (projectId: string) => void;
    onClickViewTeam: (teamId: string) => void;
}

const WorkSpacePageDescription = (props: IWorkSpacePageDescriptionProps) => {
    const classes = useStyles();
    const {
        customersList,
        projectList,
        teamList,
        workSpace: { workSpaceName, workSpaceDescription, creationDate },
        onClickUpdateWorkSpaceInfo,
        onClickCreateCustomer,
        onClickViewProject,
        onClickViewTeam,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <WorkSpaceHeader
                    workSpaceName={workSpaceName}
                    workSpaceDescription={workSpaceDescription}
                    workSpaceCreationDate={creationDate}
                    onClickUpdateWorkSpaceInfo={onClickUpdateWorkSpaceInfo}
                />
                <CustomersList customersList={customersList} onClickCreateCustomer={onClickCreateCustomer} />
                <div className={classes.listsContainer}>
                    <div className={classes.list}>
                        <WorkSpaceList
                            label="Projects"
                            listItems={projectList}
                            onClickViewProject={onClickViewProject}
                            onClickViewTeam={onClickViewTeam}
                        />
                    </div>
                    <div className={classes.list}>
                        <WorkSpaceList
                            label="Teams"
                            listItems={teamList}
                            onClickViewProject={onClickViewProject}
                            onClickViewTeam={onClickViewTeam}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkSpacePageDescription;
