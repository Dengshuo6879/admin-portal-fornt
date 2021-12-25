let urlDomain = '',
    baseUrl = '/AdminPortal';

switch (REACT_APP_ENV) {
    case 'dev':
        urlDomain = 'http://192.168.1.43:38433';
        break;
    case 'test':
        urlDomain = 'http://192.168.1.43:38433';
        break;
    case 'pro':
        urlDomain = config.domain;
        break;
    default:
        break;
}

const reqUrlDomamin = urlDomain + baseUrl;

const api_url = {
    urlDomain,
    reqUrlDomamin,

    staffMgrBaseUrl: reqUrlDomamin + '/StaffMgr/',
};

export default api_url;