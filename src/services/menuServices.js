/** 菜单管理相关接口 */

import { request } from './requeset';
import api_url from '@/../config/api_url_config';
const { menuMgrBaseUrl } = api_url;

// 保存菜单
export async function SaveMenuInfo(body) {
    return request(menuMgrBaseUrl + 'SaveMenuInfo', {
        method: 'POST',
        data: body
    });
}

// 搜索菜单信息列表
export async function SearchMenuInfoList(body) {
    return request(menuMgrBaseUrl + 'SearchMenuInfoList', {
        method: 'POST',
        data: body
    });
}

// 删除菜单
export async function DeleteMenu(body) {
    return request(menuMgrBaseUrl + 'DeleteMenu', {
        method: 'POST',
        data: body
    });
}