import styles from "./list.module.scss";
import Link from "next/link";
import { useListContext, useUiContext } from "../../context/context";
import { UiActionType } from "../../context/reducer-ui";
import { ListActionType } from "../../context/reducer-list";

export default function List() {
    const { uiState, uiDispatch } = useUiContext();
    const { listState, listDispatch } = useListContext();

    const clearList = () => {
        listDispatch({
            type: ListActionType.ClearList,
        });
    };

    const toggleList = () => {
        uiDispatch({
            type: UiActionType.ToggleLst,
        });
    };

    return (
        <div className={`${styles.container} ${uiState.isListOpen ? styles.show : null}`}>
            <h2 className={styles.listHeader}>
                Your List
                <button onClick={clearList}>Clear</button>
            </h2>

            {listState.items.map((itm: any) => (
                <Link key={itm.id} href={`/products/${itm.id}`}>
                    <div className={styles.item}>
                        <span>
                            {itm.name} <br/>
                            <i>Unit Price: ${itm.price}</i>
                        </span>
                        <span className={ styles.quantityPicker }>
                            <button>-</button>
                            {itm.quantity}
                            <button>+</button>                            
                        </span>
                    </div>
                </Link>
            ))}

            <div className={styles.prices}>
                <p>Subtotal: ${listState.subtotal}</p>
                <p>Tax: ${listState.tax}</p>
                <p>Total: ${listState.total}</p>
            </div>

            <button className={styles.closeList} onClick={toggleList}>
                Close
            </button>
        </div>
    );
}
