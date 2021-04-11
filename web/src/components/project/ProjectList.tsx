import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IEpic } from '../../types/epicTypes';
import { ISprint } from '../../types/sprintTypes';
import Button from '../common/Button';
import MainLabel, { LabelType } from '../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '500px',
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
    listItems: (IEpic | ISprint)[];
    onClickCreate: () => void;
}

const ProjectList = (props: IWorkSpaceListProps) => {
    const classes = useStyles();
    const { label, listItems, onClickCreate } = props;

    const getSprintItem = ({ sprintId, sprintName }: ISprint): React.ReactNode => {
        return (
            <div key={sprintId} className={classes.listItem}>
                <span className={classes.text}>{sprintName}</span>
            </div>
        );
    };

    const getEpicItem = ({ epicId, epicName }: IEpic): React.ReactNode => {
        return (
            <div key={epicId} className={classes.listItem}>
                <span className={classes.text}>{epicName}</span>
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
                    ? listItems.map((item: IEpic | ISprint) =>
                          'epicId' in item ? getEpicItem(item as IEpic) : getSprintItem(item as ISprint)
                      )
                    : null}
            </div>
        </div>
    );
};

export default ProjectList;
