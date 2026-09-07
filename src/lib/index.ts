/**
 * Attributes for a link that leaves the site. Spread it rather than writing the
 * attributes out, so a new outbound link can't quietly miss `rel`.
 */
export function external(href: string) {
	return { href, target: '_blank', rel: 'noopener noreferrer' } as const;
}
