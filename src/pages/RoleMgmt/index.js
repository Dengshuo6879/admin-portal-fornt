import React from 'react';
import { message, Radio, Space, notification, Button } from 'antd';
import { history } from 'umi';
import { connect } from 'dva';
import LayoutBox from '@/components/LayoutBox';
import SearchBar from '@/components/SearchBar';
import CustomPopconfirm from '@/components/CustomPopconfirm';
import CustomTable from '@/components/CustomTable';
import RoleRelatedStaffModal from './role_related_staff_modal';
import { SearchRoleInfoList, DeleteRole } from '@/services/roleServices';

@connect(({ global }) => ({
  globalLoading: global.globalLoading
}))
export default class RoleMgmt extends React.Component {
  state = {
    searchParams: {
      roleName: '',
    },
    pageParams: { from: 0, size: 10 },
    roleInfoList: [],
    roleInfoListTotalCount: 0,
    currentRoleInfo: null
  };
  selectedRole = []

  componentDidMount() {
    this.handleSearchRoleInfoList();
  }

  // 搜索角色信息列表
  handleSearchRoleInfoList = (sec = 0.5) => {
    this.props.dispatch({ type: 'global/setGlobalLoading', payload: true });
    setTimeout(async () => {
      const { searchParams, pageParams } = this.state;
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
      this.props.dispatch({ type: 'global/setGlobalLoading', payload: false });
    }, sec * 1000);
  }


  // 跳转角色新增、编辑页面
  handleToRoleEdit = (roleInfo) => {
    const locationInfo = {
      path: '/systemMgmt/roleMgmt/edit/',
      breadcrumbName: `${roleInfo ? '修改' : '创建'}角色`,
    }
    this.handlePageParams(locationInfo);
    history.push(locationInfo.path, { roleInfo });
  }

  // 页面跳转参数存储
  handlePageParams = (locationInfo) => {
    // 保存页面搜索数据
    const { searchParams, pageParams } = this.state;
    const breadcrumbInfo = {
      breadcrumbList: [
        {
          path: '/systemMgmt/roleMgmt/',
          breadcrumbName: '角色管理',
          params: {
            searchParams,
            pageParams
          }
        },
        locationInfo
      ]
    }
    sessionStorage.setItem('breadcrumbInfo', JSON.stringify(breadcrumbInfo));
  }

  // 删除角色
  handleDeleteRole = async (roleUUIDList) => {
    const res = await DeleteRole({ roleUUIDList })
  }

  // 处理批量删除
  handleBatchDeleteRole = () => {
    if (this.selectedRole.length === 0) {
      message.info('请选择角色');
      return
    }

    const roleUUIDList = [];
    this.selectedRole.map(roleInfo => {
      roleUUIDList.push(roleInfo.roleUUID);
    })
    this.handleOpenNotification(roleUUIDList);
  }

  // 批量删除提示
  handleOpenNotification = (roleUUIDList) => {
    notification.close(this.key);

    this.key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" ghost onClick={() => { notification.close(this.key); this.handleDeleteRole(roleUUIDList) }}>
        确定
      </Button>
    );

    notification.warn({
      message: `确定删除选择的角色？`,
      btn,
      key: this.key,
      duration: 3.5
    });
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


  // 设置当前操作角色
  handleSetCurrentRoleInfo = (roleInfo) => {
    this.setState({ currentRoleInfo: roleInfo });
  }

  componentWillUnmount() {
    notification.close(this.key);
  }

  render() {
    const { searchParams, pageParams, roleInfoList, roleInfoListTotalCount, currentRoleInfo } = this.state;
    const { roleName } = searchParams;

    const searchBarFields = {
      roleName: {
        placeholder: '角色名称',
        type: 'input',
        value: roleName,
        width: '150px',
      },
    };

    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        width: '20%',
        render: (text, record) => <a onClick={() => this.handleToRoleEdit(record)}>{text}</a>,
      },
      {
        title: '角色助记码',
        dataIndex: 'roleCode',
        width: '20%',
      },
      {
        title: '角色描述',
        dataIndex: 'roleDesc',
        width: '30%',
      },
      {
        title: '操作',
        render: (record) => (
          <Space size="small">
            <a onClick={() => this.handleSetCurrentRoleInfo(record)}>查看成员</a>

            <CustomPopconfirm
              placement={'bottomRight'}
              onConfirm={() => this.handleDeleteRole([record.roleUUID])}
              confirmLoading={false}
              title={'确定删除该角色？'}
            >
              <a>删除角色</a>
            </CustomPopconfirm>
          </Space>
        ),
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.selectedRole = selectedRows;
      },
    };

    return (
      <LayoutBox>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <SearchBar searchBarFields={searchBarFields} onSearch={this.handleSearch} />

          <Radio.Group onChange={this.handleSizeChange}>
            <Radio.Button onClick={() => this.handleToRoleEdit()}>创建角色</Radio.Button>
            <Radio.Button onClick={this.handleBatchDeleteRole}>批量删除角色</Radio.Button>
          </Radio.Group>
        </div>

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

        {currentRoleInfo && <RoleRelatedStaffModal
          roleInfo={currentRoleInfo}
          onCancel={() => this.handleSetCurrentRoleInfo(null)}
        />}
      </LayoutBox>
    );
  }
}
