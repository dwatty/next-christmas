import styles from "./hot-products.module.scss";
import utilStyles from "../../styles/utils.module.scss";
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
    products : any[];
}

export default function HotProducts(props : IProps) {
  return (<div>
      <h2 className={utilStyles.heading2Xl } >Hot Products</h2>
    <div className={styles.container}>
    {
        props.products.map((itm : any) =>
            <Link key={ itm.id } href={`/products/${itm.id}`}>
                <div className={styles.item}>
                    <span>{ itm.title }</span>
                    <span>{ itm.price }</span>
                    {
                        itm.img 
                            ? <div className={ styles.imageContainer }>
                                <Image 
                                    src={ itm.img }
                                    layout="fill"
                                    objectFit="contain" 
                                />
                            </div>
                            : null
                    }
                    <button>Add to List</button>
                </div>
            </Link> 
        )
    } 
    </div>
    </div>
  );
}
