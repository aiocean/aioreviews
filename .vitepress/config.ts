import {DefaultTheme, defineConfig} from 'vitepress'
import * as fs from "fs";
import * as path from "path";

// function generate Menu, accept folder path and return array of menu
function generateMenuItems(folderPath: string): DefaultTheme.SidebarItem[] {

    const files = fs.readdirSync(folderPath);

    // Filter out non-Markdown files and map to menu items
    return files
        .filter(file => path.extname(file) === '.md')
        .map(file => {
            const name = path.basename(file, '.md');
            // read the file to get the first h1 as the title
            const content = fs.readFileSync(`./${folderPath}/${file}`, 'utf8');
            const title = content.match(/^#\s*(.*)\s*$/m)?.[1] ?? name;
            return {
                text: title,
                link: `/${folderPath}/${name}`
            };
        });
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "AIO Reviews",
    description: "Shopify reviews app",
    themeConfig: {
        search: {
            provider: 'local'
        },
        nav: [
            {text: 'Introduction', link: '/introduction/'}
        ],

        sidebar: [
            {
                text: 'Research',
                items: generateMenuItems('research')
            },
            {
                text: "Features",
                items: generateMenuItems('features')
            },
            {
                text: "Implementation",
                items: generateMenuItems('architecture')
            },
            {
                text: "Community",
                items: generateMenuItems('community')
            },
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/aiocean/aioreviews'},
            {icon: 'twitter', link: 'https://twitter.com/duocdev'},
            {icon: 'discord', link: 'https://discord.gg/vPJjCrDf'},
        ]
    }
})
