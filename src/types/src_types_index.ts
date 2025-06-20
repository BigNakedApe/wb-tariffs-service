```typescript
// Тип для данных, получаемых из API Wildberries
export interface WBTariff {
  warehouseName: string;
  boxDelivery: number;
  boxReturn: number;
  boxMonetary: number;
  coefficient: number;
}

// Тип для данных в базе данных
export interface Tariff {
  id?: number;
  date: string;
  warehouse_name: string;
  box_delivery: number;
  box_return: number;
  box_monetary: number;
  coefficient: number;
  created_at?: string;
  updated_at?: string;
}
```