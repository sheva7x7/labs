import React, { useMemo, useState } from 'react';
import { Table, TableProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import { useParams } from 'react-router-dom';
import { Client, Asset } from '../types';
import Filters from './Filters';
import styles from './Assets.styles';

const useStyles = createUseStyles(styles);

const Assets = () => {
    const classes = useStyles();
    const params = useParams();
    const clientId = params.clientId;
    const [queryString, setQueryString] = useState('');
    const { data: clientData, isLoading } = useQuery<Client>({
        queryKey: ['client', clientId, queryString],
        queryFn: async () => {
            const url = `${process.env.REACT_APP_API_ROOT}/client/${clientId}${queryString ? '?' + queryString : ''}`;
            const data = await fetch(url);
            return data.json();
        },
    });

    const columns: TableProps<Asset>['columns'] = [
        {
            title: 'subdomain',
            dataIndex: 'subdomain',
            key: 'subdomain',
        },
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: 'port',
            dataIndex: 'port',
            key: 'port',
            render: (_, { port }) => (
                <div key={`${port.type}-${port.number}}`}>
                    {port.type} / {port.number}
                </div>
            ),
        },
        {
            title: 'techonologies',
            dataIndex: 'techonologies',
            key: 'techonologies',
            render: (_, { technologies }) => {
                return (
                    <ul className={cx(classes.unStyledList)}>
                        {technologies.map((technology) => (
                            <li
                                className={cx(classes.unstyledListItem)}
                                key={`${technology.type}-${technology.version}`}
                            >
                                {technology.type}: {technology.version}
                            </li>
                        ))}
                    </ul>
                );
            },
        },
        {
            title: 'hunts',
            dataIndex: 'hunts',
            key: 'hunts',
            render: (_, { hunts }) => (
                <ul className={cx(classes.unStyledList)}>
                    {hunts.map((hunt) => (
                        <li
                            className={cx(classes.unstyledListItem)}
                            key={hunt.id}
                        >
                            {hunt.vulnerability_code}: {hunt.description}
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    const rows = useMemo(() => {
        if (!clientData?.assets || !clientData?.assets.length) {
            return [];
        }
        return clientData.assets.map((asset) => {
            return {
                ...asset,
                key: asset.id,
            };
        });
    }, [clientData]);

    const onFiltersApply = (qs: string) => {
        setQueryString(qs);
    };

    return (
        <div>
            <Filters onFiltersApply={onFiltersApply} />
            <Table
                data-testid="assets-table"
                columns={columns}
                dataSource={rows || []}
                loading={isLoading}
            />
        </div>
    );
};

export default Assets;
