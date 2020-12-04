import { MenuItem, Select, Tooltip } from '@material-ui/core';
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
        title: {
            fontFamily: 'Poppins',
            fontSize: '20px',
            marginBottom: '7px',
        },
        textField: {
            fontFamily: 'Poppins',
            fontSize: '18px',
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
            <p className={classes.title}>{title}</p>
            <Tooltip title={disabled ? 'Only customer or team master can change this field' : ''}>
                <Select
                    classes={{ root: classes.textField }}
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
            </Tooltip>
        </div>
    );
};

export default StoryDropdownMenu;
