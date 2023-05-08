import axios from "axios";
import LocalStorageService from "./LocalStorageService";
import { Route } from "react-router-dom";

const urlApiBase = 'https://localhost:44340/api';

const getClient = baseUrl => {

  const localStorageService = LocalStorageService.getService();

  const options = {
    baseURL: baseUrl
  };

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    config => {
      const token = localStorageService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer '+token;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  //Add a response interceptors
  client.interceptors.response.use(
    response => {
      return response;
    },
    function(error) {
      var erro = "" +error;
      if(erro.includes('Network')){
        console.log(erro.includes('Network'));
        return Promise.reject(erro);
      }      

      const originalRequest = error.config;

      if (error.response.status === 401 && originalRequest.url === baseUrl + "/token")
      {
        Route.push("/login");
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return axios
          .post(baseUrl + "/token", {
            username: "teste",
            email: "teste@teste.com",
            grant_type: "password",
            password: "pass"
          })
          .then(res => {
            if (res.status === 201 || res.status === 200) {
              localStorageService.setToken(res.data.token);
              axios.defaults.headers.common["Authorization"] = 'Bearer '+res.data.token;
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );

  return client;
};

class ApiClient {
  constructor(baseUrl = urlApiBase) {
    this.client = getClient(baseUrl);
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    return getClient()
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  delete(url, conf = {}) {
    return getClient()
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  head(url, conf = {}) {
    return getClient()
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  options(url, conf = {}) {
    return getClient()
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  post(url, data = {}, conf = {}) {
    return getClient()
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  put(url, data = {}, conf = {}) {
    return getClient()
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  patch(url, data = {}, conf = {}) {
    return getClient()
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
