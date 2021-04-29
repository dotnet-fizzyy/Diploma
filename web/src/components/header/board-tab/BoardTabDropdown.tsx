import { MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ISelectedItem } from '../../../types/storyTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: '40px',
            width: '140px',
        },
    })
);

export interface IBoardTabDropdownProps {
    value: string;
    items: ISelectedItem[];
    onChangeEvent: (e) => void;
}

const BoardTabDropdown = (props: IBoardTabDropdownProps) => {
    const classes = useStyles();
    const { value, items, onChangeEvent } = props;

    return (
        <Select className={classes.root} variant="outlined" value={value} onChange={onChangeEvent}>
            {items &&
                items.map((x) => (
                    <MenuItem key={x.key} value={x.key}>
                        {x.value}
                    </MenuItem>
                ))}
        </Select>
    );
};

export default BoardTabDropdown;
