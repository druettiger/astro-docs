import dedent from 'dedent-js';

/**
 * Dedents the given markdown and replaces single newlines with spaces,
 * while leaving new paragraphs intact.
 */
export function dedentMd(...markdown) {
	return dedent(...markdown).replace(/(\S)\n(?!\n)/g, '$1 ');
}

/**
 * Formats the given `template` based on `count`, picking the correct plural
 * or singular form from the template.
 *
 * - If `count` is defined, it also prepends the template with `count`.
 *   - Example: "broken link(s)" --> "1 broken link" / "2 broken links"
 * - If `count` is undefined, it capitalizes the first letter.
 *   - Example: "broken link(s)" --> "Broken link"
 *
 * Supported template syntax:
 * - Use `(s)` to add a plural-only "s", e.g. "broken link(s)"
 * - Use `|` to provide separate templates, e.g. "issue was|issues were"
 */
export function formatCount(count, template) {
	const wrapWithCount = (text) => {
		// If no count was given, we're outputting a single issue in annotations,
		// so omit count and capitalize the first letter of the issue type description
		if (count === undefined) return text[0].toUpperCase() + text.slice(1);

		// Otherwise, prefix the issue type description with count
		return `${count} ${text}`;
	};

	const usePlural = count !== undefined && count !== 1;
	const templateParts = template.split('|');
	const usedTemplate = templateParts.length === 2 ? templateParts[usePlural ? 1 : 0] : template;
	return wrapWithCount(usedTemplate.replace(/\(s\)/g, usePlural ? 's' : ''));
}
