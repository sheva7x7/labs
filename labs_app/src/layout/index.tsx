import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Layout as AntLayout, Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import styles from './index.styles';
import { Client } from './types';

const { Header, Content } = AntLayout;

const useStyles = createUseStyles(styles);

interface Props {
    children?: ReactElement;
}

const Layout: FC<Props> = ({ children }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const locations = location.pathname.split('/');
    const [selected, setSelected] = useState<string>('');

    const { data: clientListData, isError } = useQuery<Client[]>({
        queryKey: ['clientList'],
        queryFn: async () => {
            const data = await fetch(
                `${process.env.REACT_APP_API_ROOT}/client/list`,
            );
            return data.json();
        },
    });

    const clientList = useMemo(() => {
        if (!clientListData?.length) {
            return [];
        }
        return clientListData.map((client) => ({
            key: client.id,
            label: client.name,
            title: client.name,
        }));
    }, [clientListData]);

    useEffect(() => {
        if (locations.length >= 2) {
            const clientId = locations[2];
            for (const client of clientList) {
                console.log({ client });
                if (client.key === clientId) {
                    setSelected(client.title);
                    break;
                }
            }
        }
    }, [locations, clientList]);

    const onMenuSelect = (menuItem: any) => {
        const { item, key } = menuItem;
        setSelected(item.props.title);
        navigate(`/client/${key}`);
    };

    return (
        <AntLayout className={cx(classes.layout)}>
            <Header className={cx(classes.header)}>
                <div className={cx(classes.title)}>Labs</div>
                <Dropdown
                    menu={{
                        items: clientList,
                        selectable: true,
                        onSelect: onMenuSelect,
                    }}
                >
                    <div className={cx(classes.dropdownTitle)}>
                        {selected || 'Select a client'}
                    </div>
                </Dropdown>
            </Header>
            <Content className={cx(classes.content)}>
                {isError ? 'Error loading clients' : children}
            </Content>
        </AntLayout>
    );
};

export default Layout;
