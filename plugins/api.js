const fetchSync = require('sync-fetch');


export default function ({ $axios, $log, store }, inject) {
  $axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
  $axios.defaults.headers.patch['Content-Type'] = 'application/json; charset=utf-8';

  if (process.client) {
    console.log('on client console')
    $log.error('on client $log')
  }

  // Change URL only for server
  if (process.server) {
    console.log('on server console')
  }

  inject('api', new BudAxios($axios, process.env.API_ENDPOINT));
  inject('bff', new BudAxios($axios, process.env.BFF_ENDPOINT));
}

class BudAxios {
  endpoint;
  axios;

  constructor (axios, url) {
    this.axios = axios;
    this.endpoint = url;
  }

  get(url, context = undefined) {
    const headers = this.getAuthHeader(context);
    if (this.endpoint === 'BFF') {
      return this.axios.get(`${this.endpoint}${url}`, headers);
    } else {
      return this.axios.get(`${API_ENDPOINT}${url}`, headers);
    }
  }

  post(url, body, context, jwt, progress) {
    const headers = this.getAuthHeader(context, jwt, progress);
    if (this.endpoint === 'BFF') {
      return this.axios.post(`${this.endpoint}${url}`, body, headers);
    } else {
      return this.axios.post(`${API_ENDPOINT}${url}`, body, headers);
    }
  }

  put(url, body, context, jwt) {
    const headers = this.getAuthHeader(context, jwt);
    if (this.endpoint === 'BFF') {
      return this.axios.put(`${this.endpoint}${url}`, body, headers);
    } else {
      return this.axios.put(`${API_ENDPOINT}${url}`, body, headers);
    }
  }

  patch(url, body, context, jwt) {
    const headers = this.getAuthHeader(context, jwt);
    if (this.endpoint === 'BFF') {
      return this.axios.patch(`${this.endpoint}${url}`, body, headers);
    } else {
      return this.axios.patch(`${API_ENDPOINT}${url}`, body, headers);
    }
  }

  remove(url, body, context, jwt) {
    const headers = this.getAuthHeader(context, jwt);
    if (this.endpoint === 'BFF') {
      return this.axios.delete(`${this.endpoint}${url}`, headers);
    } else {
      return this.axios.delete(`${API_ENDPOINT}${url}`, headers);
    }
  }

  getSync(url, context = undefined) {
    const headers = this.getAuthHeader(context);
    if (this.endpoint === 'BFF') {
      return fetchSync(`${this.endpoint}${url}`, headers);
    } else {
      return fetchSync(`${API_ENDPOINT}${url}`, headers);
    }
  }

  getAuthHeader(context, jwt = undefined, onUploadProgress) {
    const config = (onUploadProgress) ? { headers: {}, onUploadProgress } : { headers: {} };
    if (jwt) {
      config.headers.Authorization = `bearer ${jwt}`;
    } else if (context && context.rootState.users.userToken) {
      config.headers.Authorization = `bearer ${context.rootState.users.userToken}`;
    }
    return config;
  }
}
