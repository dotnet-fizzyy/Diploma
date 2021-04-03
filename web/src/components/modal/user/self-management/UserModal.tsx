import { Avatar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { RefObject } from 'react';
import { IUser } from '../../../../types/userTypes';
import { getFirstNameLetter } from '../../../../utils';
import Button from '../../../common/Button';
import MainLabel from '../../../common/MainLabel';
import ModalCloseButtonContainer from '../../close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '500px',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
            position: 'relative',
        },
        body: {
            paddingTop: '20px',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
        },
        photoContainer: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexGrow: 0,
            flexBasis: '150px',
            flexShrink: 0,
        },
        profileContainer: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
        buttonContainer: {
            marginTop: '20px',
            width: '170px',
        },
        uploadButtonContainer: {
            marginTop: '20px',
            width: '150px',
        },
        profilePhoto: {
            width: '120px',
            height: '120px',
            fontSize: '60px',
        },
    })
);

export interface IUserModalProps {
    user: IUser;
    fileRef: RefObject<HTMLInputElement>;
    onClickUpdateAvatar: () => void;
    onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserModal = (props: IUserModalProps) => {
    const classes = useStyles();
    const {
        user: { userName },
        fileRef,
        onClickUpdateAvatar,
        onChangeFile,
    } = props;

    return (
        <div className={classes.root}>
            <MainLabel title="Profile settings" />
            <ModalCloseButtonContainer />
            <div className={classes.body}>
                <div className={classes.photoContainer}>
                    <Avatar alt="Your image" className={classes.profilePhoto}>
                        {getFirstNameLetter(userName)}
                    </Avatar>
                    <div className={classes.uploadButtonContainer}>
                        <Button label="Upload image" disabled={false} onClick={onClickUpdateAvatar} />
                        <input type="file" ref={fileRef} hidden={true} onChange={onChangeFile} />
                    </div>
                </div>
                <div className={classes.profileContainer} />
            </div>
            <div className={classes.buttonContainer}>
                <Button label="Update" disabled={false} />
            </div>
        </div>
    );
};

export default UserModal;
