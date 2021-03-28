import { MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ISelectedItem } from '../../../types/storyTypes';

const useStyles = makeStyles(() =>
    createStyles({
        rootSelectStyle: {
            width: '100%',
            marginTop: '10px',
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
    })
);

export interface IStoryCreationDropdownProps {
    id: string;
    title: string;
    name: string;
    disabled?: boolean;
    items: ISelectedItem[];
    onChangeItem: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StoryCreationDropdown = (props: IStoryCreationDropdownProps) => {
    const classes = useStyles();
    const { id, name, disabled, items, title, onChangeItem } = props;

    return (
        <>
            <span className={classes.title}>{title}:</span>
            <Select
                value={id ? id : ''}
                name={name}
                className={classes.rootSelectStyle}
                onChange={(e: any) => onChangeItem(e)}
                variant="outlined"
                disabled={disabled}
            >
                {items.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                        {item.value}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default StoryCreationDropdown;
