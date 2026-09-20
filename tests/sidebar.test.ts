import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import sidebars from '../sidebars';
import { DOCS_DIR, listDocIds } from './helpers/docs';

/**
 * Every id in sidebars.ts must point at a real file, and every file must be
 * reachable from the sidebar. Docusaurus only reports the second case as a
 * build-time warning, which is easy to miss — here it fails the build.
 */

/** Doc ids referenced anywhere in the sidebar tree (items, category links). */
const collectSidebarIds = (node: unknown, found: Set<string>): Set<string> => {
  if (typeof node === 'string') {
    found.add(node);
    return found;
  }
  if (Array.isArray(node)) {
    node.forEach((child) => collectSidebarIds(child, found));
    return found;
  }
  if (node && typeof node === 'object') {
    const item = node as { type?: string; id?: string; link?: unknown; items?: unknown };
    if (item.type === 'doc' && typeof item.id === 'string') found.add(item.id);
    if (item.link) collectSidebarIds(item.link, found);
    if (item.items) collectSidebarIds(item.items, found);
  }
  return found;
};

/**
 * Pages that exist on purpose without a sidebar entry (drafts, or content
 * linked only from inside another page). Add a file here consciously — the
 * default is that a doc is navigable.
 */
const INTENTIONALLY_UNLISTED = ['contributing/bim-simplification', 'contributing/encoding'];

describe('sidebar', () => {
  const sidebarIds = [...collectSidebarIds(Object.values(sidebars), new Set<string>())];

  it('references only docs that exist', () => {
    const missing = sidebarIds.filter((id) => !existsSync(path.join(DOCS_DIR, `${id}.md`)));
    expect(missing).toEqual([]);
  });

  it('leaves no doc unreachable', () => {
    const orphans = listDocIds().filter((id) => !sidebarIds.includes(id) && !INTENTIONALLY_UNLISTED.includes(id));
    expect(orphans).toEqual([]);
  });
});
