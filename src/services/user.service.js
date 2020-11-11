import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://10.102.0.1:5050/';
let API_URL = 'http://eng-test.24x7tools.com:5050/';
//const API_URL = 'https://newenginedb.herokuapp.com/';
//const API_URL = 'http://localhost:5050/';
//const API_URL = 'http://10.102.200.11:5050/';

//user = JSON.parse(localStorage.getItem('user'));
class UserService {



  getPublicContent() {
    return axios.get(API_URL + 'all' );
  }

  getUserBoard() {
    return axios.get(API_URL + 'user' , { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();