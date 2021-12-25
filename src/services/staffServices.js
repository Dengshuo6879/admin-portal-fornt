// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import api_url from '@/../config/api_url_config';

const { staffMgrBaseUrl } = api_url;

// 创建成员
export async function CreateStaff(options) {
  return request(staffMgrBaseUrl + 'CreateStaff', {
    method: 'POST',
    ...(options || {}),
  });
}

// 保存成员信息
export async function SaveStaffInfo(options) {
  return request(staffMgrBaseUrl + 'SaveStaffInfo', {
    method: 'POST',
    ...(options || {}),
  });
}

// 搜索成员信息列表
export async function SearchStaffInfoList(options) {
  return request(staffMgrBaseUrl + 'SearchStaffInfoList', {
    method: 'POST',
    ...(options || {}),
  });
}

// 删除成员
export async function DeleteStaff(options) {
  return request(staffMgrBaseUrl + 'DeleteStaff', {
    method: 'POST',
    ...(options || {}),
  });
}

// 查询指定成员
export async function QueryStaffInfo(options) {
  return request(staffMgrBaseUrl + 'QueryStaffInfo', {
    method: 'POST',
    ...(options || {}),
  });
}

// 获取登录授权码
export async function GetLoginAuthCode(options) {
  return request(staffMgrBaseUrl + 'GetLoginAuthCode', {
    method: 'POST',
    ...(options || {}),
  });
}

// 通过登录授权码进行登录
export async function LoginWithAuthCode(options) {
  return request(staffMgrBaseUrl + 'LoginWithAuthCode', {
    method: 'POST',
    ...(options || {}),
  });
}

// 登出
export async function Logout(options) {
  return request(staffMgrBaseUrl + 'Logout', {
    method: 'POST',
    ...(options || {}),
  });
}

// 修改成员密码
export async function ModifyPwdWithOldPwd(options) {
  return request(staffMgrBaseUrl + 'ModifyPwdWithOldPwd', {
    method: 'POST',
    ...(options || {}),
  });
}

// 重置成员密码
export async function ResetStaffPwd(options) {
  return request(staffMgrBaseUrl + 'ResetStaffPwd', {
    method: 'POST',
    ...(options || {}),
  });
}

// 锁定指定成员
export async function LockStaff(options) {
  return request(staffMgrBaseUrl + 'LockStaff', {
    method: 'POST',
    ...(options || {}),
  });
}

// 解锁指定成员
export async function UnlockStaff(options) {
  return request(staffMgrBaseUrl + 'UnlockStaff', {
    method: 'POST',
    ...(options || {}),
  });
}

// 获取当前登录成员信息
export async function QueryLoginStaffInfo(options) {
  return request(staffMgrBaseUrl + 'QueryLoginStaffInfo', {
    method: 'POST',
    ...(options || {}),
  });
}

// 导入成员信息列表
export async function ImportStaffInfoList(options) {
  return request(staffMgrBaseUrl + 'ImportStaffInfoList', {
    method: 'POST',
    ...(options || {}),
  });
}

