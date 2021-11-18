import styles from "./list.module.scss";
import { useListContext, useUiContext } from "../../context/context";
import { UiActionType } from "../../context/reducer-ui";

export default function ListButton() {
    const { uiState, uiDispatch } = useUiContext();
    const { listState } = useListContext();

    return <button className={ styles.button } onClick={() => uiDispatch({ type: UiActionType.ToggleLst })}>Show List</button>
}
