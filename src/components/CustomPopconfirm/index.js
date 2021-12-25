import React from 'react';
import { Popconfirm } from 'antd';

export default class CustomPopconfirm extends React.Component {
  state = {
    visible: false
  }



  componentWillReceiveProps(nextProps) {
    if ((this.props.confirmLoading === true) && (nextProps.confirmLoading === false)) { // 确认事件结束后才关闭Popconfirm
      this.handlePopVisible(false);
    }
  }

  // 控制 popconfirm 显示隐藏
  handlePopVisible = (value) => {
    this.setState({ visible: value });
  }

  render() {
    const { visible } = this.state;
    const { placement, title, onConfirm, okText, cancelText, children, confirmLoading, ...popconfirmProps } = this.props;

    const popconfirmDom = <Popconfirm
      defaultVisible={visible}
      zIndex={1}
      destroyTooltipOnHide={true}
      placement={placement || 'topRight'}
      title={title || '确定删除该项？'}
      okText={okText || '确定'}
      cancelText={cancelText || '取消'}
      onCancel={() => this.handlePopVisible(false)}
      arrowPointAtCenter={true}
      okButtonProps={{
        loading: confirmLoading,
        onClick: onConfirm,
        ghost: true
      }}
      {...popconfirmProps}
    >
      {children && <span onClick={() => this.handlePopVisible(true)}>{children}</span>
        ||
        <a onClick={() => this.handlePopVisible(true)}>删除</a>}
    </Popconfirm>


    return <div>
      {visible && popconfirmDom}
      {!visible && popconfirmDom}
    </div>
  }
}