import makeRequest from './base';

const { REACT_APP_USERS_URL } = process.env;
const request = async (args) => makeRequest({ baseURL: REACT_APP_USERS_URL, ...args });

const list = async (user, params) => request({ user, method: 'GET', queryParams: params });

const get = async (user, uid) => request({ user, method: 'GET', endpoint: `/${uid}` });

const block = async (user, uid) => request({
  user, method: 'PATCH', endpoint: `/${uid}`, queryParams: { active: false },
});

const unblock = async (user, uid) => request({
  user, method: 'PATCH', endpoint: `/${uid}`, queryParams: { active: true },
});

export default {
  list,
  get,
  block,
  unblock,
};
