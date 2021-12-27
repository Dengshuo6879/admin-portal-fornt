// 生成n位随机数
export const digitRandomNum = (n) => {
  let t = '';
  for (var i = 0; i < n; i++) {
    t += Math.floor(Math.random() * 10);
  }
  return t;
};

// 输入正则校验
export function regExp(text, type, length) {
  let regExp1 = '';
  // 中英文数字符号'CENS' 数字'N' 中英文数字'CEN' 英文数字'EN'
  switch (type) {
    case 'CENS':
      regExp1 = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\n\·~！@#￥%……&*（）\-\+=【】{}、\\|/；‘’：“”《》？，。、`~!#$%^&*()_[\]\|;'':"",.<>?—— ]/g;
      break;
    case 'N':
      regExp1 = /[^0-9]/g;
      break;
    case 'CEN':
      regExp1 = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5 ]/g;
      break;
    case 'EN':
      regExp1 = /[^0-9a-zA-Z]/g;
      break;
    case 'TEL':
      regExp1 = /[^0-9\-]/g;
      break;
    case 'EMAIL':
      regExp1 = /[^\d\a-\z\A-\Z_@.-]/g;
      break;
    default:
      break;
  }
  const val = text.replace(regExp1, '');
  // 去除首位空白
  const regExp2 = /\s/g;
  return val.replace(regExp2, '').substring(0, length);
}

// 输入正则校验
export const regExpObj = {
  CENS: /^[\a-\z\A-\Z0-9\u4E00-\u9FA5\n\·~！@#￥%……&*（）\-\+=【】{}、\\|/；‘’：“”《》？，。、`~!#$%^&*()_[\]\|;'':"",.<>?—— ]+$/g, // 中英文数字符号
  N: /[^0-9]+$/g,  // 数字
  CEN: /^[\u4E00-\u9FA5A-Za-z0-9]+$/g,  // 中英文数字
  CE: /^[\u4E00-\u9FA5A-Za-z]+$/g,  // 中英文
  EN: /^[A-Za-z0-9]+$/g,  // 英文数字,
  ENS: /[^0-9a-zA-Z]/g,// 英文数字,匹配整个输入内容,
  phone: /^1\d{10}$/g,   // 手机号
  email: /^[\d\a-\z\A-\Z_@.-]/g,
  PN: /^\d+(\.)?(\.\d+)?$/g,  // 正数
};


export const formRules = ({ required, min, max, regExpType }) => {
  const rules = [{ whitespace: true }];
  if (required) {
    rules.push({ required })
  }
  if (min) {
    rules.push({ min })
  }
  if (max) {
    rules.push({ max })
  }
  if (regExpType) {
    rules.push({ pattern: regExpObj[regExpType] })
  }
  return rules
}

// 获取面包屑数据
export function getBreadcrumb() {
  const breadcrumbInfoStr = sessionStorage.getItem('breadcrumbInfo') || '';
  if (breadcrumbInfoStr) {
    const breadcrumbInfo = JSON.parse(breadcrumbInfoStr);
    return breadcrumbInfo
  }
}



// 处理树形结构数据
export function getTreeData(arr) {
  const obj = {}; //构建map
  arr.map(item => {
    item.title = item.menuName;
    item.key = item.menuUUID;
    item.isLeaf = true;
    obj[item.menuUUID] = item; // 构建以id为键 当前数据为值
  });

  const treeData = [];
  arr.map(child => {
    const mapItem = obj[child.parentMenuUUID]; // 判断当前数据的parentId是否存在map中
    if (mapItem) {
      mapItem.isLeaf = false;
      //存在则表示当前数据不是最顶层的数据
      (mapItem.children || (mapItem.children = [])).push(child);
    } else {
      // 不存在则是顶层数据
      treeData.push(child);
    }
  });
  return treeData;
}