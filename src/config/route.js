import Home from '@/page/home'
import BaseLayout from '@/page/baseLayout'
import Article from '@/page/article'

const routes = [
    {
        path: '/article/:id',
        exact: true,
        component: Article
    },
    {
        component: BaseLayout,
        routes: [
            {
                path: '/home',
                component: Home,
            },
            {
                path: '/',
                component: Home
            }
        ]
    }
];

export default routes