import React from 'react';
import { Radio, Tag, Space } from 'antd';
import { history } from 'umi';
import LayoutBox from '@/components/LayoutBox';
import SearchBar from '@/components/SearchBar';
import CustomPopconfirm from '@/components/CustomPopconfirm';
import CustomTable from '@/components/CustomTable';

import { SearchStaffInfoList, SearchDataSetBasicInfoList, DeleteStaff, LockStaff, UnlockStaff } from '@/services/staffServices';

export default class StaffMgmt extends React.Component {
  state = {
    searchParams: {
      staffLoginName: '',
      staffRealName: '',
      staffStatus: undefined,
    },
    pageParams: { from: 0, size: 10 },

    staffInfoList: [],
    staffInfoListTotalCount: 0,

    deleteLoading: false
  };

  componentDidMount() {
    this.handleSearchStaffInfoList();
  }

  // 搜索成员信息列表
  handleSearchStaffInfoList = (sec = 0.5) => {
    const { searchParams, pageParams } = this.state;


    setTimeout(async () => {
      const res = await SearchStaffInfoList({ ...searchParams, ...pageParams });
      // const { totalCount = 0, staffInfoList = [] } = res;

      ////////////////////////////////////////
      const staffInfoList = [
        {
          "staffUUID": "c71c88d8-9066-4408-9135-a714c284335d",
          "staffLoginName": "ds",
          "staffRealName": "dengshuo",
          "staffSex": "male",
          "staffTel": "0755-1232223",
          "staffMobile": "15623566879",
          "staffEmail": "shuo.deng@foxmail.com",
          "staffStatus": 1,
          "staffCreatorUUID": "c71c88d8-9066-4408-9135-a714c28477d",
          "createdTime": "2021-1-11 17: 20: 00.005000",
          "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
        },
        {
          "staffUUID": "c71c88d8-9066-4408-9135-a714c284335d",
          "staffLoginName": "ds",
          "staffRealName": "dengshuo",
          "staffSex": "male",
          "staffTel": "0755-1232223",
          "staffMobile": "15623566879",
          "staffEmail": "shuo.deng@foxmail.com",
          "staffStatus": 0,
          "staffCreatorUUID": "c71c88d8-9066-4408-9135-a714c28477d",
          "createdTime": "2021-1-11 17: 20: 00.005000",
          "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
        },
        {
          "staffUUID": "c71c88d8-9066-4408-9135-a714c284335d",
          "staffLoginName": "ds",
          "staffRealName": "dengshuo",
          "staffSex": "male",
          "staffTel": "0755-1232223",
          "staffMobile": "15623566879",
          "staffEmail": "shuo.deng@foxmail.com",
          "staffStatus": 2,
          "staffCreatorUUID": "c71c88d8-9066-4408-9135-a714c28477d",
          "createdTime": "2021-1-11 17: 20: 00.005000",
          "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
        }
      ]
      const totalCount = 2
      ////////////////////////////////////////

      this.setState({ staffInfoList, staffInfoListTotalCount: totalCount });
    }, sec * 1000);
  }

  // 顶部bar点击
  handleBtnGroupChange = (type, staffInfo) => {
    let locationInfo = {};
    switch (type) {
      case 'add_staff':
        locationInfo = {
          path: '/setting/systemMgmt/staffMgmt/edit/',
          breadcrumbName: `${staffInfo ? '修改' : '创建'}成员`,
        }
        this.handlePageParams(locationInfo);


        history.push(locationInfo.path, { staffInfo });
        break;

      case 'reset_pwd':
        locationInfo = {
          path: '/setting/systemMgmt/staffMgmt/resetPwd/',
          breadcrumbName: '重置密码',
        }
        this.handlePageParams(locationInfo);
        history.push(locationInfo.path, { staffInfo });
        break;

      default:
        break;
    }
  }

