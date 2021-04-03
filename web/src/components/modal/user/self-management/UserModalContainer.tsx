import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatarRequest } from '../../../../redux/actions/userActions';
import { getUser } from '../../../../redux/selectors/userSelectors';
import { IUser } from '../../../../types/userTypes';
import UserModal, { IUserModalProps } from './UserModal';

const UserModalContainer = () => {
    const dispatch = useDispatch();
    const fileRef = useRef<HTMLInputElement>(null);

    const user: IUser = useSelector(getUser);

    const onClickUpdateAvatar = (): void => {
        if (fileRef && fileRef.current) {
            fileRef.current.click();
        }
    };

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            dispatch(updateAvatarRequest(event.target.files[0], user.userId));
        }
    };

    const userModalProps: IUserModalProps = {
        user,
        fileRef,
        onClickUpdateAvatar,
        onChangeFile,
    };

    return <UserModal {...userModalProps} />;
};

export default UserModalContainer;
