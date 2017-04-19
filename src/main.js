import 'core-js/es6/promise';
import 'core-js/fn/string/includes';

import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';
import VueResource from 'vue-resource';
import VueAnalytics from 'vue-analytics'
import './assets/element.css';

import App from './App.vue';
import Hello from './components/Hello.vue';
import Quiz from './components/Quiz/Quiz.vue';
import QuizResult from './components/Quiz/QuizResult.vue';
import Login from './components/Login/Login.vue';
import Logout from './components/Login/Logout.vue';
import BookDetail from './components/Dashboard/BookDetail.vue';

import Question from './components/Quiz/Question.vue';
import Dashboard from './components/Dashboard/Dashboard.vue';

import Admin from './components/Admin/Admin.vue';

import BookAdmin from './components/Admin/Book/Book.vue';
import EditBook from './components/Admin/Book/EditBook.vue';

import QuizAdmin from './components/Admin/Quiz/Quiz.vue';
import EditQuiz from './components/Admin/Quiz/EditQuiz.vue';

import UserAdmin from './components/Admin/User/User.vue';

import storeInfo from './store';


const routes = [
    { path: '/', component: Hello },
    { path: '/quiz/result', component: QuizResult },
    {
        path: '/quiz', redirect: '/quiz/1', component: Quiz,
        children: [
            {
                path: ':id',
                component: Question
            }
        ]
    },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/dashboard', component: Dashboard },
    { path: '/book/:author/:name', component: BookDetail, name: 'BookDetail' },
    {
        path: '/admin', component: Admin,
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
                children: []
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
            return {x: 0, y: 0}
        }
    }
});

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(VueResource);
Vue.use(VueAnalytics, {
    id: 'UA-97499394-1',
    router
});

let store = new Vuex.Store(storeInfo);

const cookie = Vue.cookie;

let http = {
    root: '/root',
    headers: {}
};

new Vue({
    el: '#app',
    router,
    store,
    cookie,
    http,
    render: h => h(App)
});
