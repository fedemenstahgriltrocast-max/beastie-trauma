export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface OrderTotals {
  subtotal: number;
  vat: number;
  delivery: number;
  total: number;
}

export interface OrderPayload {
  id: string;
  at: string;
  items: Array<{
    id: string;
    name: string;
    qty: number;
    unitPrice: number;
    amount: number;
  }>;
  totals: OrderTotals;
  vatRate: number;
  deliveryFee: number;
  address: {
    line1: string;
    line2?: string;
    gps?: {
      lat: number;
      lon: number;
      accuracy?: number;
    } | null;
  };
  channel: 'web' | 'mobile';
  currency: 'USD' | 'EUR' | 'GBP' | 'OTHER';
}
