import { UiState } from "./context-types";

export enum UiActionType {
    ToggleLst,
    ShowToast
}

export interface TogglerList {
    type: UiActionType.ToggleLst;
}

export interface ShowToast {
    type: UiActionType.ShowToast,
    payload: any
}

export type UiActions = TogglerList | ShowToast;

export const initialUiState : UiState = {
    isListOpen: false
}

export function uiReducer(state: UiState, action: UiActions) {
    switch (action.type) {
        case UiActionType.ToggleLst:
            return { ...state, isListOpen: !state.isListOpen };
        default:
            return state;
    }
}
