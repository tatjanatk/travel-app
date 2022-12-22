import { handleSubmit } from "../src/client/js/formHandler";
import { daysBetween } from "../src/client/js/formHandler";

describe("Testing the submit functionality", () => {
    test("Testing if handleSubmit() function exists", () => {
        expect(handleSubmit).toBeDefined();
    })
});

describe("Testing the daysBetween calculation", () => {
    test("Testing if the result is correct", () => {
        const day1 = "2022-12-22";
        const day2 = "2022-12-30";
        expect(daysBetween(day1, day2)).toBe(9);
    })
});
