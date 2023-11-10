import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "AIO Reviews",
    description: "Shopify reviews app",
    themeConfig: {
        search: {
            provider: 'local'
        },
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Introduction', link: '/why'}
        ],

        sidebar: [
            {
                text: 'Research',
                items: [
                    {text: 'What people do?', link: '/competitor'},
                    {text: 'What to do?', link: '/features'},
                    {text: 'Pricing', link: '/pricing'},
                ]
            },
            {
                text: "Features",
                items: [
                    {text: "Import Reviews", link: "/import-reviews"},
                    {text: "Manage Reviews", link: "/manage-reviews"},
                    {text: "Display Reviews", link: "/display-reviews"},
                    {text: "Collect Reviews", link: "/collect-reviews"},
                ]
            },
            {
                text: "Implementation",
                items: [
                    {text: "Architecture", link: "/architecture"}
                ]
            },
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
