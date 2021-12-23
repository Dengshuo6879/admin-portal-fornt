export default [
  {
    path: '/user/',
    layout: false,
    routes: [
      {
        path: '/user/',
        routes: [
          {
            name: '登录',
            path: '/user/login/',
            component: './User/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/setting/',
    name: '系统设置',
    routes: [
      {
        path: '/setting/systemMgmt',
        name: '系统管理',
        routes: [
          {
            path: '/setting/systemMgmt/menuMgmt',
            name: '菜单管理',
            component: './SystemMgmt',
          },
          {
            path: '/setting/systemMgmt/staffMgmt',
            name: '成员管理',
            component: './SystemMgmt/StaffMgmt',
          },
          {
            path: '/setting/systemMgmt/roleMgmt',
            name: '角色管理',
            component: './SystemMgmt/RoleMgmt',
          },
        ],
      },
      {
        path: '/setting/logMgmt',
        name: '操作日志查询',
        component: './SystemMgmt',
      },
      {
        path: '/setting/accountMgmt',
        name: '帐号管理',
        routes: [
          {
            path: '/setting/accountMgmt/modify',
            name: '修改资料',
            component: './SystemMgmt',
          },
          {
            path: '/setting/accountMgmt/modifyPwd',
            name: '修改密码',
            component: './SystemMgmt',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
];
