import React, { useMemo } from 'react';
import { Collapse } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { HuntListItem } from '../types';
import HuntSummary from './HuntSummary';

const Hunts = () => {
    const params = useParams();
    const clientId = params.clientId;
    const {
        data: huntListData,
        isLoading,
        isError,
    } = useQuery<HuntListItem[]>({
        queryKey: ['hunt', 'list', clientId],
        queryFn: async () => {
            const result = await fetch(
                `${process.env.REACT_APP_API_ROOT}/hunt/list/${clientId}`,
            );
            return result.json();
        },
    });

    const rows = useMemo(() => {
        if (!huntListData?.length) {
            return [];
        }
        return huntListData.map((hunt) => ({
            key: hunt.id,
            label: hunt.vulnerability_code,
            children: <HuntSummary huntId={hunt.id} />,
        }));
    }, [huntListData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading hunt list</div>;
    }

    return (
        <div>
            <Collapse items={rows} />
        </div>
    );
};

export default Hunts;
