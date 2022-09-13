export default {
    name: 'regUser',
    path: '/regUser',
    component: () => import('../../pages/RegUser'),
    children: [
        {
            name: 'regPassword',
            path: '/regPassword',
            component: () => import('../../pages/RegPassword')
        }
    ]
}