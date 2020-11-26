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
    name: string;
    items: ISelectedItem[];
    disabled: boolean;
    onChangeItem: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StoryDropdownMenu = (props: IStoryDropdownMenuProps) => {
    const classes = useStyles();
    const { id, title, name, disabled, items, onChangeItem } = props;

    return (
        <div className={classes.sectionContainer}>
            <p>{title}</p>
            <Select
                value={id ? id : ''}
                name={name}
                className={classes.rootSelectStyle}
                disabled={disabled}
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

export default StoryDropdownMenu;
