import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import { QueryStaffInfo, SearchStaffRelatedRoleUUIDList } from '@/services/staffServices';
import { SearchMenuInfoList } from '@/services/menuServices';
import { SearchRoleRelatedMenuUUIDList } from '@/services/roleServices';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import WebView from '@/pages/WebView';
import { getTreeData } from '@/utils/utils';

const loginPath = '/user/login/';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  // 查询当前登录成员信息
  const fetchStaffInfo = async () => {
    try {
      const localStaffInfo = JSON.parse(localStorage.getItem('localStaffInfo')) || {};
      const { staffUUID } = localStaffInfo;
      // const res = await QueryStaffInfo({ staffUUID });

      ///////////////////////////////
      const res = {
        "errorCode": 0,
        "errorMessage": "",
        "staffInfo": {
          "staffUUID": "c71c88d8-9066-4408-9135-a714c2843333",
          "staffLoginName": "ds",
          "staffRealName": "dengshuo",
          "staffSex": "male",
          "staffTel": "0755-1232223",
          "staffMobile": "15623566879",
          "staffEmail": "shuo.deng@foxmail.com",
          "staffStatus": 1,
          "staffCreatorUUID": "c71c88d8-9066-4408-9135-a714c28477d",
          "createdTime": "2021-1-11 17: 20: 00.005000",
          "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
        }
      }
      ///////////////////////////////

      return res.staffInfo;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 搜索菜单信息列表
  const fetchSearchMenuInfoList = async () => {
    const res = await SearchMenuInfoList();
    const { menuInfoList = [

      ///////////////////////////
      {
        "menuUUID": "c71c88d8-9066-4408-9135-a714c284335d",
        "parentMenuUUID": "",
        "menuName": "我的数据集",
        "menuCode": "dataset",
        "menuUrl": "http://40.23.44.34:8000/dataset/",
        "menuOrder": "001",
        "createdTime": "2021-1-11 17: 20: 00.005000",
        "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
      },
      {
        "menuUUID": "c71c88d8-9066-4408-9135-a714c2843354",
        "parentMenuUUID": "",
        "menuName": "我的模型",
        "menuCode": "model",
        "menuUrl": "http://40.23.44.34:8000/dataset/",
        "menuOrder": "001",
        "createdTime": "2021-1-11 17: 20: 00.005000",
        "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
      },
      {
        "menuUUID": "c71c88d8-9066-4408-9135-a714c2843355",
        "parentMenuUUID": "c71c88d8-9066-4408-9135-a714c2843354",
        "menuName": "我的模型-子页面1",
        "menuCode": "model1",
        "menuUrl": "http://40.23.44.34:8000/dataset/",
        "menuOrder": "001",
        "createdTime": "2021-1-11 17: 20: 00.005000",
        "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
      },
      {
        "menuUUID": "c71c88d8-9066-4408-9135-a714c2843365",
        "parentMenuUUID": "c71c88d8-9066-4408-9135-a714c2843355",
        "menuName": "我的模型-子页面2",
        "menuCode": "model2",
        "menuUrl": "http://40.23.44.34:8000/dataset/",
        "menuOrder": "002",
        "createdTime": "2021-1-11 17: 20: 00.005000",
        "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
      }
      ///////////////////////////

    ]
    } = res;

    return menuInfoList
  }
  const menuInfoList = await fetchSearchMenuInfoList();

  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentStaff = await fetchStaffInfo();
    return {
      fetchStaffInfo,
      currentStaff,
      menuInfoList,
      settings: {},
    };
  }

  return {
    fetchStaffInfo,
    menuInfoList,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentStaff?.staffRealName,
    },
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentStaff && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menu: {
      locale: false,
      request: (params, defaultMenuDat) => {    // 要返回promise对象
        const staffUUID = initialState?.currentStaff?.staffUUID
        if (staffUUID) {
          return new Promise(async (resolve, reject) => {

            // 搜索成员关联的角色UUID列表
            const roleUUIDRes = await SearchStaffRelatedRoleUUIDList({ staffUUID });
            const { roleUUIDList = ['1', '2'] } = roleUUIDRes;

            // 搜索所有角色关联的菜单UUID列表，并去重
            Promise.all(
              roleUUIDList.map(roleUUID => SearchRoleRelatedMenuUUIDList({ roleUUID }))
            ).then(res => {
              // 对所有角色关联的菜单UUID去重
              const menuUUIDObj = {};
              res.map(i => {
                const { menuUUIDList = ["c71c88d8-9066-4408-9135-a714c284335d"] } = i;
                menuUUIDList.map(menuUUID => menuUUIDObj[menuUUID] = true);
              })
              const menuUUIDList = Object.keys(menuUUIDObj);
              console.log('menuUUIDList---', menuUUIDList)

              // 过滤出可展示的菜单
              const menuList = [];
              defaultMenuDat.map(menuInfo => {
                // if (menuUUIDList.includes(menuInfo.menuUUID)) {
                menuList.push(menuInfo)
                // }
              })
              console.log('menuList---', menuList)
              resolve(menuList)
            })
          })
        }
      }
    },
    footerRender: false,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      if (initialState.loading) return <PageLoading />;
      return children;
    },
    ...initialState?.settings,
  };
};

// 拉取路由
let extraRoutes = [];
export function patchRoutes({ routes }) {
  const suffixRoutesList = [
    {
      path: '/',
      redirect: extraRoutes[0] && extraRoutes[0].path
    },
    {
      component: './404',
    }
  ]

  const newRoutesList = extraRoutes.concat(routes[0].routes, suffixRoutesList);
  routes[0].routes = newRoutesList
}
export function render(oldRender) {
  SearchMenuInfoList().then(res => {
    const { menuInfoList = [

      ///////////////////////////
      {
        "menuUUID": "c71c88d8-9066-4408-9135-a714c284335d",
        "parentMenuUUID": "",
        "menuName": "我的数据集",
        "menuCode": "dataset",
        "menuUrl": "http://40.23.44.34:8000/dataset/",
        "menuOrder": "001",
        "createdTime": "2021-1-11 17: 20: 00.005000",
        "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
      },
      {
        "menuUUID": "c71c88d8-9066-4408-9135-a714c2843354",
        "parentMenuUUID": "",
        "menuName": "我的模型",
        "menuCode": "mymodel",
        "menuUrl": "http://40.23.44.34:8000/dataset/",
        "menuOrder": "001",
        "createdTime": "2021-1-11 17: 20: 00.005000",
        "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
      },
      {
        "menuUUID": "c71c88d8-9066-4408-9135-a714c2843355",
        "parentMenuUUID": "c71c88d8-9066-4408-9135-a714c2843354",
        "menuName": "我的模型-子页面1",
        "menuCode": "mymodel/model",
        "menuUrl": "http://40.23.44.34:8000/dataset/",
        "menuOrder": "001",
        "createdTime": "2021-1-11 17: 20: 00.005000",
        "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
      }
      ///////////////////////////

    ] } = res;

    const routesList = [];
    menuInfoList.map(menuInfo => {
      const { menuName, menuCode, menuUUID, parentMenuUUID } = menuInfo;
      routesList.push({
        name: menuName,
        path: `/${menuCode}/`,
        menuUUID,
        parentMenuUUID,
        component: WebView,
      })
    })
    extraRoutes = getTreeData(routesList);
    oldRender();
  })
}