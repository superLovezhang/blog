import Home from '@/page/home'
import BaseLayout from '@/page/baseLayout'
import Article from '@/page/article'
import NotFound from '@/page/notfound'

const routes = [
    {
        path: '/publish',
        exact: true
    },
    {
        component: BaseLayout,
        routes: [
            {
                path: '/article/:id',
                exact: true,
                component: Article
            },
            {
                path: '/home',
                exact: true,
                component: Home,
            },
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                component: NotFound
            }
        ]
    }
];

export default routes