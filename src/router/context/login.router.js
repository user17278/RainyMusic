export default {
    name: 'login',
    path: '/login',
    // component: LoginPage,
    component: () => import('../../pages/LoginPage'),
    children: [
        {
            name: 'check',
            path: '/check',
            // component: PasswordPage,
            component: () => import('../../pages/PasswordPage')
        },
    ]
}