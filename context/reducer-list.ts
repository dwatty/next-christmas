import { ListItem, ListState } from "./context-types";

export enum ListActionType {
    AddItem,
    RemoveItem,
    ClearList,
    IncreaseQuantity,
    DecreaseQuantity,
}

export interface AddItem {
    type: ListActionType.AddItem;
    payload: any;
}

export interface RemoveItem {
    type: ListActionType.RemoveItem;
    payload: any;
}

export interface ClearList {
    type: ListActionType.ClearList;
}

export interface IncreaseQuantity {
    type: ListActionType.IncreaseQuantity;
    payload: string;
}

export interface DecreaseQuantity {
    type: ListActionType.DecreaseQuantity;
    payload: string;
}

export type ListActions = AddItem | RemoveItem | ClearList | IncreaseQuantity | DecreaseQuantity;

export const initialListState: ListState = {
    total: 0.0,
    tax: 0.0,
    items: [],
    totalQuantity: 0,
    subtotal: 0.0,
};

export function listReducer(state: ListState, action: ListActions) {
    switch (action.type) {
        case ListActionType.AddItem:
            return addItem(state, action);
        case ListActionType.ClearList:
            return clearItems(state);
        case ListActionType.IncreaseQuantity:
            return increaseQuantity(state, action);
        case ListActionType.DecreaseQuantity:
            return decreaseQuantity(state, action);
        default:
            return state;
    }
}

/**
 * Add the provided item to the list.  If the item already
 * exists in the list, then increment the quantity instead
 * @param state The ListState to change
 * @param action The payload with the new item
 * @returns A new state object with the item added
 */
const addItem = (state: ListState, action: AddItem) => {
    const s = { ...state };

    const existing = s.items.find((itm: ListItem) => {
        return itm.id === action.payload.id;
    });

    existing ? existing.quantity++ : s.items.push(action.payload);
    updateComputeds(s);

    return s;
};

/**
 * Empty the list out
 * @param state The state to change
 * @returns A new state object with the item added
 */
const clearItems = (state: ListState) => {
    const s = { ...state };
    
    s.items = [];
    updateComputeds(s);

    return s;
};

/**
 * Update the provided list item's ID by 1
 * @param state The state to change
 * @param action The action with an ID payload
 * @returns The updated state
 */
const increaseQuantity = (state : ListState, action : IncreaseQuantity) => {
    const s = {...state};

    const idx = s.items.findIndex((itm : ListItem) => {
        return itm.id === action.payload;
    })

    if(idx > -1) {
        s.items[idx].quantity++;
    }

    updateComputeds(s);

    return s;
};

/**
 * Decrease the provided list item's ID by 1
 * @param state The state to change
 * @param action The action with an ID payload
 * @returns The updated state
 */
 const decreaseQuantity = (state : ListState, action : DecreaseQuantity) => {
    const s = {...state};

    const idx = s.items.findIndex((itm : ListItem) => {
        return itm.id === action.payload;
    })

    if(idx > -1) {
        s.items[idx].quantity === 1 
            ? s.items.splice(idx,1) 
            : s.items[idx].quantity--;
    }

    updateComputeds(s);

    return s;
};

/**
 * Update a variety of computed properties on the object
 * @param state The state to base the recomputations on
 */
const updateComputeds = (state: ListState) => {
    state.totalQuantity = state.items.reduce((prev: number, curr: ListItem) => {
        return prev + curr.quantity;
    }, 0);

    recalculatePrices(state);
};

/**
 * Determine the pricing info for the provided items
 * @param items The list of products to calculate prices for
 */
const recalculatePrices = (state: ListState) => {
    const TAX_RATE = 0.075;

    let subtotal = 0.0;
    state.items.forEach((itm: ListItem) => {
        subtotal += itm.price * itm.quantity;
    });

    state.subtotal = roundToTwo(subtotal);
    state.tax = roundToTwo(subtotal * TAX_RATE);
    state.total = roundToTwo(state.subtotal + state.tax);
};

/**
 * Taken from https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
 * Would probably want to just do this on the server IRL, but this works for now.
 * @param num The number to round
 * @returns A rounded number to 2 decimal places
 */
const roundToTwo = (num: any) => {
    return +(Math.round((num + "e+2") as any) + "e-2");
};
