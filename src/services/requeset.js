import { message } from 'antd';
import { extend } from 'umi-request';
export const request = extend({
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/json',
    },
    errorHandler: function (error) {
        if (error.response) {
            // 请求已发送但服务端返回状态码非 2xx 的响应
            const { errorCode, errorMessage } = error.response;


        } else {
            // 请求初始化时出错或者没有响应返回的异常
            console.log(error.message);
        }

        return error.data || {}
    }
});