import styles from "./product-tile.module.scss";
import utilStyles from "../../styles/utils.module.scss";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    product: any;
    addItem: any;
}

export default function ProductTile(props: IProps) {
    const itm = props.product;

    return (
        <Link key={itm.id} href={`/products/${itm.id}`} passHref={true}>
            <a className={styles.item}>
                <span className={styles.itemName}>{itm.title}</span>
                <span>${itm.price}</span>
                {itm.img ? (
                    <div className={styles.imageContainer}>
                        <Image src={itm.img} layout="fill" objectFit="contain" />
                    </div>
                ) : null}
                <button className={utilStyles.addBtn} onClick={(e) => props.addItem(itm, e)}>
                    Add to List
                </button>
            </a>
        </Link>
    );
}
