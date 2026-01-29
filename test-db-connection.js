const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Test connection with a simple query
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Count todos to verify table exists
    const todoCount = await prisma.todo.count();
    console.log(`📝 Current todos count: ${todoCount}`);
    
    // Create a test todo
    const newTodo = await prisma.todo.create({
      data: {
        title: 'Test database connection',
        completed: false
      }
    });
    console.log(`✨ Created test todo: ${newTodo.title}`);
    
    // Get all todos
    const todos = await prisma.todo.findMany();
    console.log(`📋 All todos: ${todos.length}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();