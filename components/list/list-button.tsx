import styles from "./list.module.scss";
import { useListContext, useUiContext } from "../../context/context";
import { UiActionType } from "../../context/reducer-ui";

export default function ListButton() {

    const { uiDispatch } = useUiContext();
    const { listState } = useListContext();

    const toggleList = () => {
        uiDispatch({ type: UiActionType.ToggleLst });
    };

    return <button className={ styles.button } onClick={ toggleList }>
        <img src="/scroll.svg" /> View
        {
            listState.totalQuantity > 0
                ? <span>{listState.totalQuantity }</span>
                : null
        }
    </button>
}
