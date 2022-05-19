import hexagon from '../assets/hexagon.svg';
import styles from './styles/HomeLink.module.css';

export default function HomeLink(props: { url: string, title: string, description: string, icon: string }) {
    return (
        <>
            <a href={props.url} class={styles.wrapper}>
                <img src={props.icon} class={styles.bgIcon} alt={props.title} />
                <img src={hexagon} class={styles.hexagon} />
            </a>
        </>
    );
}