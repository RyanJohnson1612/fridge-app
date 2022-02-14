import { auth, getCookie } from './helpers';

describe('#auth', () => {
  it('should return user object if logged in', () => {
    document.cookie='user={"id": 1, "email": "jim@testman.com", "firstName": "Jim", "lastName": "Testman"}';
    expect(auth()).toMatchObject({id: 1, email: 'jim@testman.com', firstName: 'Jim', lastName: 'Testman'});
  });

  it('should return null if not logged in', () => {
    // Remove all cookies
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    expect(auth()).toBeNull();
  });
});

describe('#getCookie', () => {
  it('should return a cookie if it exists',() => {
    document.cookie='test=this is a test cookie';
    expect(getCookie('test')).toBe('this is a test cookie')
  })
})
