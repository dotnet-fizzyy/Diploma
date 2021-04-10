import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../../constants';
import Button from '../../common/Button';
import MainLabel, { LabelType } from '../../common/MainLabel';

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
            flexBasis: '180px',
            flexShrink: 0,
            '& button': {
                marginBottom: '10px',
            },
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
        creationDate: {
            marginLeft: '30px',
            fontSize: '14px',
        },
    })
);

export interface IPageHeaderTab {
    title: string;
    description: string;
    creationDate: Date;
    children?: React.ReactNode;
    onClickUpdateInfo: () => void;
}

const PageHeaderTab = (props: IPageHeaderTab) => {
    const classes = useStyles();
    const { children, title, creationDate, description, onClickUpdateInfo } = props;

    return (
        <div className={classes.root}>
            <div className={classes.descriptionHeaderPart}>
                <MainLabel title={title} variant={LabelType.PRIMARY} />
                <span className={classnames(classes.text, classes.creationDate)}>
                    Creation date: {moment(creationDate).format(DateFormat)}
                </span>
                <div className={classes.descriptionContainer}>
                    <span className={classnames(classes.text, classes.descriptionLabel)}>Description</span>
                    <span className={classnames(classes.text, classes.descriptionText)}>{description || '-'}</span>
                </div>
            </div>
            <div className={classes.settingsHeaderPart}>
                <Button label="Update info" disabled={false} onClick={onClickUpdateInfo} />
                {children}
            </div>
        </div>
    );
};

export default PageHeaderTab;
