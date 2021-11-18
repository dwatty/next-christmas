import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.scss";
import utilStyles from "../../styles/utils.module.scss";
import List from "../list/list";
import Lights from "../lights/lights";
import ListButton from "../list/list-button";

const name = "Next Christmas, I Gave You My List";
export const siteTitle = "CLaaS - Christmas List as a Service";

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Christmas List As a Service" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* The List Component */}
            <ListButton />
            <List />

            <header className={styles.header}>
                {home ? (
                    <h1>
                        <span>
                            Next&nbsp;
                            <br /> Christmas&nbsp;
                        </span>
                    </h1>
                ) : (
                    <Link href="/" passHref={true}>
                        <a>
                            <h1 className={styles.subhead}>
                                <span>
                                    Next&nbsp;
                                    <br /> Christmas&nbsp;
                                </span>
                            </h1>
                        </a>
                    </Link>
                )}
            </header>

            {/* CSS Lights */}
            {home ? <Lights /> : null}

            <main>{children}</main>
        </div>
    );
}
