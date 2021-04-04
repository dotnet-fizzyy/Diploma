import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import Button from '../common/Button';
import MainLabel, { LabelType } from '../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
        },
        descriptionHeaderPart: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
        settingsHeaderPart: {
            flexGrow: 0,
            flexBasis: '150px',
            flexShrink: 0,
        },
        descriptionContainer: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            color: '#242126',
        },
        descriptionLabel: {
            fontWeight: 'bold',
        },
        descriptionText: {
            marginTop: '5px',
        },
    })
);

export interface IWorkSpaceHeader {
    workSpaceName: string;
    workSpaceDescription: string;
    workSpaceCreationDate: Date;
    onClickUpdateWorkSpaceInfo: () => void;
}

const WorkSpaceHeader = (props: IWorkSpaceHeader) => {
    const classes = useStyles();
    const { workSpaceName, workSpaceDescription, workSpaceCreationDate, onClickUpdateWorkSpaceInfo } = props;

    return (
        <div className={classes.root}>
            <div className={classes.descriptionHeaderPart}>
                <MainLabel title={workSpaceName} variant={LabelType.PRIMARY} />
                <div className={classes.descriptionContainer}>
                    <span className={classnames(classes.text, classes.descriptionLabel)}>Description</span>
                    <span className={classnames(classes.text, classes.descriptionText)}>
                        {workSpaceDescription || '-'}
                    </span>
                </div>
            </div>
            <div className={classes.settingsHeaderPart}>
                <span>{moment(workSpaceCreationDate).format(DateFormat)}</span>
                <Button label="Update info" disabled={false} onClick={onClickUpdateWorkSpaceInfo} />
            </div>
        </div>
    );
};

export default WorkSpaceHeader;
