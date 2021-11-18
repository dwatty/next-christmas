import Layout from "../../components/layout/layout";
import Head from "next/head";
import Image from "next/image";
import { getAllProductIds, getProductData } from "../../lib/products";
import pageStyles from "./page.module.scss";
import utilStyles from "../../styles/utils.module.scss";
import { useListContext } from "../../context/context";
import { ListActionType } from '../../context/reducer-list';

/**
 * Our Prop Definition
 */
interface IProps {
    productData: any;
}

/**
 * Product getStaticPaths implementation
 * @returns Paths to pre-render
 */
export async function getStaticPaths() {
    const paths = getAllProductIds();
    return {
        paths,
        fallback: false,
    };
}

/**
 * Product getStaticProps implementation
 * @param params The product ID
 * @returns The product data as markdown plus properties
 */
export async function getStaticProps({ params }) {
    const productData = await getProductData(params.id);
    return {
        props: {
            productData,
        } as IProps,
    };
}

/**
 *
 * @param param0
 * @returns
 */
export default function Product(props: IProps) {

    const { listDispatch } = useListContext();

    const addItem = () => {

        const itm = {
            id: props.productData.id,
            name: props.productData.title,
            price: props.productData.price,
            quantity: 1
        };

        listDispatch({
            type: ListActionType.AddItem,
            payload: itm
        });
    }

    return (
        <Layout home={false}>
            <Head>
                <title>{props.productData.title}</title>
            </Head>

            <article className={pageStyles.splitView}>
                <div className={ pageStyles.leftCol }>
                    <div className={pageStyles.imageContainer}>
                        <Image src={props.productData.img} layout="fill" objectFit="contain" />
                    </div>
                </div>

                <div className={ pageStyles.rightCol }>
                    <h1 className={pageStyles.headingXl}>{props.productData.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: props.productData.contentHtml }} />
                    <button onClick={ addItem } className={ utilStyles.addBtn }>Add to List (${props.productData.price})</button>
                </div>
            </article>
        </Layout>
    );
}
