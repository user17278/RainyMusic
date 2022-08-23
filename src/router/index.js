// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
import LoginPage from "../pages/LoginPage"
import PasswordPage from "../pages/PasswordPage"
import OtherLogin from "../pages/OtherLogin"
import PhoneLogin from "../pages/PhoneLogin"
import EmailLogin from "../pages/EmailLogin"
import CodeLogin from "../pages/CodeLogin"

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 创建一个路由器
export default new VueRouter({
    routes: [
        {
            name: 'login',
            path: '/login',
            component: LoginPage,
            children: [
                {
                    name: 'check',
                    path: 'check',
                    component: PasswordPage,
                }
            ]
        },
        {
            name: 'otherLogin',
            path: '/otherLogin',
            component: OtherLogin,
            children: [
                {
                    name: 'phoneLogin',
                    path: '/phoneLogin',
                    component: PhoneLogin,
                },
                {
                    name: 'emailLogin',
                    path: '/emailLogin',
                    component: EmailLogin,
                }, {
                    name: 'codeLogin',
                    path: '/codeLogin',
                    component: CodeLogin,
                }
            ]
        }
    ]
})