import React from 'react';
import { Radio, Space } from 'antd';
import { history } from 'umi';
import LayoutBox from '@/components/LayoutBox';
import SearchBar from '@/components/SearchBar';
import CustomTable from '@/components/CustomTable';
import { SearchRoleInfoList, DeleteRole } from '@/services/roleServices';

export default class RoleMgmt extends React.Component {
  state = {
    searchParams: {
      roleName: '',
    },
    pageParams: { from: 0, size: 10 },

    roleInfoList: [],
    roleInfoListTotalCount: 0,
  };

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


  // 跳转角色新增、编辑页面
  handleToRoleEdit = (roleInfo) => {
    const locationInfo = {
      path: '/setting/systemMgmt/roleMgmt/edit/',
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
          path: '/setting/systemMgmt/roleMgmt/',
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

  render() {
    const { searchParams, pageParams, roleInfoList, roleInfoListTotalCount } = this.state;
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
            <a>查看成员</a>
            <a>删除角色</a>
          </Space>
        ),
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    return (
      <LayoutBox>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <SearchBar searchBarFields={searchBarFields} onSearch={this.handleSearch} />

          <Radio.Group onChange={this.handleSizeChange}>
            <Radio.Button onClick={() => this.handleToRoleEdit()}>创建角色</Radio.Button>
            <Radio.Button>批量删除角色</Radio.Button>
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
      </LayoutBox>
    );
  }
}
