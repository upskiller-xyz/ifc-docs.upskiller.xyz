import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DOCS_DIR = fileURLToPath(new URL('../../docs', import.meta.url));

/** Every markdown page under docs/, as the slash-separated id Docusaurus uses. */
export const listDocIds = (dir: string = DOCS_DIR): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listDocIds(full);
    if (!entry.name.endsWith('.md')) return [];
    return [path.relative(DOCS_DIR, full).replace(/\\/g, '/').replace(/\.md$/, '')];
  });

export const readDoc = (id: string): string => readFileSync(path.join(DOCS_DIR, `${id}.md`), 'utf8');
