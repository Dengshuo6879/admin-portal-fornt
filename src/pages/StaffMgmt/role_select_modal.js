import React from 'react';
import { Modal, message } from 'antd';
import SearchBar from '@/components/SearchBar';
import CustomTable from '@/components/CustomTable';
import { SearchRoleInfoList } from '@/services/roleServices';


export default class RoleSelectModal extends React.Component {
    state = {
        searchParams: {
            roleCode: '',
            roleName: ''
        },
        pageParams: { from: 0, size: 10 },
        roleInfoList: [],
        roleInfoListTotalCount: 0,
    }
    selectedRole = []

    componentDidMount() {
        this.handleSearchRoleInfoList();
    }
    // 搜索角色信息列表
    handleSearchRoleInfoList = (sec = 0.5) => {
        const { searchParams, pageParams } = this.state;

        setTimeout(async () => {
            const res = await SearchRoleInfoList({ ...searchParams, ...pageParams });
            // const { roleInfoList, totalCount } = res;
            ////////////////////////////////////
            const roleInfoList = [
                {
                    "roleUUID": "c71c88d8-9066-4408-9135-a714c284335d",
                    "roleName": "系统管理员",
                    "roleCode": "systemAdmin",
                    "roleDesc": "管系统的",
                    "createdTime": "2021-1-11 17: 20: 00.005000",
                    "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
                },
                {
                    "roleUUID": "c71c88d8-9066-4408-9135-a714c2843353",
                    "roleName": "运营管理员",
                    "roleCode": "systemAdmin",
                    "roleDesc": "管运营的",
                    "createdTime": "2021-1-11 17: 20: 00.005000",
                    "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
                }
            ];
            const totalCount = 2;
            ////////////////////////////////////

            this.setState({ roleInfoList, roleInfoListTotalCount: totalCount });

        }, sec * 1000);
    }


    // 搜索
    handleSearch = (searchParams) => {
        const { pageParams } = this.state;
        this.setState({ searchParams, pageParams: { ...pageParams, from: 0 } }, () => {
            this.handleSearchRoleInfoList();
        })
    }

    // table分页
    handleTablePageChange = (pageParams) => {
        this.setState({ pageParams }, () => {
            this.handleSearchRoleInfoList();
        });
    }

    handleOk = () => {
        if (this.selectedRole.length === 0) {
            message.info('请选择角色');
            return
        }
        const roleUUIDList = [];
        this.selectedRole.map(roleInfo => {
            roleUUIDList.push(roleInfo.roleUUID);
        })
        this.props.onOk(roleUUIDList);
    }


    render() {
        const { onCancel } = this.props;
        const { searchParams, pageParams, roleInfoList, roleInfoListTotalCount } = this.state;
        const { roleCode, roleName } = searchParams;

        const searchBarFields = {
            roleCode: {
                placeholder: '角色助记码',
                type: 'input',
                value: roleCode,
                width: '150px',
            },
            roleName: {
                placeholder: '角色名称',
                type: 'input',
                value: roleName,
                width: '150px',
            },
        };


        const columns = [
            {
                title: '角色助记码',
                dataIndex: 'roleCode',
                width: 200
            },
            {
                title: '角色名称',
                dataIndex: 'roleName',
                width: 200,
            },
            {
                title: '角色描述',
                dataIndex: 'roleDesc'
            }
        ]

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.selectedRole = selectedRows;
            },
        };


        return <Modal
            title="分配角色"
            width={900}
            visible={true}
            onCancel={onCancel}
            onOk={this.handleOk}
        >
            <SearchBar searchBarFields={searchBarFields} onSearch={this.handleSearch} />


            <CustomTable
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={roleInfoList}
                total={roleInfoListTotalCount}
                pageParams={pageParams}
                onChange={this.handleTablePageChange}
            />
        </Modal>
    }
}