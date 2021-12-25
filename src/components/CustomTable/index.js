import React from 'react';
import { Table } from 'antd';

const CustomTable = props => {
  const {
    columns,
    dataSource,
    total,
    pagination,
    onChange,
    pageParams,
    pageSizeOptions,
    ...otherProps
  } = props;

  dataSource && dataSource.map((item, index) => {
    item.key = index
  })

  const defaultPagination = {
    size: 'default',
    showLessItems: true,
    current: pageParams ? (pageParams.from / pageParams.size + 1) : 1,
    pageSize: pageParams ? pageParams.size : 10,
    total: total,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions,
    showTotal: total => `共 ${total} 条记录`,
    onChange: (current, pageSize) => {
      if (onChange) {
        const pageParam = {};
        pageParam.from = (current - 1) * pageSize;
        pageParam.size = pageSize;
        onChange(pageParam);
      }
    }
  }

  return <Table
    columns={columns}
    dataSource={dataSource}
    pagination={pagination !== undefined ? pagination : defaultPagination}
    {...otherProps}
  />
}

export default CustomTable;