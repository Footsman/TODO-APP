const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.send(todos);
}); 

app.post('/todos', async (req, res) => {
  const {title} = req.body;
  res.json(title);
}); 

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  res.json({ id, title });
});

app.delete('/todos/:id', async(req, res) => {
  
  const { id } = req.params;
  res.json(id);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});