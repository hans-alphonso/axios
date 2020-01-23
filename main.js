// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// AXIOS INSTANCES
// Using this you don't have to write the baseURL all the time
const axiosInstances = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

function usingAxiosIstances() {
  axiosInstances
    .get('/comments')
    .then(res => showOutput(res));
}

// GET REQUEST
function getTodos() {
  // console.log('GET Request');
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  // // Shorter way of the above
  // axios.get('https://jsonplaceholder.typicode.com/todos', {
  //     params: { _limit: 5 }
  //   })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  // Even shorter way of the above and using the 'get' makes the code more defintive
  // axios
  //   .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  // // Even more shorter way of the above as 'get' is default in axios
  // axios('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  // Using axiosInstances for baseURL
  // axiosInstances
  //   .get('/todos?_limit=5')
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  // Using a timeout to get data back
  axiosInstances
    .get('/todos?_limit=5', {timeout: 5000})
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  // console.log('POST Request');

  // axios({
  //   method: 'post',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   data: {
  //     userId: 300,
  //     title: 'New Todo',
  //     completed: false
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  // Shorter version
  axios
    .post('https://jsonplaceholder.typicode.com/todos',
      {
        userId: 300,
        title: 'New Todo',
        completed: false
      }
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log('PUT/PATCH Request');

  // // put request NOTE: does not return userId
  // axios
  //   .put('https://jsonplaceholder.typicode.com/todos/1', {
  //       title: 'Updated Todo',
  //       completed: true
  //   })
  //   .then(res => showOutput(res))
  //   .catch(err => console.log(err));

  // patch request NOTE: does return userId
  axios
    .patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  // console.log('DELETE Request');

  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOS DATA
function getData() {
  // console.log('Simultaneous Request');

  // axios.all([
  //   axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3'),
  //   axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3')
  // ])
  //   .then(res => {
  //     console.log(res[0]);
  //     console.log(res[1]);
  //     showOutput(res[0]);
  //   })
  //   .catch(err => console.error(err));

  // A better way using 'spread()'
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3')
  ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log('Custom Headers');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  }

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos', 
      {
        userId: 300,
        title: 'New Todo',
        completed: false
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log('Transform Response');

  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();

      return data;
    })
  }

  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  // console.log('Error Handling');

  // NOTE: get request has wrong address so we get a 404 on purpose to test this
  // axios
  //   .get('https://jsonplaceholder.typicode.com/todoss')

  axios
    .get('https://jsonplaceholder.typicode.com/todoss', {
      validateStatus: function(status) {
        // Reject only if status is greater or equal to 500
        return status < 500;
      }
    })
    .then(res => showOutput(res))
    .catch(err => {
      if(err.response) {
        // Server responded with a status other than 200 range
        console.log('// ERROR HANDLING');
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        console.log('// END...')

        if(err.response.status === 404) {
          alert('ERROR 404: Page not found');
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  // console.log('Cancel Token');

  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=3', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if(axios.isCancel(thrown)) {
        console.log('Request canceled!!!', thrown.message);
      }
    });

    if(true) {
      source.cancel('\nRequest canceled!');
    }
}


// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  // Every time you make a request you now get a console.log of it through interceptors
  // You can format new Date().getTime() better if you wish
  console.log('// INTERCEPTING REQUESTS & RESPONSES');
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().toLocaleTimeString()}`);
  console.log('// END...');
  
  return config
},
error => {
  return Promise.reject(error);
});

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>

    <div class="card mt-3">
      <div class="card-header bg-info text-white border border-dark">
        Headers
      </div>
      <div class="card-body border border-dark border-top-0">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header bg-info text-white border border-dark">
        Data
      </div>
      <div class="card-body border border-dark border-top-0">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header bg-info text-white border border-dark">
        Config
      </div>
      <div class="card-body border border-dark border-top-0">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `
}


// Event liseners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
document.getElementById('axiosInstances').addEventListener('click', usingAxiosIstances);
