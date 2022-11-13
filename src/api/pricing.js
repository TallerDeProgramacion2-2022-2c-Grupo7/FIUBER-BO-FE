const { REACT_APP_TRIPS_URL } = process.env;

const makeRequest = async ({
  baseURL, method, endpoint = '', queryParams, bodyParams, user,
}) => {
  const response = await fetch(`${baseURL}${endpoint}?${new URLSearchParams(queryParams)}`, {
    method,
    headers: new Headers({ Authorization: `${user.stsTokenManager.accessToken}` }),
    body: JSON.stringify(bodyParams),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  return data?.result;
};

const request = async (args) => makeRequest({ baseURL: REACT_APP_TRIPS_URL, ...args });

const getPricingRule = async (user) => request({ user, method: 'GET', endpoint: '/rules' });

const getPricing = async (user, rulesParams, tripParams) => request({
  user, method: 'POST', endpoint: '/rules', bodyParams: { rulesParams, tripParams },
});

const updatePricingRules = async (user, rules) => request({
  user, method: 'POST', endpoint: '/rules', bodyParams: rules,
});

export { getPricingRule, getPricing, updatePricingRules };
