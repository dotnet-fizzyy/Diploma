import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { TabLinkItems, TabLinkOptions } from '../../../constants';
import { UserPosition, UserRole } from '../../../constants/user';
import { IUserProject, IUserTeam } from '../../../types/user';
import { isUserCustomer } from '../../../utils';
import Tooltip from '../../common/Tooltip';
import SelectTab, { ISelectTabItem } from './SelectTab';

const useStyles = makeStyles(() =>
    createStyles({
        text: {
            textDecoration: 'none',
            fontFamily: 'Poppins, sans-serif',
            color: '#212624',
            fontSize: '16px',
            fontWeight: 'bold',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        disabledText: {
            color: '#AFC1C4',
        },
    })
);

export interface ITabLinks {
    userRole: UserRole;
    userPosition: UserPosition;
    teams: IUserTeam[];
    projects: IUserProject[];
    selectedTeamId: string;
    selectedProjectId: string;
    onChangeTeam: (e: any) => void;
    onChangeProject: (e: any) => void;
}

const TabLinks = (props: ITabLinks) => {
    const classes = useStyles();
    const {
        teams,
        userPosition,
        userRole,
        projects,
        selectedTeamId,
        selectedProjectId,
        onChangeTeam,
        onChangeProject,
    } = props;

    const projectItems: ISelectTabItem[] = projects.map((x) => ({ key: x.projectId, value: x.projectName }));
    const teamItems: ISelectTabItem[] = teams.reduce(
        (acc, x) => (x.projectId === selectedProjectId ? [...acc, { key: x.teamId, value: x.teamName }] : acc),
        []
    );
    const defaultItemsTab: ISelectTabItem[] = TabLinkItems.map((x) => {
        const isCustomer: boolean = isUserCustomer(userRole, userPosition);

        switch (x.key) {
            case TabLinkOptions.WORKSPACE:
                x.link = isCustomer ? '/workspace' : '';
                x.errorMessage = !isCustomer ? 'This option is available only for customers' : '';
                break;
            case TabLinkOptions.BOARD:
                x.link = '/board';
                break;
            case TabLinkOptions.PROJECT:
                x.link = isCustomer ? `/project/${selectedProjectId}` : '';
                x.errorMessage = !isCustomer ? 'This option is available only for customers' : '';
                break;
            case TabLinkOptions.TEAM:
                x.link = `/team/${selectedTeamId}`;
                break;
            case TabLinkOptions.CHARTS:
                x.link = `/charts?projectId=${selectedProjectId}`;
                break;
            default:
                break;
        }

        return x;
    });

    const getSelectTab = (
        items: ISelectTabItem[],
        onChange: (e: any) => void,
        isRoute: boolean,
        selectedValue: string,
        label: string,
        link: string
    ): React.ReactNode => {
        if ((!items && !items.length) || !items.some((x) => x.key === selectedValue)) {
            return (
                <Tooltip message="No items created yet">
                    <span className={classnames(classes.text, classes.disabledText)}>{label}</span>
                </Tooltip>
            );
        }

        if (items && items.length === 1) {
            return (
                <Link to={{ pathname: link }} className={classes.text}>
                    {items[0].value}
                </Link>
            );
        }

        return <SelectTab value={selectedValue} items={items} onChange={onChange} isRoute={isRoute} />;
    };

    return (
        <>
            <SelectTab value={defaultItemsTab[0].key} items={defaultItemsTab} isRoute={true} />
            {getSelectTab(
                projectItems,
                onChangeProject,
                false,
                selectedProjectId,
                'Project',
                `/project/${selectedProjectId}`
            )}
            {getSelectTab(teamItems, onChangeTeam, false, selectedTeamId, 'Team', `/team/${selectedTeamId}`)}
        </>
    );
};

export default TabLinks;
