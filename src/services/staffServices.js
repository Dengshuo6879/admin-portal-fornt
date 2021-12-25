import { message } from 'antd';

// 成员管理接口
import { extend } from 'umi-request';

import api_url from '@/../config/api_url_config';
const { staffMgrBaseUrl } = api_url;

const request = extend({
  prefix: staffMgrBaseUrl,
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


export async function SearchDataSetBasicInfoList(body) {
  return request('SearchDataSetBasicInfoList', {
    method: 'POST',
    data: body
  });
}


// 创建成员
export async function CreateStaff(body) {
  return request('CreateStaff', {
    method: 'POST',
    data: body
  });
}

// 保存成员信息
export async function SaveStaffInfo(body) {
  return request('SaveStaffInfo', {
    method: 'POST',
    data: body
  });
}

// 搜索成员信息列表
export async function SearchStaffInfoList(body) {
  return request('SearchStaffInfoList', {
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

