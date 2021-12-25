import { Breadcrumb } from 'antd';
import styles from './index.less';
import { history } from 'umi';

const BreadCrumb = props => {
    const { breadcrumbList = [], pathname } = props;
    let i = 0;
    breadcrumbList.map((v, index) => {
        if (v.path === pathname) i = index;
    })

    const newBreadcrumbList = breadcrumbList.slice(0, i + 1);


    const handleBreadcrumbItemClick = (breadcrumbInfo, index) => {
        const { path, params } = breadcrumbInfo
        history.push(path, params);
    }

    return newBreadcrumbList.length > 1 && <Breadcrumb className={styles.breadcrumb}>
        {newBreadcrumbList.map((breadcrumbInfo, index) => (

            index === newBreadcrumbList.length - 1 ?
                <Breadcrumb.Item key={index}>
                    {breadcrumbInfo.breadcrumbName}
                </Breadcrumb.Item>
                :
                <Breadcrumb.Item key={index} onClick={() => handleBreadcrumbItemClick(breadcrumbInfo, index)}>
                    <a>{breadcrumbInfo.breadcrumbName}</a>
                </Breadcrumb.Item>
        ))}
    </Breadcrumb>
}

export default BreadCrumb;