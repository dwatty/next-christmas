import Head from "next/head";
import Link from "next/link";
import HotProducts from "../components/hot-products/hot-products";
import Layout, { siteTitle } from "../components/layout/layout";
import { getHotProducts, getSortedPostsData } from "../lib/products";
import utilStyles from "../styles/utils.module.scss";

interface IProps {
    allPostsData: any[];
    hotProducts: any[];
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const hotProducts = getHotProducts();
    return {
        props: {
            allPostsData,
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

            <button onClick={makeList}>Make a List</button>

            <section className={utilStyles.headingMd}>
                <p>Home</p>
                <Link href="/categories/game-category">View Games Category</Link>
            </section>

            <HotProducts products={ props.hotProducts } />

            {/*             
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {props.allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            {title}
                            <br />
                            {id}
                            <br />
                            {date}
                        </li>
                    ))}
                </ul>
            </section> */}

        </Layout>
    );
}
