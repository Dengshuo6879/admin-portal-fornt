import React from 'react';
import { Form, Input, Radio, Button, notification } from 'antd';
import LayoutBox from '@/components/LayoutBox';
import { CreateStaff, SaveStaffInfo } from '@/services/staffServices';
import { formRules, regExp } from '@/utils/utils';

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

export default class StaffEdit extends React.Component {
    formRef = React.createRef();

    state = {
        saveLoading: false
    }

    handleFormFinish = (values) => {
        this.handleOpenNotification(values);
    }

    // 删除提示
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
            <Form
                {...formItemLayout}
                ref={this.formRef}
                name='addDataSet'
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
                    name="staffLoginName"
                    label="登录名"
                    rules={formRules({ required: true, max: 512, regExpType: 'CEN' })}
                >
                    <Input placeholder={'请输入登录名（中文、英文字母或数字）'} autoComplete={'off'} maxLength={512} />
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

                {!staffInfo && <>
                    <Form.Item
                        name="staffPwd"
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
                        name="staffPwd_"
                        label="确认密码"
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
                </>}

                <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
                    <Button type="primary" htmlType="submit" loading={saveLoading}>确定</Button>
                </Form.Item>
            </Form>
        </LayoutBox>
    }
}