  // 页面跳转参数存储
  handlePageParams = (locationInfo) => {
    // 保存页面搜索数据
    const { searchParams, pageParams } = this.state;
    const breadcrumbInfo = {
      breadcrumbList: [
        {
          path: '/setting/systemMgmt/staffMgmt/',
          breadcrumbName: '成员管理',
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

  // 删除指定成员
  handleDeleteStaff = async (staffUUID) => {
    this.setState({ deleteLoading: true });
    const res = await DeleteStaff({ staffUUID });
    this.setState({ deleteLoading: false }, () => {
      this.handleSearchStaffInfoList();
    });
  }

  // 锁定指定成员
  handleLockStaff = async (staffUUID) => {
    const res = await LockStaff({ staffUUID });

  }

  // 解锁指定成员
  handleUnlockStaff = async (staffUUID) => {
    const res = await UnlockStaff({ staffUUID });

  }

  // 搜索
  handleSearch = (searchParams) => {
    const { pageParams } = this.state;
    this.setState({ searchParams, pageParams: { ...pageParams, from: 0 } }, () => {
      this.handleSearchStaffInfoList();
    })
  }

  // table分页
  handleTablePageChange = (pageParams) => {
    this.setState({ pageParams }, () => {
      this.handleSearchStaffInfoList();
    });
  }


  render() {
    const { searchParams, pageParams, staffInfoList, staffInfoListTotalCount } = this.state;
    const { staffLoginName, staffRealName, staffStatus } = searchParams;

    const searchBarFields = {
      staffLoginName: {
        placeholder: '登录名',
        type: 'input',
        value: staffLoginName,
        width: '150px',
      },
      staffRealName: {
        placeholder: '成员姓名',
        type: 'input',
        value: staffRealName,
        width: '150px',
      },
      staffStatus: {
        placeholder: '成员状态',
        type: 'select',
        value: staffStatus,
        options: [
          { label: '正常', value: 1 },
          { label: '已删除', value: 0 },
          { label: '已锁定', value: 2 },
        ],
      },
    };

    const columns = [
      {
        title: '登录名',
        dataIndex: 'staffLoginName',
        width: 200
      },
      {
        title: '成员姓名',
        dataIndex: 'staffRealName',
        width: 200,
        render: (text, record) => <a onClick={() => this.handleBtnGroupChange('add_staff', record)}>{text}</a>,
      },
      {
        title: '手机',
        dataIndex: 'staffMobile'
      },
      {
        title: 'Email',
        dataIndex: 'staffEmail'
      },
      {
        title: '性别',
        dataIndex: 'staffSex',
        render: (text) => {
          let staffSex = '';
          switch (text) {
            case 'male':
              staffSex = '男'
              break;
            case 'female':
              staffSex = '女'
              break;
            default:
              break;
          }
          return staffSex
        }
      },
      {
        title: '状态',
        dataIndex: 'staffStatus',
        render: (text, record) => {
          let status = '', color = '';
          switch (text) {
            case 1:
              status = '正常';
              color = 'processing';
              break;
            case 0:
              status = '已删除';
              color = 'error';
              break;
            case 2:
              status = '已锁定';
              color = 'warning';
              break;
            default:
              break;
          }
          return <Tag color={color}>{status}</Tag>
        }
      },
      {
        title: '操作',
        render: (record) => {
          const { staffStatus, staffUUID } = record || {};
          return <Space size="small">

            {[1, 2].includes(staffStatus) &&
              <CustomPopconfirm
                placement={'bottomRight'}
                onConfirm={() => { this.handleDeleteStaff(staffUUID) }}
                confirmLoading={false}
                title={'确定删除该成员？'}
              >
                <a>删除成员</a>
              </CustomPopconfirm>
            }

            {staffStatus === 1 && <a onClick={() => this.handleLockStaff(staffUUID)}>锁定成员</a>}
            {staffStatus === 2 && <a onClick={() => this.handleUnlockStaff(staffUUID)}>解锁成员</a>}
            {staffStatus === 1 && <a onClick={() => this.handleBtnGroupChange('reset_pwd', record)}>重置密码</a>}
          </Space>

        }
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    return <LayoutBox>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar searchBarFields={searchBarFields} onSearch={this.handleSearch} />

        <Radio.Group>
          <Radio.Button onClick={() => this.handleBtnGroupChange('add_staff')}>创建成员</Radio.Button>
          <Radio.Button onClick={() => this.handleBtnGroupChange('')}>分配角色</Radio.Button>
          <Radio.Button onClick={() => this.handleBtnGroupChange('')}>导入成员</Radio.Button>
          <Radio.Button onClick={() => this.handleBtnGroupChange('')}>导出成员</Radio.Button>
          <Radio.Button onClick={() => this.handleBtnGroupChange('')}>批量删除成员</Radio.Button>
        </Radio.Group>
      </div>

      <CustomTable
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={staffInfoList}
        total={staffInfoListTotalCount}
        pageParams={pageParams}
        onChange={this.handleTablePageChange}
      />
    </LayoutBox>
  }
}
