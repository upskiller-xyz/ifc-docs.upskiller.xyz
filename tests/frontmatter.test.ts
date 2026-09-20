import { describe, expect, it } from 'vitest';
import { listDocIds, readDoc } from './helpers/docs';

/**
 * Titles drive the sidebar labels, the browser tab and the search index. A page
 * without one silently falls back to its filename, so require a `title:` in the
 * frontmatter or a single top-level heading.
 */

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

const frontmatterTitle = (source: string): string | undefined =>
  FRONTMATTER.exec(source)?.[1]
    .split(/\r?\n/)
    .find((line) => line.startsWith('title:'));

/**
 * Top-level headings, ignoring fenced code blocks — a shell comment (`# make
 * the thing`) inside ```bash is not a heading.
 */
const headings = (source: string): string[] => {
  let inFence = false;
  return source
    .replace(FRONTMATTER, '')
    .split(/\r?\n/)
    .filter((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return false;
      }
      return !inFence && /^# \S/.test(line);
    });
};

describe('doc pages', () => {
  const docs = listDocIds();

  it('are not empty', () => {
    expect(docs.length).toBeGreaterThan(0);
    const empty = docs.filter((id) => readDoc(id).replace(FRONTMATTER, '').trim().length === 0);
    expect(empty).toEqual([]);
  });

  it('all carry a title', () => {
    const untitled = docs.filter((id) => {
      const source = readDoc(id);
      return !frontmatterTitle(source) && headings(source).length === 0;
    });
    expect(untitled).toEqual([]);
  });

  it('use at most one H1 per page', () => {
    const multiple = docs.filter((id) => headings(readDoc(id)).length > 1);
    expect(multiple).toEqual([]);
  });
});
