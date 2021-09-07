import Home from '@/home'
import BaseLayout from '@/baseLayout'
import Article from '@/article'

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