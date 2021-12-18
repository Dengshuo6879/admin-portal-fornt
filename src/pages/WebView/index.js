import React from 'react';
import { Link } from 'umi';


const accessToken = '我是accessToken'

export default class WebView extends React.Component {
    state = {
        srcInfo: {
            '/dataset/': `http://192.168.1.40:8004/autoai-admin-front/dataSet/?accessToken=${accessToken}`,
            '/model/': `http://192.168.1.40:8004/autoai-admin-front/model/?accessToken=${accessToken}`,
            '/device/': `http://192.168.1.40:8004/autoai-admin-front/device/?accessToken=${accessToken}`
        },

        targetInfo: {
            pathname: '',
            url: ''
        }
    }

    componentDidMount() {
        const targetInfoStr = sessionStorage.getItem('targetInfo')
        if (targetInfoStr) {
            const targetInfo = decodeURI(targetInfoStr)
            this.setState({ targetInfo: JSON.parse(targetInfo) })
        } else {
            const { srcInfo } = this.state
            const { location: { pathname = '' } } = this.props
            this.setState({
                targetInfo: {
                    pathname: pathname,
                    url: srcInfo[pathname]
                }
            })
        }

        // 接受iframe页面消息
        window.onmessage = event => {
            //监听message事件
            if (event !== undefined) {
                const receivedData = event.data
                const { type } = receivedData
                if (type == 'open_new_window') {
                    this.handleOpenNewWindow(receivedData)
                }
            }
        }
    }

    // 打开新窗口
    handleOpenNewWindow = (receivedData) => {
        const { params } = receivedData
        const targetInfo = {
            pathname: '/device/',
            url: 'http://192.168.1.20:8004/autoai-admin-front/device/monitor/' + `${params ? encodeURI(JSON.stringify(params)) : ''} `,
        }
        sessionStorage.setItem('targetInfo', encodeURI(JSON.stringify(targetInfo)))
        document.getElementById('link').click()
    }

    componentWillUnmount() {
        sessionStorage.removeItem('targetInfo')
    }

    render() {
        const { targetInfo } = this.state
        const { pathname, url } = targetInfo

        return <div style={{ height: 'calc(100vh - 48px)' }}>
            <iframe
                src={url}
                frameBorder='0'
                width='100%'
                height='100%'
                scrolling={'auto'}
            ></iframe>

            <Link to={{ pathname: pathname }} target='_blank' id={'link'}></Link>
        </div>
    }
}