import React from 'react';
import styles from './index.less';
import { Spin } from 'antd';
import { connect } from 'dva';
import BreadCrumb from '@/components/BreadCrumb';
import { getBreadcrumb } from '@/utils/utils';

@connect(({ global }) => ({
    globalLoading: global.globalLoading
}))
export default class LayoutBox extends React.Component {

    render() {
        const { dispatch, globalLoading, children, location = {}, ...props } = this.props;

        const { pathname } = location;
        const { breadcrumbList } = getBreadcrumb() || {};

        return <Spin size="large" spinning={globalLoading}>
            <div className={styles.layoutBox} {...props}>
                <BreadCrumb className={styles.breadcrumb} pathname={pathname} breadcrumbList={breadcrumbList} />

                {children}
            </div>
        </Spin>
    }
}