import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import WebView from '@/pages/WebView'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      // const msg = await queryCurrentUser();
      const msg = {}
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   if (initialState.loading) return <PageLoading />;
    //   return children;
    // },
    // ...initialState?.settings,
  };
};


// 修改路由
export function patchRoutes({ routes }) {
  const routesList = [
    {
      name: '我的数据集',
      path: '/dataset/',
      component: WebView,
    },
    {
      name: '我的模型',
      path: '/model/',
      component: WebView,
    },
    {
      name: '环境中心',
      path: '/device/',
      component: WebView,
    }
  ]

  const suffixRoutesList = [
    {
      path: '/',
      redirect: routesList[0] && routesList[0].path
    },
    {
      component: './404',
    }
  ]

  const newRoutesList = routesList.concat(routes[0].routes, suffixRoutesList);
  routes[0].routes = newRoutesList
}


export const request = (config) => {

  const authHeaderInterceptor = (url, options) => {
    const authHeader = { Authorization: 'Bearer xxxxxx' };
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: authHeader },
    };
  };

  // const demoResponseInterceptors = (response, options) => {
  //   return response;
  // };

  return {
    timeout: 60 * 1000,
    errorConfig: {
      adaptor: (resData) => {
        console.log('resData---', resData)




        return {
          // ...resData,
          success: true,
          errorMessage: resData.errorMessage,
        };
      },
    },
    requestInterceptors: [authHeaderInterceptor],
    // responseInterceptors: [demoResponseInterceptors]
  }
};