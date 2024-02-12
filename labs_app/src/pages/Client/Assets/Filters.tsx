import React, { FC, useState } from 'react';
import { Space, Input, Select, Button, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { Filter } from '../types';
import styles from './Filters.styles';

const useStyles = createUseStyles(styles);

const { Text } = Typography;

interface Props {
    onFiltersApply: (qs: string) => void;
}

const Filters: FC<Props> = ({ onFiltersApply }) => {
    const classes = useStyles();
    const [filterValues, setFilterValues] = useState<Record<string, string>>(
        {},
    );

    const { data: filtersData } = useQuery<Filter[]>({
        queryKey: ['config', 'filters'],
        queryFn: async () => {
            const result = await fetch(
                `${process.env.REACT_APP_API_ROOT}/config/filters`,
            );
            return result.json();
        },
    });

    const renderFilter = (filter: Filter) => {
        switch (filter.type) {
            case 'dropdown':
                return (
                    <Select
                        key={filter.name}
                        placeholder={filter.name}
                        value={filterValues[filter.name]}
                        style={{ width: 250 }}
                        options={filter.options?.map((option) => ({
                            value: option,
                            label: option,
                        }))}
                        onChange={(value) => {
                            onFiltersChange(filter.name, value);
                        }}
                    />
                );
            case 'text':
                return (
                    <Input
                        key={filter.name}
                        value={filterValues[filter.name]}
                        placeholder={filter.name}
                        style={{ width: 250 }}
                        onChange={(e) => {
                            onFiltersChange(filter.name, e.target.value);
                        }}
                    />
                );
            default:
                return null;
        }
    };

    const onFiltersChange = (key: string, value: string) => {
        setFilterValues({
            ...filterValues,
            [key]: value,
        });
    };

    const resetFilters = () => {
        setFilterValues({});
    };

    const submitFilters = () => {
        onFiltersApply(new URLSearchParams(filterValues).toString());
    };

    return (
        <Space className={cx(classes.container)}>
            <Text>filters: </Text>
            {filtersData?.map((filter) => renderFilter(filter))}
            <Button onClick={submitFilters}>Apply filter</Button>
            <Button onClick={resetFilters}>Reset filter</Button>
        </Space>
    );
};

export default Filters;
