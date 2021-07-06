export const sendLogs = body =>
  fetch('https://analytics.atlassian.com/analytics/events', {
    method: 'POST',
    headers: {
      Accept: 'application/json, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
