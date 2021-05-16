import { MenuItem, Select, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
    createStyles({
        tab: {
            textDecoration: 'none',
            fontFamily: 'Poppins, sans-serif',
            color: '#212624',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '6px 16px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        disabledLink: {
            color: '#959898',
            fontWeight: 500,
        },
        dropdown: {
            marginLeft: '20px',
        },
        menuGutters: {
            padding: 0,
        },
    })
);

export interface ISelectTabItem {
    key: string;
    value: string;
    link?: string;
}

export interface ISelectTabProps {
    value: string;
    items: ISelectTabItem[];
    isRoute: boolean;
    onChange?: (e) => void;
}

const SelectTab = (props: ISelectTabProps) => {
    const classes = useStyles();
    const { value, items, isRoute, onChange } = props;

    const getActiveOrDisabledLink = (isActive: boolean, route: string, label: string): React.ReactNode => {
        return isActive ? (
            <Link to={route} className={classes.tab}>
                {label}
            </Link>
        ) : (
            <Tooltip title={isRoute ? 'This item has not been created yet' : ''}>
                <span className={classnames(classes.tab, { [classes.disabledLink]: isRoute })}>{label}</span>
            </Tooltip>
        );
    };

    return (
        <Select value={value} onChange={onChange} className={classes.dropdown}>
            {items && items.length
                ? items.map((x) => (
                      <MenuItem key={x.key} value={x.key} classes={{ gutters: classes.menuGutters }}>
                          {getActiveOrDisabledLink(!!x.link, x.link, x.value)}
                      </MenuItem>
                  ))
                : null}
        </Select>
    );
};

export default SelectTab;
