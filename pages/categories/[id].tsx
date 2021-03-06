import Layout from "../../components/layout/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.scss";
import { getAllCategoryIds, getProductsForCategory } from "../../lib/categories";
import ProductTile from "../../components/product-tile/product-tile";

/**
 * Our Prop Definition
 */
interface IProps {
    categoryData: any;
}

/**
 * Product getStaticPaths implementation
 * @returns Paths to pre-render
 */
export async function getStaticPaths() {
    const paths = getAllCategoryIds();
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
    const categoryData = await getProductsForCategory(params.id);
    return {
        props: {
            categoryData,
        } as IProps,
    };
}

/**
 *
 * @param param0
 * @returns
 */
export default function Category(props: IProps) {
    return (
        <Layout home={false}>
            <Head>
                <title>{props.categoryData.name}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{props.categoryData.name}</h1>
                <div className={utilStyles.lightText}>{props.categoryData.description}</div>

                <div className={ utilStyles.tileGrid }>
                    {props.categoryData.products.map((itm: any) => 
                        <ProductTile key={itm.id} product={itm} addItem={() => {}} />
                    )}
                </div>
            </article>
        </Layout>
    );
}
