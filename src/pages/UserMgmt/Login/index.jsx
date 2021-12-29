import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import { GetLoginAuthCode, LoginWithAuthCode } from '@/services/staffServices';
import config from '@/../public/config';

import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchStaffInfo = async () => {
    const userInfo = await initialState?.fetchStaffInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentStaff: userInfo }));
    }
  };



  const handleSubmit = async (values) => {
    try {
      // 获取登录授权码
      const authCodeRes = await GetLoginAuthCode({ ...values });
      const { loginAuthCode } = authCodeRes;

      // 使用登录授权码登录
      const loginRes = await LoginWithAuthCode({ loginAuthCode });
      const { accessToken = 'accessToken', staffInfo = { staffUUID: '我是staffUUID' } } = loginRes;


      if (accessToken) {
        message.success('登录成功！');
        const lcoalStaffInfo = {
          accessToken,
          staffUUID: staffInfo.staffUUID
        }
        localStorage.setItem('localStaffInfo', JSON.stringify(lcoalStaffInfo));

        await fetchStaffInfo();
        setUserLoginState({ status: 'ok' });

        history.push('/');
      } else {
        setUserLoginState({ status: 'error' });
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  const { status } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.png" />}
          title={config.title}
          subTitle={<></>}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Tabs activeKey={'account'}>
            <Tabs.TabPane
              key="account"
              tab={'帐户密码登录'}
            />
          </Tabs>

          {status === 'error' && (
            <LoginMessage
              content={'帐户或密码错误'}
            />
          )}

          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
          </>

          <div style={{ height: 10 }}>
            {/* <ProFormCheckbox noStyle name="autoLogin">自动登录</ProFormCheckbox> */}
            {/* <a style={{ float: 'right' }}>忘记密码</a> */}
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
