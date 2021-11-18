import styles from "./list.module.scss";
import Link from "next/link";
import { useListContext, useUiContext } from "../../context/context";
import { UiActionType } from "../../context/reducer-ui";

export default function List() {
    const { uiState, uiDispatch } = useUiContext();
    const { listState } = useListContext();

    return <div className={`${styles.container} ${ uiState.isListOpen ? styles.show : null }`}>
            <h2>Your List</h2>
            {listState.items.map((itm: any) => (
                <Link key={itm.id} href={`/products/${itm.id}`}>
                    <div className={styles.item}>
                        <span>{itm.name}</span>
                        <span>{itm.quantity}</span>
                    </div>
                </Link>
            ))}

            <p>Subtotal: {listState.subtotal}</p>
            <p>Tax: {listState.tax}</p>
            <p>Total: {listState.total}</p>

            <button onClick={() => uiDispatch({ type: UiActionType.ToggleLst })}>Hide List</button>
        </div>

}
