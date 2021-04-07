import { Avatar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IUserListItem } from '../../types/userTypes';
import { getFirstNameLetter } from '../../utils';
import Button from '../common/Button';
import MainLabel, { LabelType } from '../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
        },
        body: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        customersListContainer: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '10px',
        },
        addCustomerContainer: {
            flexGrow: 0,
            flexBasis: '150px',
            flexShrink: 0,
        },
        customerItemContainer: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginRight: '20px',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '14px',
        },
        avatar: {
            width: '54px',
            height: '54px',
            marginBottom: '5px',
            fontSize: '26px',
        },
    })
);

export interface ICustomersListProps {
    customersList: IUserListItem[];
    onClickCreateCustomer: () => void;
}

const CustomersList = (props: ICustomersListProps) => {
    const classes = useStyles();
    const { customersList, onClickCreateCustomer } = props;

    const getCustomerItem = (customer: IUserListItem): React.ReactNode => (
        <div className={classes.customerItemContainer} key={customer.userId}>
            <Avatar className={classes.avatar} src={customer.avatarLink}>
                {getFirstNameLetter(customer.userName)}
            </Avatar>
            <span className={classes.text}>{customer.userName}</span>
        </div>
    );

    return (
        <div className={classes.root}>
            <MainLabel title="Customers" variant={LabelType.SECONDARY} />
            <div className={classes.body}>
                <div className={classes.customersListContainer}>
                    {customersList && customersList.length ? (
                        customersList.map(getCustomerItem)
                    ) : (
                        <span className={classes.text}>No customers added yet...</span>
                    )}
                </div>
                <div className={classes.addCustomerContainer}>
                    <Button label="Add" disabled={false} onClick={onClickCreateCustomer} />
                </div>
            </div>
        </div>
    );
};

export default CustomersList;
