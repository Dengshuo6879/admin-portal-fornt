import React from 'react';
import { Form, Input, Button, Tree, notification } from 'antd';
import LayoutBox from '@/components/LayoutBox';
import { formRules, getTreeData } from '@/utils/utils';
import { SearchRoleRelatedMenuUUIDList, SaveRoleInfo } from '@/services/roleServices';
import { SearchMenuInfoList } from '@/services/menuServices';

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

export default class RoleEidt extends React.Component {
    formRef = React.createRef();
    state = {
        menuInfoList: [],
        menuUUIDList: []
    }

    componentDidMount() {
        this.handleSearchMenuInfoList();
        this.handleSearchRoleRelatedMenuUUIDList();
    }

    // 搜索菜单信息列表
    handleSearchMenuInfoList = async () => {
        const res = await SearchMenuInfoList();
        // const { menuInfoList = [] } = res;

        ////////////////////////////////////////////////
        const menuInfoList = [
            {
                "menuUUID": "c71c88d8-9066-4408-9135-a714c284335d",
                "parentMenuUUID": "",
                "menuName": "我的数据集",
                "menuCode": "dataset",
                "menuUrl": "http://40.23.44.34:8000/dataset/",
                "menuOrder": "001",
                "createdTime": "2021-1-11 17: 20: 00.005000",
                "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
            },
            {
                "menuUUID": "c71c88d8-9066-4408-9135-a714c2843354",
                "parentMenuUUID": "",
                "menuName": "我的模型",
                "menuCode": "model",
                "menuUrl": "http://40.23.44.34:8000/dataset/",
                "menuOrder": "001",
                "createdTime": "2021-1-11 17: 20: 00.005000",
                "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
            },
            {
                "menuUUID": "c71c88d8-9066-4408-9135-a714c2843355",
                "parentMenuUUID": "c71c88d8-9066-4408-9135-a714c2843354",
                "menuName": "我的模型-子页面1",
                "menuCode": "model",
                "menuUrl": "http://40.23.44.34:8000/dataset/",
                "menuOrder": "001",
                "createdTime": "2021-1-11 17: 20: 00.005000",
                "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
            },
            {
                "menuUUID": "c71c88d8-9066-4408-9135-a714c2843365",
                "parentMenuUUID": "c71c88d8-9066-4408-9135-a714c2843354",
                "menuName": "我的模型-子页面2",
                "menuCode": "model",
                "menuUrl": "http://40.23.44.34:8000/dataset/",
                "menuOrder": "002",
                "createdTime": "2021-1-11 17: 20: 00.005000",
                "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
            }
        ]
        ////////////////////////////////////////////////

        const treeMenuInfoList = getTreeData(menuInfoList);
        this.setState({ menuInfoList: treeMenuInfoList });
    }

    // 搜索角色关联的菜单UUID列表
    handleSearchRoleRelatedMenuUUIDList = async () => {
        const { location } = this.props;
        const { state = {} } = location;
        const { roleInfo = {} } = state;
        const { roleUUID } = roleInfo;
        if (!roleUUID) return

        const res = await SearchRoleRelatedMenuUUIDList({ roleUUID });
        // const { menuUUIDList } = res;
        /////////////////////////////////
        const menuUUIDList = ["c71c88d8-9066-4408-9135-a714c284335d", "c71c88d8-9066-4408-9135-a714c2843355"];
        /////////////////////////////////

        this.handleMenuCheck(menuUUIDList);
    }


    // 菜单选择
    handleMenuCheck = (checkedKeysValue) => {
        this.setState({ menuUUIDList: checkedKeysValue });
    };


    // 表单提交
    handleFormFinish = (values) => {
        this.handleOpenNotification(values);
    }



    // 删除提示
    handleOpenNotification = (values) => {
        notification.close(this.key);

        this.key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" ghost onClick={() => { notification.close(this.key); this.handleSaveRoleInfo(values) }}>
                确定
            </Button>
        );

        const { location } = this.props;
        const { state = {} } = location;
        const { roleInfo } = state;
        notification.warn({
            message: `确定${roleInfo ? '修改' : '创建'}该角色？`,
            btn,
            key: this.key,
            duration: 3.5
        });
    }

    // 保存角色信息
    handleSaveRoleInfo = async (values) => {
        const { location } = this.props;
        const { state = {} } = location;
        const { roleInfo = {} } = state;
        const { roleUUID } = roleInfo;
        const { menuUUIDList } = this.state;
        console.log('value===', values)
        const res = await SaveRoleInfo({
            ...values,
            roleUUID,
            menuUUIDList: menuUUIDList
        });
    }

    componentWillUnmount() {
        notification.close(this.key);
    }


    render() {
        const { location } = this.props;
        const { state = {} } = location;
        const { roleInfo = {} } = state;
        const { menuInfoList, menuUUIDList } = this.state;

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
                initialValues={{
                    ...roleInfo
                }}
            >

                <Form.Item
                    name="roleName"
                    label="角色名称"
                    rules={formRules({ required: true, max: 512, regExpType: 'CEN' })}
                >
                    <Input placeholder={'请输入登录名（中文、英文字母或数字）'} autoComplete={'off'} maxLength={512} />
                </Form.Item>

                <Form.Item
                    name="roleCode"
                    label="角色助记码"
                    rules={formRules({ required: true, max: 512, regExpType: 'CEN' })}
                >
                    <Input placeholder={'请输入登录名（中文、英文字母或数字）'} autoComplete={'off'} maxLength={512} />
                </Form.Item>

                <Form.Item
                    name="roleDesc"
                    label="角色描述"
                    rules={formRules({ required: true, max: 512, regExpType: 'CEN' })}
                >
                    <Input placeholder={'请输入登录名（中文、英文字母或数字）'} autoComplete={'off'} maxLength={512} />
                </Form.Item>

                <Form.Item
                    name="menuUUIDList"
                    label="资源树"
                >

                    <Tree
                        checkable
                        showLine={{ showLeafIcon: false }}
                        autoExpandParent={true}
                        onCheck={this.handleMenuCheck}
                        checkedKeys={menuUUIDList}
                        treeData={menuInfoList}
                    />
                </Form.Item>


                <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
                    <Button type="primary" htmlType="submit" loading={false}>确定</Button>
                </Form.Item>
            </Form>
        </LayoutBox>
    }
}