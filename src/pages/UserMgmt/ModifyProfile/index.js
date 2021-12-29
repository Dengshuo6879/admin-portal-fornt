import React from 'react';
import styles from './index.less';
import { Breadcrumb, Form, Input, Radio, Button, notification } from 'antd';
import { history } from 'umi';
import { connect } from 'dva';
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

@connect(({ global }) => ({
    currentUser: global.currentUser
}))
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

        console.log('this/===', this.props.currentUser)
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
                <Breadcrumb.Item>修改资料</Breadcrumb.Item>
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

                <Form.Item label="所属角色">
                    <div>角色1</div>
                </Form.Item>


                <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" htmlType="submit" loading={saveLoading}>确定</Button>
                </Form.Item>
            </Form>
        </LayoutBox>
    }
}