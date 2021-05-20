import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import MainLabel, { LabelType } from '../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '20px 0 40px 0',
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            flexDirection: 'column',
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

export interface IStatsProjectShortInfoProps {
    projectName: string;
    startDate: Date;
    endDate: Date;
}

const StatsProjectShortInfo = (props: IStatsProjectShortInfoProps) => {
    const classes = useStyles();
    const { startDate, endDate, projectName } = props;

    return (
        <div className={classes.root}>
            <MainLabel title="Short info" variant={LabelType.SECONDARY} />
            <span className={classes.text}>
                Project name: <b>{projectName}</b>
            </span>
            <span className={classes.text}>
                Project lifetime:{' '}
                <b>
                    {moment(startDate).format(DateFormat)} - {moment(endDate).format(DateFormat)}
                </b>
            </span>
        </div>
    );
};

export default StatsProjectShortInfo;
