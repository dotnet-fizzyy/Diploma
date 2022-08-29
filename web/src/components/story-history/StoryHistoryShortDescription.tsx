import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import { ColumnNames } from '../../constants/board';
import MainLabel, { LabelType } from '../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            margin: '20px 0 40px 0',
        },
        body: {
            display: 'flex',
            flexDirection: 'row',
        },
        infoContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: '40px',
        },
        text: {
            marginTop: '10px',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 400,
            '&:last-child': {
                marginTop: '3px',
            },
        },
    })
);

export interface IStoryHistoryShortDescriptionProps {
    title: string;
    creationDate: Date;
    columnId: string;
    estimate: number;
}

const StoryHistoryShortDescription = (props: IStoryHistoryShortDescriptionProps) => {
    const classes = useStyles();
    const { title, creationDate, estimate, columnId } = props;

    return (
        <div className={classes.root}>
            <MainLabel title="Short info" variant={LabelType.SECONDARY} />
            <div className={classes.body}>
                <div className={classes.infoContainer}>
                    <span className={classes.text}>
                        Title: <b>{title}</b>
                    </span>
                    <span className={classes.text}>
                        Creation Date: <b>{moment(creationDate).format(DateFormat)}</b>
                    </span>
                </div>
                <div className={classes.infoContainer}>
                    <span className={classes.text}>
                        Column: <b>{ColumnNames[columnId]}</b>
                    </span>
                    <span className={classes.text}>
                        Estimate: <b>{estimate}d</b>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StoryHistoryShortDescription;
