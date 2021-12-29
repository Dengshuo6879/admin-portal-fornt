import React from 'react';
import styles from '../ModifyProfile/index.less';
import { Breadcrumb, Form, Input, Radio, Button, notification } from 'antd';
import { history, connect } from 'umi';
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

export default class ModifyProfile extends React.Component {
    formRef = React.createRef();

    state = {
        saveLoading: false
    }

    // 表单提交
    handleFormFinish = (values) => {
        this.handleOpenNotification(values);
    }

    // 保存提示
    handleOpenNotification = (values) => {
        notification.close(this.key);

        this.key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" ghost onClick={() => { notification.close(this.key); this.handleSaveStaffInfo(values) }}>
                确定
            </Button>
        );

        const { location } = this.props;
        const { state = {} } = location;
        const { staffInfo } = state;
        notification.warn({
            message: `确定${staffInfo ? '修改' : '创建'}该成员？`,
            btn,
            key: this.key,
            duration: 3.5
        });
    }

    // 保存成员信息
    handleSaveStaffInfo = async (values) => {
        const { location } = this.props;
        const { state = {} } = location;
        const { staffInfo } = state;
        this.setState({ saveLoading: true });
        const res = staffInfo ? await SaveStaffInfo(values) : await CreateStaff(values);
        this.setState({ saveLoading: false });

        history.go(-1);
    }

    componentWillUnmount() {
        notification.close(this.key);
    }

    render() {
        const { saveLoading } = this.state;
        const { location } = this.props;
        const { state = {} } = location;
        const { staffInfo } = state;
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
                ref={this.formRef}
                name='staffForm'
                colon={false}
                onFinish={this.handleFormFinish}
                validateMessages={{
                    required: '请填写必填项',
                    pattern: {
                        mismatch: '请输入正确格式的内容',
                    },
                    whitespace: ''
                }}
                initialValues={{
                    ...staffInfo,
                    staffSex: staffInfo ? staffInfo.staffSex : 'male'
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
                            validator: (_, value) => (!value || (value === this.formRef.current.getFieldValue('newPwd'))) ? Promise.resolve() : Promise.reject('两次输入的密码不同，请重新输入')
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
}