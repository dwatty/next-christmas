export type UiState = {
    isListOpen: boolean;    
}

export type ListState = {
    subtotal: number;    
    tax: number;
    total: number;
    items: ListItem[];
}

export type ListItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}