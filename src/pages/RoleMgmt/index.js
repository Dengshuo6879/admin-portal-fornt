import React from 'react';
import styles from './index.less';
import { Button, Radio, Table, Tag, Space } from 'antd';
import SearchBar from '@/components/SearchBar';

export default class RoleMgmt extends React.Component {
  state = {
    searchParams: {
      roleName: '',
    },
  };

  render() {
    const { searchParams } = this.state;
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
      <div className={styles.roleMgmt}>
        <div className={styles.topBar}>
          <SearchBar searchBarFields={searchBarFields} onSearch={this.handleSearch} />

          <Radio.Group onChange={this.handleSizeChange}>
            <Radio.Button>创建角色</Radio.Button>
            <Radio.Button>批量删除角色</Radio.Button>
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
