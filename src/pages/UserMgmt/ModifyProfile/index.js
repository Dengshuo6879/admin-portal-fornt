import React, { useState } from 'react';
import styles from './index.less';
import { Breadcrumb, Form, Input, Radio, Button, notification, message } from 'antd';
import { history, useModel } from 'umi';
import { HomeOutlined } from '@ant-design/icons';
import LayoutBox from '@/components/LayoutBox';
import { CreateStaff, SaveStaffInfo } from '@/services/staffServices';
import { formRules, regExp } from '@/utils/utils';

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

const ModifyProfile = props => {
    const { initialState } = useModel('@@initialState');
    const staffInfo = initialState?.currentStaff || {};
    const { staffLoginName, staffUUID } = staffInfo;

    let key = null;
    const [saveLoading, setSaveLoading] = useState(false);

    // 表单提交
    const handleFormFinish = (values) => {
        handleOpenNotification(values);
    }

    // 保存提示
    const handleOpenNotification = (values) => {
        notification.close(key);

        key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" ghost onClick={() => { notification.close(key); handleSaveStaffInfo(values) }}>
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
    const handleSaveStaffInfo = async (values) => {
        setSaveLoading(true);
        const res = await SaveStaffInfo({
            ...values,
            staffLoginName,
            staffUUID
        });
        setSaveLoading(false);

        if (res.errorMessage === 0) {
            message.success('资料修改成功');
            setTimeout(() => {
                history.push('/');
            }, 1000);
        } else {
            message.error('资料修改失败');
        }
    }

    return <LayoutBox location={location}>
        <Breadcrumb className={styles.breadcrumbClass}>
            <Breadcrumb.Item onClick={() => history.go('-1')}>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>修改资料</Breadcrumb.Item>
        </Breadcrumb>

        <Form
            {...formItemLayout}
            name='staffForm'
            colon={false}
            onFinish={handleFormFinish}
            validateMessages={{
                required: '请填写必填项',
                pattern: {
                    mismatch: '请输入正确格式的内容',
                },
                whitespace: ''
            }}
            initialValues={{
                ...staffInfo
            }}
        >

            <Form.Item
                label="登录名"
            >
                {staffLoginName}
            </Form.Item>

            <Form.Item
                name="staffRealName"
                label="成员姓名"
                rules={formRules({ required: true, max: 512, regExpType: 'CEN' })}
            >
                <Input placeholder={'请输入成员姓名（中文、英文字母或数字）'} autoComplete={'off'} maxLength={512} />
            </Form.Item>

            <Form.Item
                name="staffMobile"
                label="手机"
                rules={formRules({ required: true })}
            >
                <Input placeholder={'请输入手机号码'} autoComplete={'off'} maxLength={11} />
            </Form.Item>

            <Form.Item
                name="staffTel"
                label="电话"
                rules={formRules({ required: false })}
            >
                <Input placeholder={'请输入电话号码'} autoComplete={'off'} maxLength={15} />
            </Form.Item>

            <Form.Item
                label="Email"
                name="staffEmail"
                rules={[{ required: false }, { type: 'email', message: '请输入正确格式的Email' }]}
            >
                <Input autoComplete={'off'} placeholder={'请输入Email地址'} />
            </Form.Item>

            <Form.Item label="性别" name="staffSex">
                <Radio.Group>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="所属角色">
                <div>角色1</div>
            </Form.Item>


            <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
                <Button type="primary" htmlType="submit" loading={saveLoading}>确定</Button>
            </Form.Item>
        </Form>
    </LayoutBox>
}

export default ModifyProfile