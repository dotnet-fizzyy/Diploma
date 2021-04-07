import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IProjectListItem } from '../../types/projectTypes';
import { ITeamListItem } from '../../types/teamTypes';
import Button from '../common/Button';
import MainLabel, { LabelType } from '../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '500px',
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        body: {
            padding: '30px',
        },
        list: {
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
        },
        listItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            color: '#242126',
        },
        buttonContainer: {
            width: '150px',
        },
    })
);

export interface IWorkSpaceListProps {
    label: string;
    listItems: (ITeamListItem | IProjectListItem)[];
    onClickViewProject: (projectId: string) => void;
    onClickViewTeam: (teamId: string) => void;
    onClickCreate: () => void;
}

const WorkSpaceList = (props: IWorkSpaceListProps) => {
    const classes = useStyles();
    const { label, listItems, onClickCreate } = props;

    const getProjectItem = ({ projectId, projectName }: IProjectListItem): React.ReactNode => {
        const onClickViewProject = (): void => {
            props.onClickViewProject(projectId);
        };

        return (
            <div key={projectId} className={classes.listItem}>
                <span className={classes.text}>{projectName}</span>
                <div className={classes.buttonContainer}>
                    <Button label="View" disabled={false} onClick={onClickViewProject} />
                </div>
            </div>
        );
    };

    const getTeamItem = ({ teamId, teamName }: ITeamListItem): React.ReactNode => {
        const onClickViewTeam = (): void => {
            props.onClickViewTeam(teamId);
        };

        return (
            <div key={teamId} className={classes.listItem}>
                <span className={classes.text}>{teamName}</span>
                <div className={classes.buttonContainer}>
                    <Button label="View" disabled={false} onClick={onClickViewTeam} />
                </div>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <MainLabel title={label} variant={LabelType.SECONDARY} />
                <div className={classes.buttonContainer}>
                    <Button label="Add" disabled={false} onClick={onClickCreate} />
                </div>
            </div>
            <div className={classes.list}>
                {listItems && listItems.length
                    ? listItems.map((item: IProjectListItem | ITeamListItem) =>
                          'teamId' in item ? getTeamItem(item) : getProjectItem(item)
                      )
                    : null}
            </div>
        </div>
    );
};

export default WorkSpaceList;
