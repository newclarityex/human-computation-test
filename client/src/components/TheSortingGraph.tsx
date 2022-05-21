import styles from './styles/TheSortingGraph.module.css';
import { For, createSignal, onMount, onCleanup } from 'solid-js';

interface Item {
    index: number;
    value: number;
}

export default function TheSortingGraph() {
    const [blockCount, setBlockCount] = createSignal(10);
    const [blocks, setBlocks] = createSignal(genBlocks() as Item[]);
    const [sortedBlocks, setSortedBlocks] = createSignal([...blocks()] as Item[]);
    const [activeBlock, setActiveBlock] = createSignal(null as Item | null);
    const [sortInterval, setSortInterval] = createSignal(null as number | null);

    function clearSortInterval() {
        if (sortInterval()) {
            clearInterval(sortInterval() as number);
            setSortInterval(null);
        }
    }

    let containerDiv: HTMLDivElement | undefined = undefined;
    function containerRect() {
        if (containerDiv) {
            return containerDiv.getBoundingClientRect();
        }
        return null;
    }

    function genBlocks() {
        const blocks = [];
        for (let i = 0; i < blockCount(); i++) {
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
        clearSortInterval();
        bubbleSortIteration();
        const interval = window.setInterval(() => {
            if (!checkSorted()) {
                bubbleSortIteration();
            } else {
                clearInterval(interval);
            }
        }, 100);
        setSortInterval(interval);
    }

    function bogoSort() {
        clearSortInterval();
        shuffleBlocks();
        const interval = window.setInterval(() => {
            if (!checkSorted()) {
                shuffleBlocks();
            } else {
                clearInterval(interval);
            }
        }, 100);
        setSortInterval(interval);
    }

    function mergeSort() {
        clearSortInterval();
        let stack: Item[][] = sortedBlocks().map(b => [b]);
        stack = mergeSortIteration(stack);
        const interval = window.setInterval(() => {
            if (!checkSorted()) {
                stack = mergeSortIteration(stack);
                updateDOMBlocks();
            } else {
                clearInterval(interval);
            }
        }, 500);
        setSortInterval(interval);
    }

    function merge(left: Item[], right: Item[]) {
        const result: Item[] = [];
        while (left.length > 0 && right.length > 0) {
            if (left[0].value <= right[0].value) {
                result.push(left.shift()!);
            } else {
                result.push(right.shift()!);
            }
        }
        return result.concat(left, right);
    }

    // Iterative merge sort
    function mergeSortIteration(stack: Item[][]) {
        // Split stack until it's size is 1
        console.log("mergeSortIteration");
        if (stack.length === 1) {
            return stack;
        }

        const newStack: Item[][] = [];
        // Merge the stack so that it's halved
        for (let i = 0; i < stack.length; i += 2) {
            if (i + 1 < stack.length) {
                newStack.push(merge(stack[i], stack[i + 1]));
            } else {
                newStack.push(stack[i]);
            }
        }

        setSortedBlocks(matrixToArray(newStack));
        return newStack;
    }

    function selectionSort() {
        clearSortInterval();
        let minIndex = 0;
        const interval = window.setInterval(() => {
            if (!checkSorted()) {
                minIndex = selectionSortIteration(minIndex);
                if (minIndex === blockCount() - 1) {
                    clearInterval(interval);
                }
            } else {
                clearInterval(interval);
            }
        }, 300);
    }

    function selectionSortIteration(minIndex: number) {
        const newBlocks = [...sortedBlocks()];
        let prevBlock = newBlocks[minIndex];
        let minBlock = newBlocks[minIndex] || null;

        // Find the minimum block
        for (let i = minIndex; i < newBlocks.length; i++) {
            if (minBlock === null || newBlocks[i].value < minBlock.value) {
                minBlock = newBlocks[i];
            }
        }

        // Remove the min block from the sorted blocks
        newBlocks.splice(minBlock.index, 1);
        // Move the minimum block to the minimum index
        newBlocks.splice(minIndex, 0, minBlock);
        minIndex++;
        setSortedBlocks(newBlocks);
        updateDOMBlocks();
        return minIndex;
    }

    function matrixToArray(matrix: Item[][]) {
        const result: Item[] = [];
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                result.push(matrix[i][j]);
            }
        }
        return result;
    }

    function moveBlockToPosition(block: Item, final: Item) {
        const newBlocks = [...sortedBlocks()];
        newBlocks.splice(block.index, 1);
        newBlocks.splice(final.index, 0, block);
        setSortedBlocks(newBlocks);
        updateDOMBlocks();
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
        const brackets = containerRect()!.width / (blockCount());
        const finalIndex = Math.min(x / brackets, blockCount() - 1);
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

    function addBlock() {
        setBlockCount(blockCount() + 1);
        setBlocks(genBlocks())
        setSortedBlocks(blocks());
    }

    function removeBlock() {
        if (blockCount() > 2) {
            setBlockCount(blockCount() - 1);
            setBlocks(genBlocks())
            setSortedBlocks(blocks());
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
                <button onClick={() => { shuffleBlocks(); clearSortInterval(); }}>Shuffle Blocks</button>
                <ul class={styles.graphList} ref={containerDiv}>
                    <For each={blocks()} >
                        {(item, index) => (
                            <li
                                classList={{ [styles.graphItem]: true, [styles.graphItemActive]: activeBlock() === item }}
                                style={{ left: (blocks()[index()].index) * (750 / blockCount()) + "px", height: (item.value / blockCount() * 400 + 50) + "px", width: (500 / blockCount()) + "px" }}
                                onMouseDown={(e) => dragStart(e, item)}
                                onMouseEnter={(e) => hoverEnter(e, item)}
                                onMouseLeave={(e) => hoverLeave(e)}
                            ></li>
                        )}
                    </For>
                </ul>
                <button onClick={clearSortInterval}>Pause Sort</button>
                <button onClick={bubbleSort}>Bubble Sort</button>
                <button onClick={bogoSort}>Bogo Sort</button>
                <button onClick={mergeSort}>Merge Sort</button>
                <button onClick={selectionSort}>Selection Sort</button>
                <button onClick={addBlock}>Add Block</button>
                <button onClick={removeBlock}>Remove Block</button>
            </div>
        </>
    );
}