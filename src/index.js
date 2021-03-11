const express = require('express');

const app = express();

app.use(express.json());

// Recurso salvo em memória
let data = [
  'Curso 1',
  'Curso 2',
  'Curso 3'
]

app.get('/courses', (request, response) => {
  const query = request.query;

  console.log(query);

  return response.json(data);
});

app.post('/courses', (request, response) => {
  const { name } = request.body;

  if(!name) {
    return response.status(400).json({ message: 'Invalid course name!!' });
  }

  data.push(name);
  return response.json(data);
});

app.put('/courses/:id', (request, response) => {
  const { name } = request.body;
  const { id } = request.params;

  if(!name) {
    return response.status(400).json({ message: 'Invalid course name!!' });
  }

  data[id] = name;

  
  return response.json(data);
});

app.patch('/courses/:id', (request, response) => {
  const { name } = request.body;
  const { id } = request.params;

  if(!name) {
    return response.status(400).json({ message: 'Invalid course name!!' })
  }

  data[id] = name;
  return response.json(data);
});

app.delete('/courses/:id', (request, response) => {
  const { id } = request.params;

  data = data.filter((course, i, array) => array.indexOf(course) !== id);
  return response.json(data);
});



app.listen(3333, () => console.log('Server is Running'));