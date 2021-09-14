import Home from '@/page/home'
import BaseLayout from '@/page/baseLayout'
import Article from '@/page/article'
import NotFound from '@/page/notfound'
import Publish from '@/page/publish'

const routes = [
    {
        component: BaseLayout,
        routes: [
            {
                path: '/publish',
                exact: true,
                component: Publish
            },
            {
                path: '/article/:id',
                exact: true,
                component: Article,
                needContainer: true
            },
            {
                path: '/home',
                exact: true,
                component: Home,
                needContainer: true
            },
            {
                path: '/',
                exact: true,
                component: Home,
                needContainer: true
            },
            {
                component: NotFound
            }
        ]
    },
];

export default routes