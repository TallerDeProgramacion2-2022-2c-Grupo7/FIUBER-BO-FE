import makeRequest from './base';

const { REACT_APP_TRIPS_URL } = process.env;
const request = async (args) => makeRequest({ baseURL: REACT_APP_TRIPS_URL, ...args });

const getPricingRule = async (user) => request({ user, method: 'GET', endpoint: '/rules' });

const getPricing = async (user, rulesParams, tripParams) => request({
  user, method: 'POST', endpoint: '/rules', bodyParams: { rulesParams, tripParams },
});

const updatePricingRules = async (user, rules) => request({
  user, method: 'POST', endpoint: '/rules', bodyParams: rules,
});

export { getPricingRule, getPricing, updatePricingRules };
