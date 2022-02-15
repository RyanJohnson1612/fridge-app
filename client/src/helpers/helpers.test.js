import { getUser, getCookie, deleteCookie } from './helpers';

beforeEach(() => {
  // deletes all cookies
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
})

describe('#auth', () => {
  it('should return user object if logged in', () => {
    document.cookie='user={"id": 1, "email": "jim@testman.com", "firstName": "Jim", "lastName": "Testman"}';
    expect(getUser()).toMatchObject({id: 1, email: 'jim@testman.com', firstName: 'Jim', lastName: 'Testman'});
  });

  it('should return null if not logged in', () => {
    expect(getUser()).toBeNull();
  });
});

describe('#getCookie', () => {
  it('should return a cookie if it exists',() => {
    document.cookie='test=this is a test cookie';
    expect(getCookie('test')).toBe('this is a test cookie');
  });
});

describe('#deleteCookie', () => {
  it('should delete a cookie if it exists',() => {
    document.cookie='test=this is a test cookie';
    deleteCookie('test');
    expect(getCookie('test')).toBeUndefined();
  });

  it('should return undefined cookie if doesn\'t exists',() => {
    expect(deleteCookie('test')).toBeUndefined();
  });
});
