```typescript
import { google } from 'googleapis';
import { Tariff } from '../types';
import db from '../db';

// Сервис для работы с Google Sheets
export class GoogleSheetsService {
  private sheets = google.sheets('v4');
  private auth: any;

  constructor() {
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || '{}');
    this.auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
  }

  // Обновление всех указанных Google Sheets
  async updateSheets(): Promise<void> {
    const sheetIds = (process.env.GOOGLE_SHEET_IDS || '').split(',');
    const tariffs = await db<Tariff>('tariffs')
      .select()
      .where('date', new Date().toISOString().split('T')[0])
      .orderBy('coefficient', 'asc');

    for (const sheetId of sheetIds) {
      await this.updateSheet(sheetId, tariffs);
    }
  }

  // Обновление конкретной таблицы
  private async updateSheet(sheetId: string, tariffs: Tariff[]): Promise<void> {
    const values = [
      ['Warehouse Name', 'Box Delivery', 'Box Return', 'Box Monetary', 'Coefficient'],
      ...tariffs.map(t => [
        t.warehouse_name,
        t.box_delivery,
        t.box_return,
        t.box_monetary,
        t.coefficient,
      ]),
    ];

    await this.sheets.spreadsheets.values.update({
      auth: this.auth,
      spreadsheetId: sheetId,
      range: 'stocks_coefs!A1:E',
      valueInputOption: 'RAW',
      requestBody: { values },
    });
  }
}
```