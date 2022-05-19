import HomeLink from "../components/HomeLink";
import sortingIcon from "../assets/sorting.svg";

export default function Home() {
    return (
        <>
            <div>
                <div>Human Computation Benchmark</div>
                <HomeLink url="./sorting" icon={sortingIcon} title="Sorting" description="Can you sort a collection faster than your computer? Probably not, but go ahead and try anyways." />
            </div>
        </>
    );
}

