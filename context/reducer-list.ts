import { ListItem, ListState } from "./context-types";

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

export const initialListState: ListState = {
    total: 10.0,
    tax: 30.0,
    items: [],
    totalQuantity: 0,
    subtotal: 40.0,
};

export function listReducer(state: ListState, action: ListActions) {
    switch (action.type) {
        case ListActionType.AddItem:
            const s = {
                ...state,
            };

            const existing = s.items.find((itm : ListItem) => {
                return itm.id === action.payload.id
            });

            if(existing) {
                existing.quantity++;
            }
            else {
                s.items.push(action.payload);
            }

            const totalCount = s.items.reduce((prev : number, curr : ListItem) => {
                return prev + curr.quantity;
            },0);

            s.totalQuantity = totalCount;


            return s;
        default:
            return state;
    }
}
