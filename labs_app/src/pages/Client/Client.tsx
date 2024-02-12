import React from 'react';
import { Tabs } from 'antd';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import Assets from './Assets/Assets';
import styles from './Client.styles';
import Hunts from './Hunts/Hunts';

const useStyles = createUseStyles(styles);

const Client = () => {
    const classes = useStyles();

    const tabs = [
        {
            label: 'Assets',
            key: 'assets',
            children: <Assets />,
        },
        {
            label: 'Hunts',
            key: 'hunts',
            children: <Hunts />,
        },
    ];

    return (
        <div className={cx(classes.container)}>
            <Tabs defaultActiveKey="assets" items={tabs} />
        </div>
    );
};

export default Client;
