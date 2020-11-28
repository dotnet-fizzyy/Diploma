import { MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ISelectedItem } from '../../../types/storyTypes';

const useStyles = makeStyles(() =>
    createStyles({
        rootSelectStyle: {
            width: '100%',
        },
    })
);

export interface IStoryCreationDropdownProps {
    id: string;
    title: string;
    name: string;
    items: ISelectedItem[];
    onChangeItem: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StoryCreationDropdown = (props: IStoryCreationDropdownProps) => {
    const classes = useStyles();
    const { id, name, items, title, onChangeItem } = props;

    return (
        <div>
            <span>{title}:</span>
            <Select
                value={id ? id : ''}
                name={name}
                className={classes.rootSelectStyle}
                onChange={(e: any) => onChangeItem(e)}
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

export default StoryCreationDropdown;
