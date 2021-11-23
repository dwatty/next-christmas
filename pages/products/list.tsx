import Layout from "../../components/layout/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.scss";
import ProductTile from "../../components/product-tile/product-tile";
import { getAllProducts } from "../../lib/products";
import { useEffect, useRef, useState } from "react";

/**
 * Our Prop Definition
 */
interface IProps {
    products: any[];
}

/**
 * Product getStaticProps implementation
 * @param params The product ID
 * @returns The product data as markdown plus properties
 */
export async function getStaticProps({ params }) {
    const productData = await getAllProducts(0, 2);
    return {
        props: {
            products: productData,
        } as IProps,
    };
}

/**
 *
 * @param param0
 * @returns
 */
export default function ProductList(props: IProps) {

    const [products, setProducts] = useState(props.products.slice(0,3));
    const [isFetching, setIsFetching] = useState(false);
    const [skip, setSkip] = useState(3);

    const listRef = useRef(null);

    const listCallback = async (entries : any) => {
        const [entry] = entries;
        if(entry.isIntersecting) {
            setIsFetching(false);

            await fetchData();
        }
    }

    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 1
    };

    useEffect(() => {
        
        const observer = new IntersectionObserver(listCallback, options);
        if(listRef.current) {
            observer.observe(listRef.current);
        }

        return () => {
            if(listRef.current) {
                observer.unobserve(listRef.current);
            }
        }

    }, [listRef, options]);


    const fetchData = async () => {
        const nextSet = props.products.slice(skip, skip+3);
        setSkip(skip + 3);
        setProducts(() => {
            return [...products, ...nextSet];
        });
    };

    
    return (
        <Layout home={false}>
            <Head>
                <title>Products</title>
            </Head>
            <h1 className={utilStyles.heading2Xl}>
                Viewing All Products ({props.products.length})
            </h1>
            <article>
                <div className={utilStyles.tileGrid}>
                    {products.map((itm: any) => (
                        <ProductTile key={itm.id} product={itm} addItem={() => {}} />
                    ))}
                </div>
                <div  ref={ listRef }>Blah</div>
            </article>
        </Layout>
    );
}
