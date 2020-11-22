import { MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ISelectedItem } from '../../../types/storyTypes';

const useStyles = makeStyles(() =>
    createStyles({
        sectionContainer: {
            marginTop: '20px',
        },
        rootSelectStyle: {
            width: '100%',
        },
    })
);

export interface IStoryDropdownMenuProps {
    id: string;
    title: string;
    items: ISelectedItem[];
    disabled: boolean;
    onChangeItem: (value: string) => void;
}

const StoryDropdownMenu = (props: IStoryDropdownMenuProps) => {
    const classes = useStyles();
    const { id, title, disabled, items, onChangeItem } = props;

    return (
        <div className={classes.sectionContainer}>
            <p>{title}</p>
            <Select
                value={id ? id : ''}
                className={classes.rootSelectStyle}
                disabled={disabled}
                onChange={(event: any) => onChangeItem(event.target.value)}
                variant="outlined"
            >
                {items.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                        {item.value}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default StoryDropdownMenu;
