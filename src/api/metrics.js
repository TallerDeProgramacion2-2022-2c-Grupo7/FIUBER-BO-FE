import makeRequest from './base';

const { REACT_APP_METRICS_URL } = process.env;
const request = async (args) => makeRequest({ baseURL: REACT_APP_METRICS_URL, ...args });

const listRecentEvents = async (user, maxResults) => {
  const events = await request({
    user, method: 'GET', queryParams: { max_results: maxResults },
  });
  return events.map((event) => ({
    id: event.event_id,
    fields: [event.datetime, event.user_id, event.event_type],
  }));
};

const createEvent = async (user, eventType, uid) => request({
  user, method: 'POST', endpoint: `/${eventType}`, queryParams: { uid },
});

const getStats = async (user) => request({
  user, method: 'GET', endpoint: '/stats',
});

const getUsersSummary = async (user) => request({
  user, method: 'GET', endpoint: '/usersSummary',
});

export default {
  listRecentEvents,
  createEvent,
  getStats,
  getUsersSummary,
};
