import HomeLink from "../components/HomeLink";
import sortingIcon from "../assets/sorting.svg";
import styles from "./styles/Home.module.css";

export default function Home() {
    return (
        <>
            <div class={styles.wrapper}>
                <h1 class={styles.title}>Human Computation Benchmark</h1>
                <div class={styles.optionsWrapper}>
                    <div class={styles.optionsRow}>
                        <HomeLink url="./sorting" icon={sortingIcon} title="Sorting" description="Sort the objects in ascending height by drag and drop" />
                        <HomeLink url="./pathfinding" icon={sortingIcon} title="Pathfinding" description="Find your way around a maze using the arrow keys" />
                    </div>
                    <div class={styles.optionsRow}>
                        <HomeLink url="./calculations" icon={sortingIcon} title="Calculations" description="Solve the math equations presented" />
                        <HomeLink url="./sorting" icon={sortingIcon} title="Image Recognition" description="Select the option that matches the image shown" />
                        <HomeLink url="./sorting" icon={sortingIcon} title="Object Search" description="Click the matching object in the sorted collection" />
                    </div>
                </div>
            </div>
        </>
    );
}

