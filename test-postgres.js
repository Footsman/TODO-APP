const { Client } = require('pg');

async function testPostgresConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'footsman',
    password: 'Warcraft1776!',
    database: 'todos'
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL successfully!');
    
    // Test query
    const result = await client.query('SELECT version();');
    console.log('📊 PostgreSQL version:', result.rows[0].version.split(',')[0]);
    
    // Check if tables exist
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);
    console.log('📋 Tables in database:', tables.rows.map(row => row.table_name));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await client.end();
  }
}

testPostgresConnection();