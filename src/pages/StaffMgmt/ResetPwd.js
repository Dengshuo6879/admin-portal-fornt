import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { history } from 'umi';
import LayoutBox from '@/components/LayoutBox';
import { ResetStaffPwd } from '@/services/staffServices';
import { regExp } from '@/utils/utils';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 3,
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

export default class ResetPwd extends React.Component {
    formRef = React.createRef();
    state = {
        resetPwdLoading: false
    }

    // 表单提交
    handleFormFinish = (values) => {
        this.handleOpenNotification(values);
    }

    // 删除提示
    handleOpenNotification = (values) => {
        notification.close(this.key);

        this.key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" ghost onClick={() => { notification.close(this.key); this.handleResetStaffPwd(values) }}>
                确定
            </Button>
        );

        notification.warn({
            message: `确定重置该成员密码？`,
            btn,
            key: this.key,
            duration: 3.5
        });
    }

    // 重置成员密码
    handleResetStaffPwd = async (values) => {
        this.setState({ resetPwdLoading: true });
        const res = await ResetStaffPwd(values);
        this.setState({ resetPwdLoading: false });
        history.go(-1)
    }

    componentWillUnmount() {
        notification.close(this.key);
    }

    render() {
        const { resetPwdLoading } = this.state;
        const { location } = this.props;
        const { state = {} } = location;
        const { staffInfo } = state;
        const { staffLoginName, staffRealName } = staffInfo;
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

        return <LayoutBox location={location}>
            <Form
                {...formItemLayout}
                ref={this.formRef}
                name='resetPwd'
                colon={false}
                onFinish={this.handleFormFinish}
                validateMessages={{
                    required: '请填写必填项',
                    pattern: {
                        mismatch: '请输入正确格式的内容',
                    },
                    whitespace: ''
                }}
            >

                <Form.Item
                    label="登录名"
                >
                    <div>{staffLoginName}</div>
                </Form.Item>

                <Form.Item
                    label="成员姓名"
                >
                    <div>{staffRealName}</div>
                </Form.Item>

                <Form.Item
                    name="staffPwd"
                    label="新密码"
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
                    name="staffPwd_"
                    label="再次确认新密码"
                    rules={[
                        { required: true },
                        {
                            validator: (_, value) => (!value || (value === this.formRef.current.getFieldValue('staffPwd'))) ? Promise.resolve() : Promise.reject('两次输入的密码不同，请重新输入')
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

                <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
                    <Button type="primary" htmlType="submit" loading={resetPwdLoading}>确定</Button>
                </Form.Item>
            </Form>
        </LayoutBox>
    }
}