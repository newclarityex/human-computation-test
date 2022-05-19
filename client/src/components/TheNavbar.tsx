import styles from './styles/TheNavbar.module.css';

export default function TheTitleBar() {
    return (
        <>
            <div class={styles.wrapper}>
                <a class={styles.title} href="#home">The Human Computation Test</a>
                <div>
                    <a class={styles.navlink} href="#home">Home</a>
                    <a class={styles.navlink} href="#challenges">Challenges</a>
                    <a class={styles.navlink} href="#credits">Credits</a>
                </div>
            </div>
        </>
    );
}