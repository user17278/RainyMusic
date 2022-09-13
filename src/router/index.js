/* 1、route，它是一条路由，由这个英文单词也可以看出来，它是单数， Home按钮 => home内容， 这是一条route, about按钮 => about 内容， 这是另一条路由。
2、routes 是一组路由，把上面的每一条路由组合起来，形成一个数组。[{home 按钮 =>home内容 }， { about按钮 => about 内容}]
3、router 是一个机制，相当于一个管理者，它来管理路由。因为routes 只是定义了一组路由，它放在哪里是静止的，当真正来了请求，怎么办？ 就是当用户点击home 按钮的时候，怎么办？这时router 就起作用了，它到routes 中去查找，去找到对应的 home 内容，所以页面中就显示了 home 内容。
4、客户端中的路由，实际上就是dom 元素的显示和隐藏。当页面中显示home 内容的时候，about 中的内容全部隐藏，反之也是一样。客户端路由有两种实现方式：基于hash 和基于html5 history api. */
// 该文件专门用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from "vue-router";
// 1.创建组件
// 第一种写法
// import LoginPage from "../pages/LoginPage"
// import PasswordPage from "../pages/PasswordPage"
// import OtherLogin from "../pages/OtherLogin"
// import PhoneLogin from "../pages/PhoneLogin"
// import EmailLogin from "../pages/EmailLogin"
// import CodeLogin from "../pages/CodeLogin"
// 第二种写法 路由分区
import LoginPage from "./context/login.router"
import RegUser from "./context/regUser.router"
Vue.use(VueRouter);


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


// 3.创建并且实例化一个路由器并导出
export default new VueRouter({
    // 2.配置路由
    routes: [
        // 第一种写法
        // {
        //     name: 'login',
        //     path: '/login',
        //     component: LoginPage,
        //     children: [
        //         {
        //             name: 'check',
        //             path: 'check',
        //             component: PasswordPage,
        //         }
        //     ]
        // },
        // 第二种写法 路由分区
        LoginPage,
        RegUser,
        {
            name: 'regSuccess',
            path: '/regSuccess',
            component: () => import('../pages/RegSuccess')
        },
        {
            name: 'otherLogin',
            path: '/otherLogin',
            // component: OtherLogin,
            component: () => import('../pages/OtherLogin'),
            children: [
                {
                    name: 'phoneLogin',
                    path: '/phoneLogin',
                    // component: PhoneLogin,
                    component: () => import('../pages/PhoneLogin'),
                },
                {
                    name: 'emailLogin',
                    path: '/emailLogin',
                    // component: EmailLogin,
                    component: () => import('../pages/EmailLogin')
                }, {
                    name: 'codeLogin',
                    path: '/codeLogin',
                    // component: CodeLogin,
                    component: () => import('../pages/CodeLogin')
                }
            ]
        },
    ]
})

// // 3.实例化VueRouter
// const router = new VueRouter({
//     mode: 'history',   //hash模式改为history
//     routes, //（缩写）相当于 routes: routes
// })