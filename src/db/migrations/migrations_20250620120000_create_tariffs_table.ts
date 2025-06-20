```typescript
import { Knex } from 'knex';

// Миграция для создания таблицы tariffs
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tariffs', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable(); // Дата тарифа
    table.string('warehouse_name').notNullable(); // Название склада
    table.integer('box_delivery').notNullable(); // Стоимость доставки
    table.integer('box_return').notNullable(); // Стоимость возврата
    table.integer('box_monetary').notNullable(); // Монетарная стоимость
    table.integer('coefficient').notNullable(); // Коэффициент
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Время создания
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Время обновления
    table.unique(['date', 'warehouse_name']); // Уникальный ключ для пары date и warehouse_name
  });
}

// Откат миграции
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tariffs');
}
```