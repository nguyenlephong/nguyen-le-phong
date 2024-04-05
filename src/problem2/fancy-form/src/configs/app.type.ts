export type SwapFormDataType = {
  amountToSend: number
  amountToReceive: number
  fromCurrency: string
  toCurrency: string
}

export type PriceItemType = {
  currency: string
  price: number
  date: Date | string
}

declare global {
  interface Window { VANTA: any; }
}
