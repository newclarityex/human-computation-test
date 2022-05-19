function add(a: number, b: number): number {
    return a + b;
}

test("adds 2 numbers", () => {
    expect(add(1, 2)).toBe(3);
});