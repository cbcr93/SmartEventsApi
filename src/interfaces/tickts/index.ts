export interface ICreateTicket {
    title: string;
    price: number;
    description: string;
    amounts: number;
    category: string;
    userId: string;
}

export interface IUpdateTicket {
    title?: string;
    price?: number;
    description?: string;
    amounts?: number;
    category?: string;
    id: string;
}