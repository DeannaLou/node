export default (url, params) => {
  return fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(params), // data can be `string` or {object}!
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(res => {
          if (+res.status === 1) {
            return res.data;
          }
          console.error((res.data && res.data.message) || '操作失败');
        });
      }
      console.error(response);
    })
    .catch(error => console.error('Error:', error));
};
