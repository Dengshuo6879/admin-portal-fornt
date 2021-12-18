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
        component: './SystemMgmt',
      },
      {
        path: '/setting/logMgmt',
        name: '操作日志查询',
        component: './SystemMgmt',
      },
      {
        path: '/setting/accountMgmt',
        name: '帐号管理',
        component: './SystemMgmt',
      },
      {
        component: './404',
      },
    ],
  }
];
