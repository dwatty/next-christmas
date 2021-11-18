import Head from "next/head";
import CategoryList from "../components/category-list/category-list";
import Footer from "../components/footer/footer";
import HotProducts from "../components/hot-products/hot-products";
import Layout, { siteTitle } from "../components/layout/layout";
import Lights from "../components/lights/lights";
import { getAllCategories } from "../lib/categories";
import { getHotProducts } from "../lib/products";

interface IProps {
    hotProducts: any[];
    categories: any[];
}

export async function getStaticProps() {
    const hotProducts = getHotProducts();
    const categories = getAllCategories();

    return {
        props: {
            hotProducts,
            categories
        },
    };
}

export default function Home(props: IProps) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <HotProducts products={ props.hotProducts } />
            <CategoryList categories={ props.categories } />
            <Footer />
        </Layout>
    );
}
