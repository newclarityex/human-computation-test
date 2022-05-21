import { Link } from "solid-app-router";
import styles from "./styles/Challenges.module.css";
import TheSortingGraph from "../components/TheSortingGraph";

export default function Sorting() {
    return (
        <>
            <div class={styles.wrapper}>
                <h1 class={styles.title}>Sorting Challenge</h1>
                <p class={styles.description}>Drag and drop the blocks in an increasing order by length.</p>
                <TheSortingGraph />
                <Link href="/#challenges" noScroll={true} target="_self">Back</Link>
            </div>
        </>
    );
}