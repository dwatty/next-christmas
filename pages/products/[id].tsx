import Layout from "../../components/layout/layout";
import Head from "next/head";
import Image from 'next/image';
import { getAllProductIds, getProductData } from "../../lib/products";
import utilStyles from "../../styles/utils.module.scss";

/**
 * Our Prop Definition
 */
interface IProps {
    productData: any
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
      productData
    } as IProps
  };
}


/**
 * 
 * @param param0 
 * @returns 
 */
export default function Product(props : IProps) {
  return (
    <Layout home={false}>

      <Head>
        <title>{props.productData.title}</title>
      </Head>

      <article>

        <div>
            <Image 
                src={ props.productData.img }
                layout="fill"
                objectFit="contain" 
            />
        </div>

        <h1 className={utilStyles.headingXl}>{props.productData.title}</h1>
        <div className={utilStyles.lightText}>
          { props.productData.date }
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.productData.contentHtml }} />
      </article>
    </Layout>
  );
}
