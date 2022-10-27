// import { useAuth } from '../contexts/Auth';

const { REACT_APP_PRICING_URL } = process.env;

const getPricingRule = async (user) => {
  // const { user } = useAuth();
  const response = await fetch(`${REACT_APP_PRICING_URL}/rules`, {
    method: 'GET',
    headers: new Headers({
      Authorization: user.stsTokenManager.accessToken,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  return data.result;
};

const getPricing = async (user, rules, { from, to }) => {
  // const { user } = useAuth();
  const response = await fetch(`${REACT_APP_PRICING_URL}/costs/calculate`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: user.stsTokenManager.accessToken,
    }),
    body: JSON.stringify({ rules, from, to }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  return data.result;
};

export { getPricingRule, getPricing };
