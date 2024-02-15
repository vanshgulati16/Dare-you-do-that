export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Dare you do that ☠️",
	description: "Mera gyan",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    // {
    //   label: "Projects",
    //   href: "/docs",
    // },
    // {
    //   label: "Pricing",
    //   href: "/pricing",
    // },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    {
      label: "Rules",
      href: "/rules",
    }
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Rules",
			href: "/rules",
		},
	],
	links: {
		github: "https://github.com/vanshgulati16",
		twitter: "https://twitter.com/kramjam",
		// docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev"
	},
};
