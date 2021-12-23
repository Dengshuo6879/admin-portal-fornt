import React from 'react';
import styles from './index.less';
import { Button, Radio, Table, Tag, Space } from 'antd';
import SearchBar from '@/components/SearchBar';

export default class StaffMgmt extends React.Component {
  state = {
    searchParams: {
      staffLoginName: '',
      staffRealName: '',
      staffStatus: undefined,
    },
  };

  render() {
    const { searchParams } = this.state;
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
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '成员姓名',
        dataIndex: 'age',
        key: 'age',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '性别',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '手机',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Email',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
      {
        title: '状态',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    return (
      <div className={styles.staffMgmt}>
        <div className={styles.topBar}>
          <SearchBar searchBarFields={searchBarFields} onSearch={this.handleSearch} />

          <Radio.Group onChange={this.handleSizeChange}>
            <Radio.Button>新增成员</Radio.Button>
            <Radio.Button>分配角色</Radio.Button>
            <Radio.Button>导入成员</Radio.Button>
            <Radio.Button>导出成员</Radio.Button>
            <Radio.Button>批量删除成员</Radio.Button>
          </Radio.Group>
        </div>

        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}
