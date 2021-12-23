import React from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';
import { digitRandomNum } from '@/utils/utils';
import styles from './index.less';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const FormItem = Form.Item;
const Option = Select.Option;
const connectFlag = '-+-';

export default class SearchBar extends React.Component {
  formRef = React.createRef();

  hasDateRange = false;
  dateRange = {
    startDate: '',
    endDate: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(this.props.searchBarFields) !== JSON.stringify(nextProps.searchBarFields) ||
      this.props.loading !== nextProps.loading
    ) {
      return true;
    }
    return false;
  }

  dateAgo = ({ num = 1, timeUnit = 'week' }) => {
    return dayjs().subtract(num, timeUnit).format(dateFormat);
  };

  disabledDate = (current) => {
    const { limitDateRange = true } = this.props;
    return (
      current &&
      (current > dayjs(this.dateAgo({ num: 0, timeUnit: 'day' }), dateFormat).endOf('day') ||
        (limitDateRange &&
          current < dayjs(this.dateAgo({ num: 1, timeUnit: 'year' }), dateFormat).endOf('day')))
    );
  };

  handleRangePickerChange = (date, dateString) => {
    this.dateRange.startDate = dateString[0];
    this.dateRange.endDate = dateString[1];
  };

  onFinish = (values) => {
    const { onSearch } = this.props;
    if (onSearch) {
      const searchParams = {};
      Object.keys(values).map((key) => {
        const realKey = key.split(connectFlag)[0];
        searchParams[realKey] = values[key];
      });

      if (this.hasDateRange) {
        searchParams.startDate = this.dateRange.startDate;
        searchParams.endDate = this.dateRange.endDate;
        delete searchParams.dateRange;
      }
      onSearch(searchParams);
    }
  };

  renderFormItem = (selectItemKey, selectItem) => {
    switch (selectItem.type) {
      case 'input':
        return (
          <FormItem name={selectItemKey} initialValue={selectItem.value} noStyle>
            <Input
              autoComplete={'off'}
              style={{ width: '100%', height: '32px' }}
              maxLength={100}
              placeholder={selectItem.placeholder || ''}
            />
          </FormItem>
        );

      case 'select':
        return (
          <FormItem name={selectItemKey} initialValue={selectItem.value} noStyle>
            <Select
              className={styles.select}
              disabled={selectItem.disabled}
              allowClear={true}
              placeholder={selectItem.placeholder || '选择'}
            >
              {selectItem.options.map(function (item, index) {
                return (
                  <Option key={index} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </FormItem>
        );

      case 'dateRange':
        this.hasDateRange = true;
        this.dateRange = {
          startDate: selectItem.value.startDate,
          endDate: selectItem.value.endDate,
        };
        return (
          <FormItem name={selectItemKey} label="商品名称" noStyle>
            <>{selectItem.lable}:&nbsp;</>
            <RangePicker
              allowClear={false}
              defaultValue={[
                dayjs(selectItem.value.startDate, dateFormat),
                dayjs(selectItem.value.endDate, dateFormat),
              ]}
              format={dateFormat}
              onChange={this.handleRangePickerChange}
              disabledDate={this.disabledDate}
            />
          </FormItem>
        );
      default:
        break;
    }
  };

  render() {
    const { searchBarFields, loading } = this.props;
    return (
      <div style={{ display: 'inline-block' }}>
        <Form layout="inline" preserve={false} ref={this.formRef} onFinish={this.onFinish}>
          <div className={styles.searchBar}>
            {Object.keys(searchBarFields).length > 0 &&
              Object.keys(searchBarFields).map((selectItemKey, index) => {
                const selectItem = searchBarFields[selectItemKey];
                return (
                  <div className={styles.formItem} style={{ width: selectItem.width }} key={index}>
                    {/* 生成随机4位数是为了避免id重复，在提交表单时需去掉 */}
                    {this.renderFormItem(
                      selectItemKey + connectFlag + digitRandomNum(4),
                      selectItem,
                    )}
                  </div>
                );
              })}
            <FormItem>
              <Button type="primary" loading={loading} icon={<SearchOutlined />} htmlType="submit">
                搜索
              </Button>
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}
