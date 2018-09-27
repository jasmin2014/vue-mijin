import axios from 'axios';
import {
  Loading,
  Message,
  Notification
} from 'element-ui';
import Utils from './method';

function createHttpInstance(baseURL) {
  const http = axios.create({
    baseURL: '/api/' + baseURL,
    timeout: 30000
  });

  // http请求拦截器
  let loadingInstance;

  http.interceptors.request.use(config => {
    // element ui Loading方法
    if (!loadingInstance || !document.querySelector('.el-loading-mask')) {
      loadingInstance = window.loadingInstance = Loading.service({
        fullscreen: true,
        background: 'rgba(255,255,255,.4)'
      });
    }
    if (Utils.$getLocalStorage('token')) {
      config.headers['Authorization'] = Utils.$getLocalStorage('token');
      // if (!config.headers['X-Action-Code'] && Utils.$getLocalStorage('action')) {
      //   config.headers['X-Action-Code'] = Utils.$getLocalStorage('action');
      // }
    }
    if (config.method === 'get') {
      config.params = {
        _t: new Date().getTime(),
        ...config.params
      }
    }
    return config;
  }, () => {
    setTimeout(() => {
      loadingInstance.close();
    });
    Notification.error({
      title: '错误',
      message: '加载超时',
      offset: 80
    });
    return Promise.reject()
  });
  // http响应拦截器
  http.interceptors.response.use(data => { // 响应成功关闭loading
    setTimeout(() => {
      loadingInstance.close();
    });
    return data;
  }, error => {
    setTimeout(() => {
      loadingInstance.close();
    });
    const response = error.response;
    if (response) {
      if (response.data instanceof Blob) {
        const fr = new FileReader();
        fr.onload = function () {
          if (typeof this.result === 'string') {
            response.data = JSON.parse(this.result);
          }
          errorHandler(response)
        };
        fr.readAsText(response.data);
      } else {
        errorHandler(response)
      }
    }
    return Promise.reject(response);
  });
  return http;
}

function errorHandler(response) {
  switch (response.status) {
    case 401:
      Utils.$removeLocalStorage('token');
      Utils.$removeLocalStorage('user');
      Message({
        message: "账号登陆状态失效，请重新登陆",
        type: 'error'
      });
      this.$router.push({
        name: "LoginPage"
      })
      break;
    case 400:
      if (response.data && response.data.type === 'object') {
        const message = [];
        for (const k in response.data.body) {
          message.push(`<p>${response.data.body[k]}</p>`)
        }
        Message({
          message: message.join('\n'),
          type: 'error',
          dangerouslyUseHTMLString: true
        })
      } else if (response.data && response.data.message) {
        Message({
          message: response.data.message,
          type: 'error'
        });
      }
      break;
    case 409:
      if (response.data && response.data.message) {
        Message({
          message: response.data.message,
          type: 'error'
        });
      }
      break;
    case 500:
      Notification.error({
        title: '错误',
        message: '服务器错误',
        offset: 80
      });
      break;
    default:
      if (response.data && response.data.message) {
        Message({
          message: response.data.message,
          type: 'error'
        });
      }
      break;
  }
  // location.reload();
}

export default {
  common: createHttpInstance('common/'),
  admin: createHttpInstance('admin/')
}
