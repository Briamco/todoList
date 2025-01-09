// Importar dependencias
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Base de datos simulada
let todos = [
    {
        id: 1,
        title: 'hola',
    }
];
let currentId = 1;

// Obtener todos los To-Dos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Obtener un To-Do por ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'To-Do no encontrado' });
  }

  res.json(todo);
});

// Crear un nuevo To-Do
app.post('/todos', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const newTodo = {
    id: currentId++,
    title,
    description: description || '',
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Actualizar un To-Do
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, completed } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'To-Do no encontrado' });
  }

  const updatedTodo = {
    ...todos[todoIndex],
    title: title || todos[todoIndex].title,
    description: description || todos[todoIndex].description,
    completed: completed !== undefined ? completed : todos[todoIndex].completed
  };

  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

// Eliminar un To-Do
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'To-Do no encontrado' });
  }

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
