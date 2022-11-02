const makeRequest = async ({
  baseURL, method, endpoint = '', queryParams, bodyParams, user,
}) => {
  const response = await fetch(`${baseURL}${endpoint}?${new URLSearchParams(queryParams)}`, {
    method,
    headers: new Headers({ Authorization: `Bearer ${user.stsTokenManager.accessToken}` }),
    body: JSON.stringify(bodyParams),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  return data?.result;
};

export default makeRequest;
