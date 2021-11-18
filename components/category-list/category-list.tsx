import styles from "./category-list.module.scss";
import utilStyles from "../../styles/utils.module.scss";
import Link from "next/link";

interface IProps {
    categories: any[];
}

export default function CategoryList(props: IProps) {
    return (
        <div>
            <h2 className={utilStyles.heading2Xl}>View By Category</h2>
            <div className={styles.container}>
                {props.categories.map((itm: any) => (
                    <Link key={itm.id} href={`/categories/${itm.id}`} passHref={true}>
                        <a className={styles.item}>
                            <span>{itm.name}</span>
                            <img src="/giftbox.svg" alt="Present Icon" className={styles.presentIcon} />
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
}
