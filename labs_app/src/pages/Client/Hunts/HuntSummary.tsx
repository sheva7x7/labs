import React, { FC, useMemo } from 'react';
import { Button, Descriptions, Divider, Table, TableProps } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import styles from './HuntSummary.styles';
import { Asset, Hunt } from '../types';

const useStyles = createUseStyles(styles);

interface Props {
    huntId: string;
}

const HuntSummary: FC<Props> = ({ huntId }) => {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const {
        data: huntData,
        isLoading,
        isError,
    } = useQuery<Hunt>({
        queryKey: ['hunt', huntId],
        queryFn: async () => {
            const result = await fetch(
                `${process.env.REACT_APP_API_ROOT}/hunt/${huntId}`,
            );
            return result.json();
        },
    });

    const { data: relatedAssetData, isLoading: isRelatedAssetsLoading } =
        useQuery<Asset[]>({
            queryKey: ['hunt', 'related', huntId],
            queryFn: async () => {
                const result = await fetch(
                    `${process.env.REACT_APP_API_ROOT}/hunt/${huntId}/assets/related`,
                );
                return result.json();
            },
        });

    const descriptionItems = useMemo(() => {
        if (!huntData) {
            return null;
        }
        return [
            {
                key: '1',
                label: 'description',
                children: huntData.description,
            },
            {
                key: '2',
                label: 'Client Id ',
                children: huntData.client_id,
            },
            {
                key: '3',
                label: 'Technology',
                children: huntData.technology.type,
            },
            {
                key: '4',
                label: 'Technology Versions',
                children: huntData.technology.versions,
            },
        ];
    }, [huntData]);

    const huntAssets = useMemo(() => {
        if (!huntData) {
            return [];
        }
        return huntData.assets.map((asset) => ({
            ...asset,
            key: asset.id,
        }));
    }, [huntData]);

    const relatedAssets = useMemo(() => {
        if (!relatedAssetData) {
            return [];
        }
        return relatedAssetData.map((asset) => ({
            ...asset,
            key: asset.id,
        }));
    }, [relatedAssetData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error...</div>;
    }

    const onAttachAsset = async (asset: Asset & { key: string }) => {
        const { hunts, key, ...rest } = asset;
        await fetch(`${process.env.REACT_APP_API_ROOT}/hunt/1/asset/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ asset: rest }),
        });
        queryClient.invalidateQueries({
            queryKey: ['hunt', 'related', huntId],
        });
        queryClient.invalidateQueries({ queryKey: ['hunt', huntId] });
        queryClient.invalidateQueries({
            queryKey: ['client', huntData?.client_id],
        });
    };

    const attachedColumns: TableProps<Omit<Asset, 'hunts'>>['columns'] = [
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
    ];

    const relatedColumns: TableProps<Asset & { key: string }>['columns'] = [
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
            title: 'action',
            key: 'action',
            render: (_, asset) => {
                return (
                    <Button type="primary" onClick={() => onAttachAsset(asset)}>
                        Attach asset
                    </Button>
                );
            },
        },
    ];

    return (
        <div>
            {descriptionItems && (
                <Descriptions
                    title="Hunt info"
                    layout="vertical"
                    items={descriptionItems}
                />
            )}
            <Divider>Assets attached to hunt</Divider>
            <Table columns={attachedColumns} dataSource={huntAssets} />
            <Divider>Assets related to hunt</Divider>
            <Table
                columns={relatedColumns}
                dataSource={relatedAssets}
                loading={isRelatedAssetsLoading}
            />
        </div>
    );
};

export default HuntSummary;
