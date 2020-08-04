import { assertEquals } from "https://deno.land/std@0.63.0/testing/asserts.ts";

import { testEach, TestCase } from "./mod.ts";

const testCases: TestCase<{a: number; b: number}, boolean>[] = [
  { input: { a: 2, b: 2 }, result: true, desc: "Should be true" },
  { input: { a: 2, b: 5 }, result: false },
];

const calledTestCases: TestCase[] = [];

testEach<{a: number; b: number}, boolean>("run tests with testEach", testCases, (testCase) => {
  assertEquals(
    testCase.input.a === testCase.input.b,
    testCase.result,
    testCase.desc,
  );
  calledTestCases.push(testCase);
});

Deno.test("test testEach", () => {
  assertEquals(testCases.length, calledTestCases.length);
  testCases.forEach((tc, i) => {
    assertEquals(tc, calledTestCases[i]);
  });
});