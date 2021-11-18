import { ListState } from "./context-types";

export enum ListActionType {
    AddItem,
    RemoveItem,
    IncreaseQuantity,
    DecrementQuantity,
}

export interface AddItem {
    type: ListActionType.AddItem;
    payload: any;
}

export interface RemoveItem {
    type: ListActionType.RemoveItem;
    payload: any;
}

export interface IncrementQuantity {
    type: ListActionType.IncreaseQuantity;
}

export interface DecrementQuantity {
    type: ListActionType.DecrementQuantity;
}

export type ListActions = AddItem | RemoveItem;

export const initialListState : ListState = {
    total: 10.00,
    tax: 30.00,
    items: [{
        id: '1',
        name: 'Switch',
        price: 100.00,
        quantity: 1
    }],
    subtotal: 40.00
}

export function listReducer(state: ListState, action: ListActions) {
    switch (action.type) {
        case ListActionType.AddItem:
            return {...state};
        default:
            return state;
    }
}
