import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import { IEpic } from '../../types/epicTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        detailsPart: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
        itemContainer: {
            marginTop: '10px',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '16px',
            color: '#242126',
        },
        descriptionText: {
            fontWeight: 500,
        },
    })
);

export interface IEpicsTabProps {
    epic: IEpic;
}

const EpicsTab = (props: IEpicsTabProps) => {
    const classes = useStyles();
    const {
        epic: { epicName, epicDescription, startDate, endDate },
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.detailsPart}>
                <div className={classes.itemContainer}>
                    <span className={classes.text}>
                        Name: <span className={classes.descriptionText}>{epicName}</span>
                    </span>
                </div>
                <div className={classes.itemContainer}>
                    <span className={classes.text}>
                        Description: <span className={classes.descriptionText}>{epicDescription}</span>
                    </span>
                </div>
            </div>
            <div className={classes.detailsPart}>
                <div className={classes.itemContainer}>
                    <span className={classes.text}>
                        Start date:{' '}
                        <span className={classes.descriptionText}>{moment(startDate).format(DateFormat)}</span>
                    </span>
                </div>
                <div className={classes.itemContainer}>
                    <span className={classes.text}>
                        End date: <span className={classes.descriptionText}>{moment(endDate).format(DateFormat)}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EpicsTab;
