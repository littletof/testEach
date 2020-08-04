import { assertThrowsAsync } from "https://deno.land/std@0.63.0/testing/asserts.ts";

export interface TestCase<T = unknown, K = unknown> {
  input: T;
  result?: K;
  // deno-lint-ignore-next-line no-explicit-any
  exception?: { error?: any; msg?: any };
  desc?: string;
}

export function testEach<T, K>(
  name: string,
  input: TestCase<T, K>[],
  fn: (testCase: TestCase<T, K>) => Promise<unknown> | unknown,
  only?: boolean,
  ignore?: boolean
) {
  input.forEach((input, i) => {
    Deno.test({
      name: `${name} [${i}]`,
      async fn() {
        if (input.exception) {
          assertThrowsAsync(
            async () => await fn(input),
            input.exception?.error,
            input.exception?.msg,
          );
        } else {
          await fn(input);
        }
      },
      only: only,
      ignore: ignore,
    });
  });
}
