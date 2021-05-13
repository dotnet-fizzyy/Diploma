import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MainLabel, { LabelType } from '../../components/common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            backgroundColor: '#FAFAFA',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
    })
);

export interface IStatsPageProps {}

const StatsPage = (props: IStatsPageProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <MainLabel title="Statistics" variant={LabelType.PRIMARY} />
            </div>
        </div>
    );
};

export default StatsPage;
