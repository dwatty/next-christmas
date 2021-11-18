import styles from './footer.module.scss';

export default function Footer() {
    const year = new Date().getFullYear();

    return <footer className={styles.footer}>CLaaS - Christmas List as a Service &copy; {year}</footer>;
}
