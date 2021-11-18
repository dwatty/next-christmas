import { createContext, useContext, useReducer } from "react";
import { UiState, ListState } from "./context-types";
import { ListActions, listReducer, initialListState } from "./reducer-list";
import { initialUiState, UiActions, uiReducer } from "./reducer-ui";

const UiContext = createContext<{
    uiState: UiState;
    uiDispatch: React.Dispatch<UiActions>;
}>({
    uiState: initialUiState,
    uiDispatch: () => undefined,
});

const ListContext = createContext<{
    listState: ListState;
    listDispatch: React.Dispatch<ListActions>;
}>({
    listState: initialListState,
    listDispatch: () => undefined,
});

export function AppWrapper({ children }) {
    const [uiState, uiDispatch] = useReducer(uiReducer, initialUiState);
    const [listState, listDispatch] = useReducer(listReducer, initialListState);

    return (
        <UiContext.Provider value={{ uiState, uiDispatch }}>
            <ListContext.Provider value={{ listState, listDispatch }}>{children}</ListContext.Provider>
        </UiContext.Provider>
    );
}

export function useUiContext() {
    return useContext(UiContext);
}

export function useListContext() {
    return useContext(ListContext);
}
