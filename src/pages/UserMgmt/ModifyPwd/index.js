import React, { useState } from 'react';
import styles from '../ModifyProfile/index.less';
import { Breadcrumb, Form, Input, Button, notification, message } from 'antd';
import { history, useModel } from 'umi';
import { HomeOutlined } from '@ant-design/icons';
import LayoutBox from '@/components/LayoutBox';
import { ModifyPwdWithOldPwd } from '@/services/staffServices';
import { regExp } from '@/utils/utils';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 7,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
    },
};

const ModifyPwd = props => {
    const [form] = Form.useForm();

    const { initialState } = useModel('@@initialState');
    const staffInfo = initialState?.currentStaff || {};

    let key = null;
    const [saveLoading, setSaveLoading] = useState(false);

    // 表单提交
    const handleFormFinish = (values) => {
        delete values.newPwd_
        handleOpenNotification(values);
    }

    // 保存提示
    const handleOpenNotification = (values) => {
        notification.close(key);

        key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" ghost onClick={() => { notification.close(key); handleModifyPwdWithOldPwd(values) }}>
                确定
            </Button>
        );

        notification.warn({
            message: `确定修改资料？`,
            btn,
            key,
            duration: 3.5
        });
    }

    // 保存成员信息
    const handleModifyPwdWithOldPwd = async (values) => {
        setSaveLoading(true);
        const res = await ModifyPwdWithOldPwd({
            ...values,
            staffUUID: staffInfo.staffUUID
        });
        setSaveLoading(false);

        if (res.errorMessage === 0) {
            message.success('密码修改成功');
            setTimeout(() => {
                history.go(-1);
            }, 1000);
        } else {
            message.error('密码修改失败');
        }
    }

    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

    return <LayoutBox location={location}>
        <Breadcrumb className={styles.breadcrumbClass}>
            <Breadcrumb.Item onClick={() => history.go('-1')}>
                <HomeOutlined style={{ fontSize: 18 }} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>修改密码</Breadcrumb.Item>
        </Breadcrumb>

        <Form
            {...formItemLayout}
            name='staffForm'
            form={form}
            colon={false}
            onFinish={handleFormFinish}
            validateMessages={{
                required: '请填写必填项',
                pattern: {
                    mismatch: '请输入正确格式的内容',
                },
                whitespace: ''
            }}
        >
            <Form.Item
                name="oldPwd"
                label="旧密码"
                rules={[
                    { required: true },
                    { validator: (_, value) => (!value || ((value.length >= 6) && (reg.test(value)))) ? Promise.resolve() : Promise.reject('请输入6-20位，包含英文大小写字母和阿拉伯数字的密码') }
                ]}
                getValueFromEvent={
                    (e) => {
                        return regExp(e.target.value, 'EN', 20)
                    }
                }
            >
                <Input placeholder={'请输入6-20位，包含英文大小写字母和阿拉伯数字的密码'} autoComplete={'off'} maxLength={20} type={'password'} />
            </Form.Item>

            <Form.Item
                name="newPwd"
                label="密码"
                rules={[
                    { required: true },
                    { validator: (_, value) => (!value || ((value.length >= 6) && (reg.test(value)))) ? Promise.resolve() : Promise.reject('请输入6-20位，包含英文大小写字母和阿拉伯数字的密码') }
                ]}
                getValueFromEvent={
                    (e) => {
                        return regExp(e.target.value, 'EN', 20)
                    }
                }
            >
                <Input placeholder={'请输入6-20位，包含英文大小写字母和阿拉伯数字的密码'} autoComplete={'off'} maxLength={20} type={'password'} />
            </Form.Item>

            <Form.Item
                name="newPwd_"
                label="再次确认新密码"
                rules={[
                    { required: true },
                    {
                        validator: (_, value) => (!value || (value === form.getFieldValue('newPwd'))) ? Promise.resolve() : Promise.reject('两次输入的密码不同，请重新输入')
                    },
                ]}
                getValueFromEvent={
                    (e) => {
                        return regExp(e.target.value, 'EN', 20)
                    }
                }
            >
                <Input placeholder={'请输入6-20位，包含英文大小写字母和阿拉伯数字的密码'} autoComplete={'off'} maxLength={20} type={'password'} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
                <Button type="primary" htmlType="submit" loading={saveLoading}>确定</Button>
            </Form.Item>
        </Form>
    </LayoutBox>
}

export default ModifyPwd