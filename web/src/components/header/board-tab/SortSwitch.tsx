import { Switch } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { SortDirection } from '../../../constants/storyConstants';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        switchThumb: {
            backgroundColor: '#75BAF7',
        },
        switchTrack: {
            backgroundColor: '#75BAF7 !important',
        },
        text: {
            fontSize: '16px',
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: '#242126',
        },
    })
);

export interface ISortSwitchProps {
    value: SortDirection;
    onChangeSortDirection: (value: SortDirection) => void;
}

const SortSwitch = (props: ISortSwitchProps): JSX.Element => {
    const classes = useStyles();
    const { value, onChangeSortDirection } = props;

    const [isChecked, setIsChecked] = useState<boolean>(value === SortDirection.ASC);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.checked) {
            onChangeSortDirection(SortDirection.DESC);
        } else {
            onChangeSortDirection(SortDirection.ASC);
        }

        setIsChecked(!isChecked);
    };

    return (
        <div className={classes.root}>
            <span className={classes.text}>Asc</span>
            <Switch
                color="primary"
                classes={{ thumb: classes.switchThumb, track: classes.switchTrack }}
                value={isChecked}
                onChange={onChange}
            />
            <span className={classes.text}>Desc</span>
        </div>
    );
};

export default SortSwitch;
