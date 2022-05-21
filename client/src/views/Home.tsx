import HomeLink from "../components/HomeLink";
import sortingIcon from "../assets/sorting.svg";
import cpuIcon from "../assets/cpu.svg";
import githubIcon from "../assets/github.svg";
import styles from "./styles/Home.module.css";

export default function Home() {
    return (
        <>
            <div class={styles.wrapper}>
                <div class={styles.section} id="home">
                    <h2 class={styles.subtitle}>The Human Computation Test</h2>
                    <img src={cpuIcon} alt="Icon of CPU" class={styles.cpuIcon} />
                    <p class={styles.description}>Compare yourself and your computer in different algorithmic challenges</p>
                </div>
                <div class={styles.section} id="challenges">
                    <h2 class={styles.subtitle}>Challenges</h2>
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
                <div class={styles.section} id="credits">
                    <h2 class={styles.subtitle}>Credits</h2>
                    <p class={styles.description}>Written using the SolidJS library</p>
                    <br />
                    <a class={styles.link} href="https://github.com/newclarityex/" target="_blank">
                        <img class={styles.linkImg} src={githubIcon} alt="Github" height="32px" width="32px" />
                        <span class={styles.linkText}>
                            <span class="hide-mobile">Built by </span>
                            @newclarityex
                            <span class="hide-mobile"> on Github</span>
                        </span>
                    </a>
                    <br />
                    <br />
                </div>
            </div>
        </>
    );
}

