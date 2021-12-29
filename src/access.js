/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentStaff } = initialState || {};
  return {
    canAdmin: currentStaff && currentStaff.access === 'admin',
  };
}
