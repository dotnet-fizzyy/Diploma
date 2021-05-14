import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IStory } from '../../../types/storyTypes';
import Button, { ButtonVariant } from '../../common/Button';
import MainLabel, { LabelType } from '../../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        body: {
            margin: '20px 0',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
        },
        footer: {
            height: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: 'auto 0 0 0',
        },
    })
);

export interface ISidebarStoryRemoveProps {
    story: IStory;
    onClickRemoveStory: () => void;
    onClickCancelRemove: () => void;
}

const SidebarStoryRemove = (props: ISidebarStoryRemoveProps) => {
    const classes = useStyles();
    const { story, onClickRemoveStory, onClickCancelRemove } = props;

    return (
        <div className={classes.root}>
            <MainLabel title="Story Remove" variant={LabelType.SECONDARY} />
            <div className={classes.body}>
                <span className={classes.text}>
                    Are you sure you want to remove story <b>{story && story.title}?</b>
                </span>
            </div>
            <div className={classes.footer}>
                <Button
                    label="Remove"
                    onClick={onClickRemoveStory}
                    disabled={false}
                    buttonVariant={ButtonVariant.PRIMARY}
                />
                <Button
                    label="Cancel"
                    onClick={onClickCancelRemove}
                    disabled={false}
                    buttonVariant={ButtonVariant.SECONDARY}
                />
            </div>
        </div>
    );
};

export default SidebarStoryRemove;
