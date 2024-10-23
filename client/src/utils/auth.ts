import { jwtDecode } from 'jwt-decode';

interface MyJwtPayload {
  exp?: number;
}

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
    return jwtDecode<MyJwtPayload>(token);
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
   return !!this.getToken();
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded = jwtDecode<MyJwtPayload>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
      window.location.assign('/');
    }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
