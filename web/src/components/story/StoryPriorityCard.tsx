import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { Priority } from '../../constants/storyConstants';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '80px',
            borderRadius: '5px',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '12px',
        },
        low: {
            backgroundColor: '#EAFCFF',
            color: '#38C3FF',
        },
        medium: {
            backgroundColor: '#FFF7EA',
            color: '#FF9A38',
        },
        high: {
            backgroundColor: '#FFEAEA',
            color: '#FF3838',
        },
    })
);

export interface IStoryPriorityCardProps {
    priority: Priority;
}

const StoryPriorityCard = (props: IStoryPriorityCardProps) => {
    const classes = useStyles();
    const { priority } = props;

    const getLabel = () => {
        switch (priority) {
            case Priority.LOW:
                return 'Low';
            case Priority.HIGH:
                return 'High';
            case Priority.MEDIUM:
                return 'Medium';
            default:
                return '';
        }
    };

    return (
        <div
            className={classnames(classes.root, {
                [classes.low]: priority === Priority.LOW,
                [classes.medium]: priority === Priority.MEDIUM,
                [classes.high]: priority === Priority.HIGH,
            })}
        >
            <span>{getLabel()}</span>
        </div>
    );
};

export default React.memo(StoryPriorityCard);
