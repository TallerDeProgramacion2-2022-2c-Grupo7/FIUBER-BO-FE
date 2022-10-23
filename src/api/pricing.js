// import { useAuth } from '../contexts/Auth';

const { REACT_APP_PRICING_URL } = process.env;

const getPricingRule = async (user) => {
  // const { user } = useAuth();
  const response = await fetch(`${REACT_APP_PRICING_URL}/rules`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  return data.result;
};

const getPricing = async (user, rules, trip) => {
  // const { user } = useAuth();
  const response = await fetch(`${REACT_APP_PRICING_URL}/`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
    }),
    body: JSON.stringify({ rules, trip }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  return data.result;
};

export { getPricingRule, getPricing };
