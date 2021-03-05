import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from "semantic-ui-react";
import { client } from "../utils/shopify";
import Products from '../components/products'

export default function Home({ products }) {
    // console.log({ products });
    return (
        <div className={styles.container}>
            <Head>
                <title>Osha Testing Store</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {/* <Button basic color="olive">
                    Enter
                </Button> */}
                <Products products={products} />
            </main>

            <footer className={styles.footer}></footer>
        </div>
    );
}

export async function getServerSideProps() {
    // Fetch data from external API
    const products = await client.product.fetchAll();

    console.log(products);
    // Pass data to the page via props
    return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
