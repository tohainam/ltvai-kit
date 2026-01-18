import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "ltvai-kit",
      description:
        "Claude Code Skills Kit - Chuẩn hóa workflow phát triển với AI",
      social: {
        github: "https://github.com/ltvai/ltvai-kit",
      },
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Skills",
          items: [
            { label: "Overview", link: "/skills/" },
            {
              label: "Producer Skills",
              collapsed: true,
              autogenerate: { directory: "skills/producer" },
            },
            {
              label: "Consumer Skill",
              collapsed: true,
              autogenerate: { directory: "skills/consumer" },
            },
            {
              label: "Utility Skills",
              collapsed: true,
              autogenerate: { directory: "skills/utility" },
            },
          ],
        },
        {
          label: "Commands",
          autogenerate: { directory: "commands" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      customCss: ["./src/styles/custom.css"],
      editLink: {
        baseUrl: "https://github.com/ltvai/ltvai-kit/edit/main/packages/docs/",
      },
      lastUpdated: true,
    }),
  ],
});
