/** 日志管理相关接口 */

import { request } from './requeset';
import api_url from '@/../config/api_url_config';
const { logMgrBaseUrl } = api_url;

// 搜索日志信息列表
export async function SearchLogInfoList(body) {
    return request(logMgrBaseUrl + 'SearchLogInfoList', {
        method: 'POST',
        data: body
    });
}

// 获取日志信息列表
export async function GetLogTypeInfoList(body) {
    return request(logMgrBaseUrl + 'GetLogTypeInfoList', {
        method: 'POST',
        data: body
    });
}