```typescript
import knex from 'knex';

// Настройка подключения к PostgreSQL через Knex.js
const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  migrations: {
    directory: './migrations',
  },
});

export default db;
```