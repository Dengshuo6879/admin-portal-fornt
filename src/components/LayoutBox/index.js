import React from 'react';
import styles from './index.less';
import BreadCrumb from '@/components/BreadCrumb';
import { getBreadcrumb } from '@/utils/utils';

export default class LayoutBox extends React.Component {

    render() {
        const { children, location = {}, ...props } = this.props;
        const { pathname } = location;
        const { breadcrumbList } = getBreadcrumb() || {};

        return <div className={styles.layoutBox} {...props}>
            <BreadCrumb className={styles.breadcrumb} pathname={pathname} breadcrumbList={breadcrumbList} />

            {children}
        </div>
    }
}