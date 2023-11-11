// watch for file change and update sidebar object in config.ts

// watch for file change and update sidebar object in config.ts

import fs from 'fs';
import {DefaultTheme} from "vitepress";
import path from "path";

function generateMenuItems(folderPath: string): DefaultTheme.SidebarItem[] {

    const files = fs.readdirSync(folderPath);

    // Filter out non-Markdown files and map to menu items
    return files
        .filter(file => path.extname(file) === '.md')
        .sort((a, b) => {
            const aName = path.basename(a, '.md');
            const bName = path.basename(b, '.md');
            return aName.localeCompare(bName);
        })
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

const contentFolders = [
    'introduction',
    'research',
    'features',
    'architecture',
    'implementation',
    'publication',
    'community'
]

const config = require('../.vitepress/config.ts').default;

let menuItems: DefaultTheme.SidebarItem[] = []
contentFolders.forEach(folder => {
    menuItems.push({
        text: folder.charAt(0).toUpperCase() + folder.slice(1),
        items: generateMenuItems(folder)
    })
});
config.themeConfig.sidebar = menuItems;
fs.writeFileSync('./config.ts', `export default ${JSON.stringify(config, null, 4)}`);
fs.renameSync('./config.ts', './.vitepress/config.ts');
