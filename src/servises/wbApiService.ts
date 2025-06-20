```typescript
import axios from 'axios';
import { WBTariff } from '../types';

// Сервис для работы с API Wildberries
export class WBApiService {
  private readonly apiUrl = 'https://common-api.wildberries.ru/api/v1/tariffs/box';
  private readonly token: string;

  constructor() {
    this.token = process.env.WB_API_TOKEN || '';
    if (!this.token) {
      throw new Error('WB_API_TOKEN не указан');
    }
  }

  // Получение тарифов из API
  async fetchTariffs(): Promise<WBTariff[]> {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении тарифов WB:', error);
      throw error;
    }
  }
}
```