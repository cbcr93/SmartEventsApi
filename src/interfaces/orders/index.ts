export interface ICreateOrder {
    ticketId: string;
    userId: string;
    amountBuy: number;
}

export interface IUpdateOrder {
    id: string;
    isPaid: boolean;
} 