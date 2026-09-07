export const site = {
	name: 'Joshua Liu',
	role: 'Computer science student at the University of Illinois',
	description:
		'Joshua Liu — computer science at the University of Illinois. Systems software, game engines, and embedded.',
	url: 'https://haelp.dev',
	location: 'Champaign, Illinois',
	from: 'Lexington, MA',
	email: 'jaliu2@illinois.edu',
	links: {
		github: 'https://github.com/halp1',
		linkedin: 'https://www.linkedin.com/in/joshua-a-liu/',
		instagram: 'https://www.instagram.com/josh.liu__/'
	},
	/** Set to the public path once the corrected PDF exists; the link hides while null. */
	resume: null as string | null
} as const;

export const currently = [
	{ org: 'Illini Electric Motorsports', what: 'Formula SAE HIL firmware and integration' },
	{ org: 'iRobotics', what: 'Micromouse pathfinding and localization development' },
	{ org: 'MochBot', what: 'Human movement replication neural network' }
];

export const beyond = [
	{
		lead: 'Eagle Scout, Troop 160',
		rest: '— Former Assistant Senior Patrol Leader, 36 merit badges.'
	},
	{
		lead: 'LIT Programming Competition',
		rest: '— I wrote CTF and competitive programming problems for a global contest thousands of students participate in every year.'
	},
	{
		lead: 'VEX summer camps',
		rest: "— I ran camps for middle schoolers and raised my team's yearly budget, so cost was never a barrier for learning robotics."
	},
	{
		lead: 'VEX Massachusetts State Champions, 2026',
		rest: '· USACO Silver · PicoCTF 2023–2025'
	}
];
