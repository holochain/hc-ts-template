
export const fetchPOST = (url: string, data?: any, extraPayload?: any): Promise<any> => {
  extraPayload = extraPayload || {}
  return fetch(url, {
    ...extraPayload,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
  }).then(r => r.json())
}
