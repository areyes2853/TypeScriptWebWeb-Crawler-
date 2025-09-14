import { expect, test } from "vitest";
import { normalizeURL, getH1FromHTML, getFirstParagraphFromHTML,getURLsFromHTML } from "./crawl";

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

test("getH1FromHTML basic", () => {
  const inputBody = `<html><body><h1>Test Title</h1></body></html>`;
  const actual = getH1FromHTML(inputBody);
  const expected = "Test Title";
  expect(actual).toEqual(expected);
});

test("getFirstParagraphFromHTML main priority", () => {
  const inputBody = `
    <html><body>
      <p>Outside paragraph.</p>
      <main>
        <p>Main paragraph.</p>
      </main>
    </body></html>
  `;
  const actual = getFirstParagraphFromHTML(inputBody);
  const expected = "Main paragraph.";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody = `<html><body><a href="https://blog.boot.dev"><span>Boot.dev</span></a></body></html>`;

  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev"];

  expect(actual).toEqual(expected);
});