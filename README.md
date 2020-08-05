# testEach

To make testing a lot of combinations easy.

Define the inputs and required outputs, write the test logic once, and let `testEach` run each case for you separately.

You can add descriptions to each `TestCase`, so you can use them in assertions, `async` test functions are also supported.

## Usage

```ts

import { TestCase, testEach } from "https://deno.land/x/test_each@v0.0.2/mod.ts";

testEach<{a: number, b: number}, number>(
  "Quick math",
  [
    { input: { a: 1, b: 3 }, result: 3, desc: '1*3 should equal 3'},
    { input: { a: 2, b: 3 }, result: 6, desc: '2*3 should equal 6' },
    { input: { a: 3, b: 3 }, result: 9, desc: '3*3 should equal 9' },
    { input: { a: 4, b: 3 }, result: 12, desc: '4*3 should equal 12' },
  ],
  (testCase) => {
    assertEquals(
      testCase.input.a * testCase.input.b,
      testCase.result,
      testCase.desc,
    );
  },
);

testEach<number | boolean, unknown>(
  "Exceptions",
  [
    { input: false, exception: { msg: "my exception" } },
    { input: 5, result: 12 },
  ],
  (testCase) => {
    if (typeof testCase.input === "number") {
      assertEquals(60 / testCase.input, testCase.result);
    } else {
      throw new Error("my exception");
    }
  },
);

testEach<unknown, unknown>(
  "Options",
  [/*...*/],
  (testCase) => {/* ... */ },
  {only: true, ignore: true, sanitizeOps: true, sanitizeResources: true}
);

```
