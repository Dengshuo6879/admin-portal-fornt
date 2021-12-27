import React from 'react';
import styles from './index.less';
import { Tree, Radio, Form, Input, Button, Space, notification } from 'antd';
import LayoutBox from '@/components/LayoutBox';
import { SaveMenuInfo, SearchMenuInfoList, DeleteMenu } from '@/services/menuServices';
import { formRules, getTreeData } from '@/utils/utils';

const { DirectoryTree } = Tree;
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
            span: 19,
        },
    },
};

export default class MenuMgmt extends React.Component {
    formRef = React.createRef();
    state = {
        menuInfoList: [],
        currentMenuInfo: {},
        canEdit: false,
        currentStatus: ''   // add_parent_menu 新增父资源  add_child_menu 新增子资源 edit_menu 编辑资源
    }

    componentDidMount() {
        this.handleSearchMenuInfoList();
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
                "parentMenuUUID": "c71c88d8-9066-4408-9135-a714c2843355",
                "menuName": "我的模型-子页面2",
                "menuCode": "model",
                "menuUrl": "http://40.23.44.34:8000/dataset/",
                "menuOrder": "002",
                "createdTime": "2021-1-11 17: 20: 00.005000",
                "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
            }
        ]
        ////////////////////////////////////////////////

        const treeMenuInfoList = getTreeData(menuInfoList)
        this.setState({ menuInfoList: treeMenuInfoList, currentMenuInfo: treeMenuInfoList[0] || {} }, () => {
            this.formRef.current.resetFields();
        })
    }

    // 保存菜单
    handleSaveMenuInfo = async (values) => {
        const { currentMenuInfo } = this.state;
        const statusVal = Object.keys(currentMenuInfo).length;
        let menuUUID = undefined, parentMenuUUID = undefined;

        switch (statusVal) {
            case 0:  // 新增父资源
                menuUUID = undefined;
                parentMenuUUID = undefined
                break;
            case 1:  // 新增子资源
                menuUUID = undefined;
                parentMenuUUID = currentMenuInfo.menuUUID
                break;
            default:   // 编辑
                menuUUID = currentMenuInfo.menuUUID;
                parentMenuUUID = currentMenuInfo.parentMenuUUID
                break;
        }

        const res = await SaveMenuInfo({
            ...values,
            menuUUID,
            parentMenuUUID
        });
    }

    // 删除菜单
    handleDeleteMenu = async () => {
        const { currentMenuInfo } = this.state;
        const { menuUUID } = currentMenuInfo;
        const res = await DeleteMenu({ menuUUID });
    }

    // 删除提示
    handleOpenNotification = () => {
        notification.close(this.key);

        this.key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" ghost onClick={() => { notification.close(this.key); this.handleDeleteMenu() }}>
                确定
            </Button>
        );

        notification.warn({
            message: `确定删除该资源？`,
            btn,
            key: this.key,
            duration: 3.5
        });
    }


    // 表单提交
    handleFormFinish = (values) => {
        this.handleSaveMenuInfo(values);
    }

    // 菜单选择
    handleMenuSelect = (keys, info) => {
        this.setState({ currentMenuInfo: info.selectedNodes[0], canEdit: false }, () => {
            this.formRef.current.resetFields();
        })
    };

    // 新增菜单
    handleAddMenu = (type) => {
        const { currentMenuInfo } = this.state;
        let _currentMenuInfo = {};
        if (type === 'parent_menu') {
            _currentMenuInfo = {};
        } else {
            _currentMenuInfo = { menuUUID: currentMenuInfo.menuUUID }  // 留下一个menuUUID，用作父菜单UUID
        }

        this.setState({
            currentMenuInfo: _currentMenuInfo,
            canEdit: true
        }, () => {
            this.formRef.current.resetFields();
        })
    }

    componentWillUnmount() {
        notification.close(this.key);
    }



    render() {
        const { menuInfoList, currentMenuInfo, canEdit } = this.state;
        const { menuName, menuCode, menuUrl, menuOrder, menuUUID } = currentMenuInfo;

        return <LayoutBox>
            <div className={styles.menuTopBar}>
                <Radio.Group>
                    <Radio.Button onClick={() => this.handleAddMenu('parent_menu')}>新增父资源</Radio.Button>
                    <Radio.Button disabled={Object.keys(currentMenuInfo).length === 0} onClick={this.handleAddMenu}>新增子资源</Radio.Button>
                    <Radio.Button disabled={[0, 1].includes(Object.keys(currentMenuInfo).length)} onClick={() => this.setState({ canEdit: true })}>编辑此资源</Radio.Button>
                    <Radio.Button disabled={[0, 1].includes(Object.keys(currentMenuInfo).length)} onClick={this.handleOpenNotification}>删除此资源</Radio.Button>
                </Radio.Group>
            </div>

            <div className={styles.menuBox}>
                <div className={styles.menuPageLeft}>
                    <div className={styles.title}>菜单结构树</div>
                    <DirectoryTree
                        selectedKeys={[menuUUID]}
                        autoExpandParent={true}
                        onSelect={this.handleMenuSelect}
                        treeData={menuInfoList}
                    />
                </div>
                <div className={styles.menuPageRight}>
                    <div className={styles.title}>菜单详情</div>
                    <div className={styles.formBox}>
                        <Form
                            {...formItemLayout}
                            ref={this.formRef}
                            name='menuForm'
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
                                menuName, menuCode, menuUrl, menuOrder
                            }}
                        >
                            <Form.Item
                                name="menuName"
                                label="名称"
                                rules={formRules({ required: true, max: 512, regExpType: 'CEN' })}
                            >
                                <Input placeholder={'请输入菜单名称（中文、英文字母或数字）'} autoComplete={'off'} maxLength={512} disabled={!canEdit} />
                            </Form.Item>

                            <Form.Item
                                name="menuCode"
                                label="编码"
                                rules={formRules({ required: true, max: 512, regExpType: 'CEN' })}
                            >
                                <Input placeholder={'请输入菜单编码（中文、英文字母或数字）'} autoComplete={'off'} maxLength={512} disabled={!canEdit} />
                            </Form.Item>

                            <Form.Item
                                name="menuUrl"
                                label="地址"
                                rules={formRules({ required: false, max: 512 })}
                            >
                                <Input placeholder={'请输入菜单地址'} autoComplete={'off'} maxLength={512} disabled={!canEdit} />
                            </Form.Item>

                            <Form.Item
                                name="menuOrder"
                                label="排序"
                                rules={formRules({ required: true, max: 512, regExpType: 'CEN' })}
                            >
                                <Input placeholder={'请输入菜单排序'} autoComplete={'off'} maxLength={512} disabled={!canEdit} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
                                <Space size={'large'}>
                                    <Button type="primary" htmlType="submit" loading={false} disabled={!canEdit}>确定</Button>
                                    <Button disabled={!canEdit}>取消</Button>
                                </Space>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div>
        </LayoutBox>
    }
}