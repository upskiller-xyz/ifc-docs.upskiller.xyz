# Documentation Style Guide — IFC Daylight Factor

This guide defines the strict rules for writing and maintaining the IFC Daylight Factor documentation. It is kept identical to the LUX docs style guide (`docs.upskiller.xyz`) so both sites read the same.

## Core Principles

**Concise and laconic.** Every sentence must serve a purpose. Remove unnecessary words.

**User-friendly.** Write for humans, not for search engines or academics. Use plain language.

**Concrete and to the point.** Specify what something does, not what it might enable or could potentially do.

## Strict Rules

### Language and Tone

**No epithets or buzzwords.** Avoid words like "powerful," "seamless," "cutting-edge," "revolutionary," "innovative," or "state-of-the-art."

<details>
<summary>Examples</summary>

❌ "Lux provides a powerful and innovative solution for seamless daylight analysis"
✅ "Lux predicts daylight distribution using machine learning models"

❌ "Our cutting-edge tool revolutionizes the way architects work"
✅ "Lux analyzes daylight compliance based on SS-EN 17037"

</details>

**No marketing speak.** Documentation explains how things work, not why they are amazing.

**Direct statements.** Use active voice. State facts directly.

<details>
<summary>Examples</summary>

❌ "The analysis can be performed by clicking the button"
✅ "Click the button to run the analysis"

❌ "It is recommended that users should ensure their models meet the requirements"
✅ "Ensure your model meets the requirements"

</details>

### Structure and Formatting

**Avoid bullet points unless absolutely necessary.** Bullet points fragment information and make text harder to scan. Use paragraphs or numbered steps for procedures.

<details>
<summary>When bullet points are acceptable</summary>

- Lists of distinct, unordered items (like software prerequisites)
- Quick reference lists (like parameter tables)
- Navigation menus or option lists

When in doubt, use prose instead.

</details>

**Collapse long lists.** If you must include a long numeric or bulleted list (more than 5 items), make it collapsible using details/summary tags.

```markdown
<details>
<summary>View all 15 parameters</summary>

1. Parameter one
2. Parameter two
...

</details>
```

**Keep paragraphs short.** One idea per paragraph. Maximum 3-4 sentences.

**Use headings strategically.** Headings create structure. Every section should have a clear purpose.

### Content Guidelines

**Show, don't explain.** Prefer examples over explanations. Prefer code over prose.

<details>
<summary>Examples</summary>

❌ "You should provide the coordinates as an array of coordinate pairs where each pair represents a point"
✅ "Provide coordinates as `[[x1, y1], [x2, y2], [x3, y3]]`"

</details>

**No redundant information.** If something is already documented elsewhere, link to it instead of repeating it.

**Technical accuracy over friendliness.** Correctness is more important than sounding nice.

**No assumptions about user knowledge.** If a concept is not common knowledge, explain it or link to an explanation.

### Specific Patterns to Avoid

**Avoid "simply," "just," "easy," "quick."** These words minimize complexity and frustrate users who struggle.

❌ "Simply click the button"
✅ "Click the button"

**Avoid "allows you to," "enables you to."** State what something does, not what it allows.

❌ "This feature allows you to analyze multiple rooms"
✅ "Analyze multiple rooms with this feature" or "This feature analyzes multiple rooms"

**Avoid future tense for features that exist.** Use present tense for current functionality.

❌ "The tool will analyze your model"
✅ "The tool analyzes your model"

**Avoid rhetorical questions.** State information directly.

❌ "How do you install Lux? Follow these steps..."
✅ "Installation steps:"

## Documentation Structure

Each section should follow this pattern when applicable:

1. **What it is** - One sentence stating the purpose
2. **How it works** - Concrete explanation of the mechanism
3. **How to use it** - Step-by-step instructions or examples
4. **Limitations** - What it cannot do or edge cases
5. **Related information** - Links to related topics

## Code Examples

**Always provide working examples.** Code snippets must be copy-pasteable and functional.

**Use realistic data.** Example parameters should represent actual use cases, not placeholder values.

**Include expected output.** Show what the code produces.

