/** 成员管理相关接口 */

import { request } from './requeset';
import api_url from '@/../config/api_url_config';
const { staffMgrBaseUrl } = api_url;

export async function SearchDataSetBasicInfoList(body) {
  return request(staffMgrBaseUrl + 'SearchDataSetBasicInfoList', {
    method: 'POST',
    data: body
  });
}

// 创建成员
export async function CreateStaff(body) {
  return request(staffMgrBaseUrl + 'CreateStaff', {
    method: 'POST',
    data: body
  });
}

// 保存成员信息
export async function SaveStaffInfo(body) {
  return request(staffMgrBaseUrl + 'SaveStaffInfo', {
    method: 'POST',
    data: body
  });
}

// 搜索成员信息列表
export async function SearchStaffInfoList(body) {
  return request(staffMgrBaseUrl + 'SearchStaffInfoList', {
    method: 'POST',
    data: body
  });
}

// 删除成员
export async function DeleteStaff(body) {
  return request(staffMgrBaseUrl + 'DeleteStaff', {
    method: 'POST',
    data: body
  });
}

// 查询指定成员
export async function QueryStaffInfo(body) {
  return request(staffMgrBaseUrl + 'QueryStaffInfo', {
    method: 'POST',
    data: body
  });
}

// 获取登录授权码
export async function GetLoginAuthCode(body) {
  return request(staffMgrBaseUrl + 'GetLoginAuthCode', {
    method: 'POST',
    data: body
  });
}

// 通过登录授权码进行登录
export async function LoginWithAuthCode(body) {
  return request(staffMgrBaseUrl + 'LoginWithAuthCode', {
    method: 'POST',
    data: body
  });
}

// 登出
export async function Logout(body) {
  return request(staffMgrBaseUrl + 'Logout', {
    method: 'POST',
    data: body
  });
}

// 修改成员密码
export async function ModifyPwdWithOldPwd(body) {
  return request(staffMgrBaseUrl + 'ModifyPwdWithOldPwd', {
    method: 'POST',
    data: body
  });
}

// 重置成员密码
export async function ResetStaffPwd(body) {
  return request(staffMgrBaseUrl + 'ResetStaffPwd', {
    method: 'POST',
    data: body
  });
}

// 锁定指定成员
export async function LockStaff(body) {
  return request(staffMgrBaseUrl + 'LockStaff', {
    method: 'POST',
    data: body
  });
}

// 解锁指定成员
export async function UnlockStaff(body) {
  return request(staffMgrBaseUrl + 'UnlockStaff', {
    method: 'POST',
    data: body
  });
}

// 搜索成员关联的角色UUID列表
export async function SearchStaffRelatedRoleUUIDList(body) {
  return request(staffMgrBaseUrl + 'SearchStaffRelatedRoleUUIDList', {
    method: 'POST',
    data: body
  });
}

// 获取当前登录成员信息
export async function QueryLoginStaffInfo(options) {
  return request(staffMgrBaseUrl + 'QueryLoginStaffInfo', {
    method: 'POST',
    data: body
  });
}

// 导入成员信息列表
export async function ImportStaffInfoList(options) {
  return request(staffMgrBaseUrl + 'ImportStaffInfoList', {
    method: 'POST',
    data: body
  });
}

