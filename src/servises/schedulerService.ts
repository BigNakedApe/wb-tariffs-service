```typescript
import { schedule } from 'node-cron';
import db from '../db';
import { WBApiService } from './wbApiService';
import { GoogleSheetsService } from './googleSheetsService';
import { Tariff } from '../types';

// Сервис для планирования задач
export class SchedulerService {
  private wbApiService: WBApiService;
  private googleSheetsService: GoogleSheetsService;

  constructor() {
    this.wbApiService = new WBApiService();
    this.googleSheetsService = new GoogleSheetsService();
  }

  // Запуск планировщика
  start(): void {
    // Запуск задачи каждый час
    schedule('0 * * * *', async () => {
      await this.fetchAndStoreTariffs();
      await this.googleSheetsService.updateSheets();
    });

    // Первоначальный запуск
    this.fetchAndStoreTariffs();
    this.googleSheetsService.updateSheets();
  }

  // Получение и сохранение тарифов
  private async fetchAndStoreTariffs(): Promise<void> {
    try {
      const tariffs = await this.wbApiService.fetchTariffs();
      const currentDate = new Date().toISOString().split('T')[0];

      for (const tariff of tariffs) {
        await db<Tariff>('tariffs')
          .insert({
            date: currentDate,
            warehouse_name: tariff.warehouseName,
            box_delivery: tariff.boxDelivery,
            box_return: tariff.boxReturn,
            box_monetary: tariff.boxMonetary,
            coefficient: tariff.coefficient,
          })
          .onConflict(['date', 'warehouse_name'])
          .merge(['box_delivery', 'box_return', 'box_monetary', 'coefficient', 'updated_at']);
      }
    } catch (error) {
      console.error('Ошибка в запланированной задаче:', error);
    }
  }
}
```