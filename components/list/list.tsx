import styles from "./list.module.scss";
import Link from "next/link";
import { useListContext, useUiContext } from "../../context/context";
import { UiActionType } from "../../context/reducer-ui";
import { ListActionType } from "../../context/reducer-list";
import { ListItem } from "../../context/context-types";

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

    const increaseQuantity = (itm: ListItem, e: any) => {
        e.preventDefault();

        listDispatch({
            type: ListActionType.IncreaseQuantity,
            payload: itm.id,
        });
    };

    const decreaseQuantity = (itm: ListItem, e: any) => {
        e.preventDefault();

        listDispatch({
            type: ListActionType.DecreaseQuantity,
            payload: itm.id,
        });
    };

    return (
        <div className={`${styles.container} ${uiState.isListOpen ? styles.show : null}`}>
            <h2 className={styles.listHeader}>
                Your List
                <button onClick={clearList}>Clear</button>
            </h2>

            {listState.items.length > 0 ? (
                <>
                    {listState.items.map((itm: any) => (
                        <Link key={itm.id} href={`/products/${itm.id}`}>
                            <div className={styles.item}>
                                <span>
                                    {itm.name} <br />
                                    <i>Unit Price: ${itm.price}</i>
                                </span>
                                <span className={styles.quantityPicker}>
                                    <button onClick={(e) => decreaseQuantity(itm, e)}>-</button>
                                    {itm.quantity}
                                    <button onClick={(e) => increaseQuantity(itm, e)}>+</button>
                                </span>
                            </div>
                        </Link>
                    ))}
                    <div className={styles.prices}>
                        <p>Subtotal: ${listState.subtotal}</p>
                        <p>Tax: ${listState.tax}</p>
                        <p>Total: ${listState.total}</p>
                    </div>
                </>
            ) : (
                <div className={styles.item}>
                    <span>Hmmm, you haven't added anything!</span>
                </div>
            )}

            <button className={styles.closeList} onClick={toggleList}>
                Close
            </button>
        </div>
    );
}
