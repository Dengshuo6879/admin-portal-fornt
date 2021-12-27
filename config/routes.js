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
            component: './MenuMgmt',
          },
          {
            path: '/setting/systemMgmt/staffMgmt/',
            name: '成员管理',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/setting/systemMgmt/staffMgmt/list/',
                name: '成员管理',
                component: './StaffMgmt',
              },
              {
                path: '/setting/systemMgmt/staffMgmt/edit/',
                name: '成员管理',
                component: './StaffMgmt/StaffEdit',
              },
              {
                path: '/setting/systemMgmt/staffMgmt/resetPwd/',
                name: '重置密码',
                component: './StaffMgmt/ResetPwd',
              },
              {
                path: '/setting/systemMgmt/staffMgmt/',
                redirect: '/setting/systemMgmt/staffMgmt/list/'
              }
            ]
          },
          {
            path: '/setting/systemMgmt/roleMgmt',
            name: '角色管理',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/setting/systemMgmt/roleMgmt/list/',
                name: '成员管理',
                component: './RoleMgmt',
              },
              {
                path: '/setting/systemMgmt/roleMgmt/edit/',
                name: '成员管理',
                component: './RoleMgmt/RoleEdit',
              },
              {
                path: '/setting/systemMgmt/roleMgmt/',
                redirect: '/setting/systemMgmt/roleMgmt/list/'
              }
            ]
          },
        ],
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
        path: '/setting/logMgmt',
        name: '操作日志查询',
        component: './SystemMgmt',
      },
      {
        component: './404',
      },
    ],
  },
];
