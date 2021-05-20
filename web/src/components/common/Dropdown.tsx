import { MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ISelectedItem } from '../../types/storyTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ isOutlined }: IBoardTabDropdownProps) => ({
            height: '40px',
            width: isOutlined ? '140px' : 'auto',
            borderColor: '#AFC1C4',
        }),
        outlined: {
            color: '#AFC1C4 !important',
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px !important',
        },
        select: {
            fontFamily: 'Poppins',
            fontWeight: 600,
            color: '#242126',
            fontSize: '20px',
        },
        menuItem: {
            fontFamily: 'Poppins',
            fontWeight: 600,
        },
    })
);

export interface IBoardTabDropdownProps {
    value: string;
    items: ISelectedItem[];
    onChangeEvent: (e) => void;
    isOutlined: boolean;
}

const Dropdown = (props: IBoardTabDropdownProps) => {
    const classes = useStyles(props);
    const { value, items, isOutlined, onChangeEvent } = props;

    return (
        <Select
            className={classes.root}
            disableUnderline={!!isOutlined}
            displayEmpty={true}
            classes={{ outlined: classes.outlined, select: classes.select }}
            variant={isOutlined ? 'outlined' : 'standard'}
            value={value}
            onChange={onChangeEvent}
        >
            {items &&
                items.map((x) => (
                    <MenuItem key={x.key} value={x.key} className={classes.menuItem}>
                        {x.value}
                    </MenuItem>
                ))}
        </Select>
    );
};

export default Dropdown;
