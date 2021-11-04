import Head from "next/head";
import Link from "next/link";
import HotProducts from "../components/hot-products/hot-products";
import Layout, { siteTitle } from "../components/layout/layout";
import { getHotProducts } from "../lib/products";
import utilStyles from "../styles/utils.module.scss";

interface IProps {
    hotProducts: any[];
}

export async function getStaticProps() {
    const hotProducts = getHotProducts();
    return {
        props: {
            hotProducts,
        },
    };
}

export default function Home(props: IProps) {

    const makeList = () => {};

    return (
        <Layout home>

            <Head>
                <title>{siteTitle}</title>
            </Head>

            <button onClick={makeList}>New List +</button>

            <HotProducts products={ props.hotProducts } />

            <section className={utilStyles.headingMd}>
                <p>Home</p>
                <Link href="/categories/game-category">View Games Category</Link>
            </section>

            <footer>
                CLaaS - Christmas List as a Service &copy; 2021
            </footer>

        </Layout>
    );
}
