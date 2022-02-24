import React from 'react'

const Home = React.lazy(() => import('@/page/home'))
const BaseLayout = React.lazy(() => import('@/page/baseLayout'))
const Article = React.lazy(() => import('@/page/article'))
const NotFound = React.lazy(() => import('@/page/notfound'))
const Publish = React.lazy(() => import('@/page/publish'))
const MessageBoard = React.lazy(() => import('@/page/messageBoard'))
const BiYing = React.lazy(() => import('@/page/biying'))
const Setting = React.lazy(() => import('@/page/setting'))
const PersonalPage = React.lazy(() => import('@/page/personalPage'))

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
                path: '/messageBoard',
                exact: true,
                component: MessageBoard,
                needContainer: true
            },
            {
                path: '/biying',
                exact: true,
                component: BiYing,
            },
            {
                path: '/setting',
                exact: true,
                component: Setting,
                needContainer: true
            },
            {
                path: '/personalPage',
                exact: true,
                component: PersonalPage,
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