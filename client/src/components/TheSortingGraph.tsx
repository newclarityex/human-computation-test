import styles from './styles/TheSortingGraph.module.css';
import { For, createSignal, onMount, onCleanup } from 'solid-js';

interface Item {
    index: number;
    value: number;
}

export default function TheSortingGraph() {
    const blockCount = 10;

    const [blocks, setBlocks] = createSignal(genBlocks() as Item[]);
    const [sortedBlocks, setSortedBlocks] = createSignal([...blocks()] as Item[]);
    const [activeBlock, setActiveBlock] = createSignal(null as Item | null);
    let containerDiv: HTMLDivElement | undefined = undefined;
    function containerRect() {
        if (containerDiv) {
            return containerDiv.getBoundingClientRect();
        }
        return null;
    }

    function genBlocks() {
        const blocks = [];
        for (let i = 0; i < blockCount; i++) {
            blocks.push({
                index: i,
                value: i,
            } as Item);
        }
        return blocks;
    }

    function updateDOMBlocks() {
        const newBlocksUnsorted = [...blocks()];
        newBlocksUnsorted.forEach(b => {
            b.index = sortedBlocks().findIndex(sb => sb.value === b.value);
        });
        setBlocks(newBlocksUnsorted);
    }

    function shuffleBlocks() {
        const newBlocks = [...sortedBlocks()];
        newBlocks.sort(() => Math.random() - 0.5);
        setSortedBlocks(newBlocks);
        updateDOMBlocks();
    }

    function checkSorted() {
        return blocks().every((b, i) => b.index === i);
    }

    function bubbleSortIteration() {
        console.log("bubbleSortIteration");

        const newBlocks = [...sortedBlocks()];
        for (let i = 0; i < newBlocks.length - 1; i++) {
            if (newBlocks[i].value > newBlocks[i + 1].value) {
                const temp = newBlocks[i];
                newBlocks[i] = newBlocks[i + 1];
                newBlocks[i + 1] = temp;
                break;
            }
        }
        setSortedBlocks(newBlocks);
        updateDOMBlocks();
    }

    function bubbleSort() {
        const interval = setInterval(() => {
            if (!checkSorted()) {
                bubbleSortIteration();
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    function moveBlockToPosition(block: Item, final: Item) {
        const newBlocks = [...blocks()];
        if (block.index === final.index) {
            return;
        } else if (block.index < final.index) {
            // Move all blocks between the two positions to the left
            for (let i = block.index + 1; i <= final.index; i++) {
                newBlocks.find(b => b.index === i)!.index--;
            }
            block.index = final.index + 1;
        } else {
            // Move all blocks between the two positions to the right
            for (let i = block.index - 1; i >= final.index; i--) {
                newBlocks.find(b => b.index === i)!.index++;
            }
            block.index = final.index - 1;
        }
        setBlocks(newBlocks);
    }

    function dragStart(e: MouseEvent, item: Item) {
        setActiveBlock(item);
        // Set cursor to grabbing
        document.body.style.cursor = "grabbing";
    }

    function dragDuring(e: MouseEvent) {
        const curBlock = activeBlock();
        if (curBlock === null) {
            return;
        }
        let x = e.clientX - containerRect()!.left;
        if (x < 0) {
            x = 0;
        }

        // Split div into the amount of blocks
        const brackets = containerRect()!.width / (blockCount);
        const finalIndex = Math.min(x / brackets, blockCount - 1);
        const finalIndexFloor = Math.floor(finalIndex);
        if (finalIndexFloor !== curBlock.index) {
            moveBlockToPosition(curBlock, blocks().find(b => b.index === finalIndexFloor)!);
        }
    }

    function dragEnd(e: MouseEvent) {
        setActiveBlock(null);
        document.body.style.cursor = "";
    }

    function hoverEnter(e: MouseEvent, item: Item) {
        // Move item to current hover
        if (activeBlock() !== null) {
            moveBlockToPosition(activeBlock() as Item, item);
        } else {
            document.body.style.cursor = "grab";
        }
    }

    function hoverLeave(e: MouseEvent) {
        if (activeBlock() === null) {
            document.body.style.cursor = "";
        }
    }

    onMount(() => {
        window.addEventListener('mousemove', dragDuring);
        window.addEventListener('mouseup', dragEnd);
    });

    onCleanup(() => {
        window.addEventListener('mousemove', dragDuring);
        window.removeEventListener('mouseup', dragEnd);
    });

    return (
        <>
            <div class={styles.wrapper}>
                <button onClick={shuffleBlocks}>Shuffle Blocks</button>
                <button onClick={bubbleSort}>Bubble Sort</button>
                <ul class={styles.graphList} ref={containerDiv}>
                    <For each={blocks()} >
                        {(item, index) => (
                            <li
                                classList={{ [styles.graphItem]: true, [styles.graphItemActive]: activeBlock() === item }}
                                style={{ left: (blocks()[index()].index) * (750 / blockCount) + "px", height: (item.value * 40 + 100) + "px" }}
                                onMouseDown={(e) => dragStart(e, item)}
                                onMouseEnter={(e) => hoverEnter(e, item)}
                                onMouseLeave={(e) => hoverLeave(e)}
                            ></li>
                        )}
                    </For>
                </ul>
            </div>
        </>
    );
}