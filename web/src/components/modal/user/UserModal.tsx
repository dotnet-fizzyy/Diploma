import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { userFields } from '../../../constants/userConstants';
import { ISelectedItem } from '../../../types/storyTypes';
import { IUser } from '../../../types/userTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '750px',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
        },
        header: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            color: '#242126',
            fontWeight: 'bold',
        },
        fieldContainer: {
            margin: '20px 0',
        },
        textField: {
            width: '100%',
            marginTop: '10px',
        },
        footerItem: {
            flexBasis: '230px',
            flexShrink: 0,
        },
        button: {
            width: '150px',
            height: '40px',
            marginTop: '30px',
            backgroundColor: '#75BAF7',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
            border: 'none',
            textTransform: 'capitalize',
            color: '#FFF',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
            },
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
    })
);

export interface IUserCreationProps {
    user: IUser;
    userRoles: ISelectedItem[];
    userPositions: ISelectedItem[];
    onChangeUserField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onClickCreateUser: () => void;
}

const UserModal = (props: IUserCreationProps) => {
    const classes = useStyles();
    const { user, userRoles, userPositions, onChangeUserField, onClickCreateUser } = props;

    return (
        <div className={classes.root}>
            <span className={classes.header}>Create a new team member</span>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Name: </span>
                <TextField
                    variant="outlined"
                    value={user.userName}
                    className={classes.textField}
                    name={userFields.userName}
                    onChange={onChangeUserField}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Password: </span>
                <TextField
                    variant="outlined"
                    type="password"
                    className={classes.textField}
                    value={user.password}
                    name={userFields.password}
                    onChange={onChangeUserField}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Email: </span>
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    value={user.email}
                    name={userFields.email}
                    onChange={onChangeUserField}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>User position: </span>
                <Select
                    value={user.userPosition ? user.userPosition : ''}
                    name={userFields.userPosition}
                    className={classes.textField}
                    onChange={(e: any) => onChangeUserField(e)}
                    variant="outlined"
                >
                    {userPositions.map((item) => (
                        <MenuItem key={item.key} value={item.key}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>User Role: </span>
                <Select
                    value={user.userRole ? user.userRole : ''}
                    name={userFields.userRole}
                    className={classes.textField}
                    onChange={(e: any) => onChangeUserField(e)}
                    variant="outlined"
                >
                    {userRoles.map((item) => (
                        <MenuItem key={item.key} value={item.key}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <Button onClick={onClickCreateUser} className={classes.button}>
                Create user
            </Button>
        </div>
    );
};

export default UserModal;
