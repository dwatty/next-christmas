import styles from "./hot-products.module.scss";
import utilStyles from "../../styles/utils.module.scss";
import { useListContext } from "../../context/context";
import Link from 'next/link';
import { ListActionType } from "../../context/reducer-list";
import ProductTile from "../product-tile/product-tile";

interface IProps {
    products: any[];
}

export default function HotProducts(props: IProps) {
    const { listDispatch } = useListContext();

    const addItem = (product: any, e: any) => {
        e.preventDefault();

        const itm = {
            id: product.id,
            name: product.title,
            price: product.price,
            quantity: 1,
        };

        listDispatch({
            type: ListActionType.AddItem,
            payload: itm,
        });
    };

    return (
        <div>
            <h2 className={utilStyles.heading2Xl}>
                Hot Products
                <Link href="/products/list" passHref={ true }>
                    <a className={ styles.viewAllLink }>
                        View All Products
                    </a>
                </Link>
            </h2>
            <div className={utilStyles.tileGrid}>
                {props.products.map((itm: any) => (
                    <ProductTile key={itm.id} product={itm} addItem={addItem} />
                ))}
            </div>
        </div>
    );
}
