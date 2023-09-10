describe("test", () => {
  test("Check Is Jest Working Properly", () => {
    expect(
      (function () {
        return 3;
      })()
    ).toBe(3);
  });
});
