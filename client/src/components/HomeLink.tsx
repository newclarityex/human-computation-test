import hexagon from '../assets/hexagon.svg';
import styles from './styles/HomeLink.module.css';
import { Link } from 'solid-app-router';

export default function HomeLink(props: { url: string, title: string, description: string, icon: string }) {
    return (
        <>
            <div class={styles.wrapper}>
                <Link href={props.url} class={styles.iconWrapper} noScroll={true}>
                    <img src={props.icon} class={styles.bgIcon} alt={props.title} />
                    <img src={hexagon} class={styles.hexagon} />
                </Link>
                <h2 class={styles.title}>{props.title}</h2>
                <div class={styles.separator}></div>
                <p class={styles.description}>{props.description}</p>
            </div>
        </>
    );
}