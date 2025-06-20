```markdown
# Сервис тарифов Wildberries

Сервис для получения тарифов Wildberries, их хранения в PostgreSQL и обновления Google Sheets.

## Требования
- Docker и Docker Compose
- Токен API Wildberries
- Учетные данные Google Service Account
- Идентификаторы Google Sheets

## Установка
1. Склонируйте репозиторий
2. Скопируйте `.env.example` в `.env` и заполните:
   - `WB_API_TOKEN`: Токен API Wildberries
   - `GOOGLE_SHEETS_CREDENTIALS`: JSON учетных данных Google Service Account
   - `GOOGLE_SHEET_IDS`: Список идентификаторов Google Sheets, разделенных запятыми
3. Выполните `docker compose up`

## Проверка работоспособности
1. Проверьте таблицу `tariffs` в PostgreSQL на наличие обновленных данных
2. Проверьте Google Sheets (лист `stocks_coefs`) на наличие отсортированных данных
3. Проверьте логи контейнера на наличие ошибок

## Примечания
- Сервис обновляет данные каждый час
- Миграции базы данных применяются автоматически
- Тарифы сохраняются по дням, обновления перезаписывают данные за тот же день
- Данные в Google Sheets сортируются по возрастанию коэффициента

## Структура проекта
- `src/db/` - Конфигурация базы данных и миграции
- `src/services/` - Логика работы с API, Google Sheets и планировщиком
- `src/types/` - Определения типов
- `docker-compose.yml` - Конфигурация Docker
- `.env.example` - Пример файла конфигурации
```