**Use tabs for multi-language examples.** When showing API usage, provide examples in Python, Node.js, C#, and curl using Docusaurus tabs.

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python" default>

```python
# Python code here
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
// JavaScript code here
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
// C# code here
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
# curl command here
```

</TabItem>
</Tabs>
```

**Syntax highlighting identifiers:**
- Python: `python`
- JavaScript/Node.js: `javascript` or `js`
- TypeScript: `typescript` or `ts`
- C#: `csharp` or `cs`
- Bash/Shell: `bash` or `shell`
- JSON: `json`

## MDX Syntax Rules

**All JavaScript imports must be at the top.** Place all `import` statements immediately after the frontmatter, before any content.

<details>
<summary>Why this matters</summary>

MDX files are processed by Acorn (JavaScript parser) which expects ES6 imports at the file's top level. Import statements scattered throughout the document cause parsing errors.

Common error: `Could not parse import/exports with acorn`

</details>

**Structure of MDX files:**

```markdown
---
frontmatter: value
---

import Component from 'package';
import AnotherComponent from 'another-package';

# Content starts here

<Component>
...
</Component>
```

**Single import location.** Declare each component import once at the top. Never repeat import statements in multiple sections.

<details>
<summary>Example</summary>

❌ **Wrong** - Imports scattered throughout file:
```markdown
---
sidebar_position: 1
---

# Section 1

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>...</Tabs>

# Section 2

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>...</Tabs>
```

✅ **Correct** - All imports at top:
```markdown
---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Section 1

<Tabs>...</Tabs>

# Section 2

<Tabs>...</Tabs>
```

</details>

**Language-specific imports in code blocks.** Python `import` statements inside code blocks (triple backticks) are not JavaScript imports and do not need to be at the top.

```markdown
import Tabs from '@theme/Tabs';  // JavaScript - must be at top

## Example

```python
import requests  # Python - stays in code block
```
```

## Link Management

**Verify all internal links.** Broken internal links cause build failures. Always verify link targets exist and are published.

### Internal Links

Use Docusaurus-style relative paths for internal documentation links:

```markdown
[Docker Setup](/docs/code/docker-setup)
[API Reference](./api-reference)
```

**Never link to draft pages.** Pages with `draft: true` in frontmatter are excluded from builds and cause broken link errors.

<details>
<summary>Draft page handling</summary>

If a page has `draft: true`:
```markdown
---
sidebar_position: 10
draft: true
---
```

This page will not be published. Remove all links to it from other documentation pages.

</details>

**Test builds before committing.** Docusaurus validates links during build. Run `npm run build` to catch broken links before pushing.

### URL Guidelines

**Production URLs never include port numbers.** Production APIs use standard HTTPS (port 443).

❌ Wrong:
```markdown
https://api.upskiller.xyz:8080/v1/run
```

✅ Correct:
```markdown
https://api.upskiller.xyz/v1/run
```

**Local development may include ports.** Documentation for local Docker or self-hosted setups can specify ports:

```markdown
http://localhost:8080/
http://localhost:8000/v1
```

**Distinguish contexts clearly.** Label sections to indicate when URLs apply to local vs production:

```markdown
## Production

Base URL: `https://api.upskiller.xyz/v1`

## Self-Hosted Deployment

When running a local instance:
`http://localhost:8000/v1`
```

## Review Checklist

Before publishing documentation, verify:

- [ ] Every sentence is necessary
- [ ] No buzzwords or marketing language
- [ ] No bullet points unless justified
- [ ] Long lists are collapsible
- [ ] All examples are concrete and functional
- [ ] Technical terms are defined or linked
- [ ] Active voice is used throughout
- [ ] Information is not duplicated from other pages
- [ ] All JavaScript imports are at the top of MDX files
- [ ] No duplicate import statements
- [ ] All internal links point to published pages (not drafts)
- [ ] Production URLs omit port numbers
- [ ] Build passes without broken link errors (`npm run build`)

## Updates and Maintenance

Documentation must be updated when:

- API or functionality changes
- Users report confusion about a topic
- New features are added
- Errors or inaccuracies are discovered

Outdated documentation is worse than no documentation.

---

**Remember:** Good documentation respects the reader's time. Every word should earn its place.
