const getCookie = (name) => {
  var cookies = '; ' + document.cookie;
  var splitCookie = cookies.split('; ' + name + '=');
  if (splitCookie.length === 2) return splitCookie.pop();
}

module.exports.getCookie = getCookie;

const auth = () => {
  const user = getCookie('user');
  if(!user) return null;
  return JSON.parse(unescape(user));
}

module.exports.auth = auth;
