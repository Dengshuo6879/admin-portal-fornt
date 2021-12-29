export default [
  {
    path: '/login/',
    name: '登录',
    layout: false,
    hideInMenu: true,
    component: './UserMgmt/Login',
  },
  {
    path: '/account/',
    hideInMenu: true,
    routes: [
      {
        path: '/account/modifyProfile/',
        name: '修改资料',
        component: './UserMgmt/ModifyProfile',
        menuRender: false,
      },
      {
        path: '/account/modifyPwd/',
        name: '修改密码',
        component: './UserMgmt/ModifyPwd',
        menuRender: false,
      },
    ],
  },

  {
    path: '/systemMgmt/',
    name: '系统管理',
    routes: [
      {
        path: '/systemMgmt/menuMgmt',
        name: '菜单管理',
        component: './MenuMgmt',
      },
      {
        path: '/systemMgmt/staffMgmt/',
        name: '成员管理',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/systemMgmt/staffMgmt/list/',
            name: '成员管理',
            component: './StaffMgmt',
          },
          {
            path: '/systemMgmt/staffMgmt/edit/',
            name: '成员管理',
            component: './StaffMgmt/StaffEdit',
          },
          {
            path: '/systemMgmt/staffMgmt/resetPwd/',
            name: '重置密码',
            component: './StaffMgmt/ResetPwd',
          },
          {
            path: '/systemMgmt/staffMgmt/',
            redirect: '/systemMgmt/staffMgmt/list/'
          }
        ]
      },
      {
        path: '/systemMgmt/roleMgmt',
        name: '角色管理',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/systemMgmt/roleMgmt/list/',
            name: '成员管理',
            component: './RoleMgmt',
          },
          {
            path: '/systemMgmt/roleMgmt/edit/',
            name: '成员管理',
            component: './RoleMgmt/RoleEdit',
          },
          {
            path: '/systemMgmt/roleMgmt/',
            redirect: '/systemMgmt/roleMgmt/list/'
          }
        ]
      },
      {
        path: '/systemMgmt/logMgmt',
        name: '操作日志',
        component: './LogMgmt',
      },
    ],
  },
  {
    component: './404',
  }
];
