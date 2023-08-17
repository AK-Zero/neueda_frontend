export interface Order {
    id: number;
    stockTicker: string;
    price: number;
    volume: number;
    buyOrSell: String;
    statusCode: String;
  }