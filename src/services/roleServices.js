/** 角色管理相关接口 */

import { request } from './requeset';
import api_url from '@/../config/api_url_config';
const { roleMgrBaseUrl } = api_url;

// 保存角色
export async function SaveRoleInfo(body) {
    return request(roleMgrBaseUrl + 'SaveRoleInfo', {
        method: 'POST',
        data: body
    });
}

// 搜索角色信息列表
export async function SearchRoleInfoList(body) {
    return request(roleMgrBaseUrl + 'SearchRoleInfoList', {
        method: 'POST',
        data: body
    });
}

// 删除角色
export async function DeleteRole(body) {
    return request(roleMgrBaseUrl + 'DeleteRole', {
        method: 'POST',
        data: body
    });
}

// 给成员分配角色
export async function SaveStaffRelatedRole(body) {
    return request(roleMgrBaseUrl + 'SaveStaffRelatedRole', {
        method: 'POST',
        data: body
    });
}

// 搜索角色关联的成员信息
export async function SearchRoleRelatedStaffInfoList(body) {
    return request(roleMgrBaseUrl + 'SearchRoleRelatedStaffInfoList', {
        method: 'POST',
        data: body
    });
}

// 搜索角色关联的菜单UUID列表
export async function SearchRoleRelatedMenuUUIDList(body) {
    return request(roleMgrBaseUrl + 'SearchRoleRelatedMenuUUIDList', {
        method: 'POST',
        data: body
    });
}

// 查询角色信息
export async function QueryRoleInfo(body) {
    return request(roleMgrBaseUrl + 'QueryRoleInfo', {
        method: 'POST',
        data: body
    });
}