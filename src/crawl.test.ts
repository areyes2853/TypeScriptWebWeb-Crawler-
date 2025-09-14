import { expect, test } from "vitest";
import { normalizeURL } from "./crawl";

test("normalizeURL: removes protocol and trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const expected = "blog.boot.dev/path";
  expect(normalizeURL(input)).toBe(expected);
});

test("normalizeURL: keeps pathless host and strips trailing slash", () => {
  const input = "https://example.com/";
  const expected = "example.com";
  expect(normalizeURL(input)).toBe(expected);
});

test("normalizeURL: throws on invalid url", () => {
  expect(() => normalizeURL("not-a-url")).toThrow();
});
