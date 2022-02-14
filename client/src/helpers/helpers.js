const getCookie = (name) => {
  const cookies = '; ' + document.cookie;
  const splitCookie = cookies.split('; ' + name + '=');
  if (splitCookie.length === 2) return splitCookie.pop();
}

module.exports.getCookie = getCookie;

const deleteCookie = (name) => {
  if(getCookie(name)) {
    document.cookie = name+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
  } else {
    return undefined;
  }
}

module.exports.deleteCookie = deleteCookie;

const auth = () => {
  const user = getCookie('user');
  if(!user) return null;
  return JSON.parse(unescape(user));
}

module.exports.auth = auth;
