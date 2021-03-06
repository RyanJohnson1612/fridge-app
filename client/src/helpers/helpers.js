/* Get cookie by name
 * @param {string} the name of cookie to get
 * @return {string/undefined} unescaped cookie/ undefined if cookie not found
 */
const getCookie = (name) => {
  const cookies = '; ' + document.cookie;
  const splitCookie = cookies.split('; ' + name + '=');
  if (splitCookie.length === 2) return splitCookie.pop();
  return undefined
}

module.exports.getCookie = getCookie;

/* Delete cookie by name
 * @param {string} the name of cookie to delete
 * @return {undefined} returns only if cookie not found
 */
const deleteCookie = (name) => {
  if(getCookie(name)) {
    document.cookie = name+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
  } else {
    return undefined;
  }
}

module.exports.deleteCookie = deleteCookie;

/* Get and parse user object from cookie
 * @return {object/null} returns user object/ null if no user cookie is set
 */
const getUser = () => {
  const user = getCookie('user');
  if(!user) return null;
  return JSON.parse(unescape(user));
}

module.exports.getUser = getUser;

const createQueryString = (obj) => {
  return Object.keys(obj).reduce((prev, current) => {
    if(Array.isArray(obj[current]) && obj[current].length > 0) {
      if (prev !== '?') {
        prev += `&${current}=${obj[current].join(',')}`;
      } else {
        prev += `${current}=${obj[current].join(',')}`;
      }
    } else if (obj[current] && !Array.isArray(obj[current])) {
      if (prev !== '?') {
        prev += `&${current}=${obj[current]}`;
      } else {
        prev += `${current}=${obj[current]}`;
      }
    }

    return prev;
  }, '?');
}

module.exports.createQueryString = createQueryString;

const decodeQueryString = (queryString) => {
  const queryArr = queryString.replace('?', '').split('&');
  let queryObj = {};
  queryArr.forEach(item => {
    const parts = item.split('=');
    if(parts[1].includes(',')) {
      queryObj[parts[0]] = parts[1].split(',');
    } else {
      queryObj[parts[0]] = parts[1];
    }
  });
  return queryObj;
}

module.exports.decodeQueryString = decodeQueryString;
