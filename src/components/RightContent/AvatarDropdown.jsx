import React, { useCallback } from 'react';
import { LogoutOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { Logout } from '@/services/staffServices';

/**
 * 退出登录
 */
const loginOut = async () => {
  await Logout();
  localStorage.removeItem('localStaffInfo')
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== '/user/login/' && !redirect) {
    history.replace({
      pathname: '/user/login/'
    });
  }
};

const AvatarDropdown = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentStaff: undefined }));
        loginOut(initialState?.currentStaff?.staffUUID);
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentStaff } = initialState;

  if (!currentStaff || !currentStaff.staffRealName) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        修改资料
      </Menu.Item>

      <Menu.Item key="settings">
        <KeyOutlined />
        修改密码
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentStaff.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentStaff.staffRealName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
