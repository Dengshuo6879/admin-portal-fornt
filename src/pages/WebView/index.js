import React from 'react';
import { Link } from 'umi';

export default class WebView extends React.Component {
  state = {
    srcInfo: {
      '/dataset/': `http://192.168.1.33:8004/autoai-admin-front/dataSet/`,
      '/model/': `http://192.168.1.33:8004/autoai-admin-front/model/`,
      '/device/': `http://192.168.1.33:8004/autoai-admin-front/device/`,
    },

    targetInfo: {
      pathname: '',
      url: '',
    },
  };

  componentDidMount() {
    const targetInfoStr = sessionStorage.getItem('targetInfo');
    if (targetInfoStr) {
      const targetInfo = decodeURI(targetInfoStr);
      this.setState({ targetInfo: JSON.parse(targetInfo) });
    } else {
      const { srcInfo } = this.state;
      const {
        location: { pathname = '' },
      } = this.props;
      this.setState({
        targetInfo: {
          pathname: pathname,
          url: srcInfo[pathname],
        },
      });
    }

    // 接受iframe页面消息
    window.onmessage = (event) => {
      //监听message事件
      if (event !== undefined) {
        const receivedData = event.data;
        const { type } = receivedData;
        switch (type) {
          case 'open_new_window':
            this.handleOpenNewWindow(receivedData);
            break;

          default:
            break;
        }
      }
    };
  }

  // 打开新窗口
  handleOpenNewWindow = (receivedData) => {
    const { params } = receivedData;
    const targetInfo = {
      pathname: '/device/',
      url:
        'http://192.168.1.20:8004/autoai-admin-front/device/monitor/' +
        `${params ? '?' + encodeURI(JSON.stringify(params)) : ''} `,
    };
    sessionStorage.setItem('targetInfo', encodeURI(JSON.stringify(targetInfo)));

    this.link.click();
  };

  componentWillUnmount() {
    sessionStorage.removeItem('targetInfo');
  }

  render() {
    const { targetInfo } = this.state;
    const { pathname, url } = targetInfo;
    const staffInfo = window.btoa(localStorage.getItem('staffInfo') || '');

    return (
      <div style={{ height: 'calc(100vh - 48px)' }}>
        <iframe
          name={staffInfo}
          src={url}
          frameBorder="0"
          width="100%"
          height="100%"
          scrolling={'auto'}
        ></iframe>

        <Link to={{ pathname: pathname }} target="_blank" ref={(ref) => (this.link = ref)}></Link>
      </div>
    );
  }
}
