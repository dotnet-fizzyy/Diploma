import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { ColumnIds } from '../../constants/boardConstants';
import { IStorySimpleModel } from '../../types/story';
import MainLabel, { LabelType } from '../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            color: '#242126',
        },
        descriptionText: {
            fontWeight: 600,
        },
        labelContainer: {
            marginBottom: '10px',
        },
    })
);

export interface IStatsGeneralInfoProps {
    stories: IStorySimpleModel[];
}

const StatsGeneralInfo = (props: IStatsGeneralInfoProps) => {
    const classes = useStyles();
    const { stories } = props;

    const progressStoriesCount: number = stories.filter(
        (x) =>
            x.columnType === ColumnIds.InProgress ||
            x.columnType === ColumnIds.Testing ||
            x.columnType === ColumnIds.InReview
    ).length;
    const completedStoriesCount: number = stories.filter(
        (x) => x.columnType === ColumnIds.OnProd || x.columnType === ColumnIds.Confirmed
    ).length;
    const blockedStoriesCount: number = stories.filter((x) => x.isBlocked).length;

    return (
        <div className={classes.root}>
            <div className={classes.labelContainer}>
                <MainLabel title="General info" variant={LabelType.SECONDARY} />
            </div>
            <span className={classes.text}>
                Total: <span className={classnames(classes.text, classes.descriptionText)}>{stories.length}</span>
            </span>
            <span className={classes.text}>
                In progress:{' '}
                <span className={classnames(classes.text, classes.descriptionText)}>{progressStoriesCount}</span>
            </span>
            <span className={classes.text}>
                Completed:{' '}
                <span className={classnames(classes.text, classes.descriptionText)}>{completedStoriesCount}</span>
            </span>
            <span className={classes.text}>
                Blocked:{' '}
                <span className={classnames(classes.text, classes.descriptionText)}>{blockedStoriesCount}</span>
            </span>
        </div>
    );
};

export default React.memo(StatsGeneralInfo);
