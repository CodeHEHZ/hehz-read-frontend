import 'core-js/es6/promise';
import 'core-js/fn/string/includes';
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.number.is-integer';
import 'core-js/modules/es6.symbol';

import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';
import VueResource from 'vue-resource';
import VueAnalytics from 'vue-analytics';
import './assets/element.css';

import App from './App.vue';
import Logout from './components/Login/Logout.vue';

const Hello = r => require.ensure([], () => r(require('./components/Hello.vue')), 'group-hello');

const Dashboard = r => require.ensure([], () => r(require('./components/Dashboard/Dashboard.vue')), 'group-dashboard');
const BookDetail = r => require.ensure([], () => r(require('./components/Dashboard/BookDetail.vue')), 'group-dashboard');

const Quiz = r => require.ensure([], () => r(require('./components/Quiz/Quiz.vue')), 'group-dashboard');
const Question = r => require.ensure([], () => r(require('./components/Quiz/Question.vue')), 'group-dashboard');
const QuizResult = r => require.ensure([], () => r(require('./components/Quiz/QuizResult.vue')), 'group-dashboard');

const Admin = r => require.ensure([], () => r(require('./components/Admin/Admin.vue')), 'group-admin');

const BookAdmin = r => require.ensure([], () => r(require('./components/Admin/Book/Book.vue')), 'group-admin');
const EditBook = r => require.ensure([], () => r(require('./components/Admin/Book/EditBook.vue')), 'group-admin');

const QuizAdmin = r => require.ensure([], () => r(require('./components/Admin/Quiz/Quiz.vue')), 'group-admin');
const EditQuiz = r => require.ensure([], () => r(require('./components/Admin/Quiz/EditQuiz.vue')), 'group-admin');

const UserAdmin = r => require.ensure([], () => r(require('./components/Admin/User/User.vue')), 'group-admin');
const EditUser = r => require.ensure([], () => r(require('./components/Admin/User/EditUser.vue')), 'group-admin');

import storeInfo from './store';

Vue.use(VueCookie);

const ensureLoggedIn = (to, from, next) => {
    if (!Vue.cookie.get('username')) {
        next({
            path: '/',
            query: { redirect: to.fullPath }
        });
    } else if (Vue.cookie.get('group') !== 'admin' && Vue.cookie.get('group') !== 'manager') {
        next('/dashboard');
    } else {
        next();
    }
};

const routes = [
    { path: '/', component: Hello,
        beforeEnter: (to, from, next) => {
            if (Vue.cookie.get('username')) {
                next('/dashboard');
            } else {
                next();
            }
        }
    },
    {
        path: '/quiz/:author/:name/result',
        component: QuizResult,
        name: 'quizResult',
        beforeEnter: ensureLoggedIn
    },
    {
        path: '/quiz/:author/:name', redirect: '/quiz/:author/:name/1', component: Quiz, name: 'quiz',
        beforeEnter: ensureLoggedIn,
        children: [
            {
                path: ':id',
                component: Question,
                name: 'question'
            }
        ]
    },
    { path: '/logout', component: Logout },
    {
        path: '/dashboard', component: Dashboard,
        beforeEnter: ensureLoggedIn
    },
    {
        path: '/book/:author/:name', component: BookDetail, name: 'BookDetail',
        beforeEnter: ensureLoggedIn
    },
    {
        path: '/admin', component: Admin,
        beforeEnter: ensureLoggedIn,
        children: [
            {
                path: 'book', component: BookAdmin, name: 'BookAdmin',
                children: [
                    {
                        path: 'new',
                        name: 'CreateBook',
                        component: EditBook
                    },
                    {
                        path: ':author/:name',
                        name: 'EditBook',
                        component: EditBook
                    }
                ]
            },
            {
                path: 'quiz', component: QuizAdmin, name: 'QuizAdmin',
            },
            {
                path: 'quiz/:author/:name', component: EditQuiz, name: 'EditQuiz'
            },
            {
                path: 'user', component: UserAdmin, name: 'UserAdmin',
                children: [
                    {
                        path: 'new',
                        name: 'CreateUser',
                        component: EditUser
                    },
                    {
                        path: ':username',
                        name: 'EditUser',
                        component: EditUser
                    }
                ]
            }
        ]
    },
    { path: '*', redirect: '/' }
];

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueAnalytics, {
    id: 'UA-97499394-1',
    router
});

let store = new Vuex.Store(storeInfo);

const cookie = Vue.cookie;

let http = {
    root: '/root',
    headers: {},
    options: {
        crossOrigin: true,
        credentials: true
    }
};

new Vue({
    el: '#app',
    router,
    store,
    cookie,
    http,
    render: h => h(App)
});
