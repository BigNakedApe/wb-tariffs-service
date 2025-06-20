```typescript
import { SchedulerService } from './services/schedulerService';
import db from './db';

// Основная функция запуска приложения
async function main() {
  try {
    // Выполняем миграции базы данных
    await db.migrate.latest();
    // Запускаем сервис планировщика
    const scheduler = new SchedulerService();
    scheduler.start();
    console.log('Приложение успешно запущено');
  } catch (error) {
    console.error('Ошибка при запуске приложения:', error);
    process.exit(1);
  }
}

main();
```