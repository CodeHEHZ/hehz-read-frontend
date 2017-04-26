import 'core-js/es6/promise';
import 'core-js/fn/string/includes';
import 'core-js/modules/es7.array.includes';

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

const Quiz = r => require.ensure([], () => r(require('./components/Quiz/Quiz.vue')), 'group-quiz');
const Question = r => require.ensure([], () => r(require('./components/Quiz/Question.vue')), 'group-quiz');
const QuizResult = r => require.ensure([], () => r(require('./components/Quiz/QuizResult.vue')), 'group-quiz');

const Admin = r => require.ensure([], () => r(require('./components/Admin/Admin.vue')), 'group-admin');

const BookAdmin = r => require.ensure([], () => r(require('./components/Admin/Book/Book.vue')), 'group-admin');
const EditBook = r => require.ensure([], () => r(require('./components/Admin/Book/EditBook.vue')), 'group-admin');

const QuizAdmin = r => require.ensure([], () => r(require('./components/Admin/Quiz/Quiz.vue')), 'group-admin');
const EditQuiz = r => require.ensure([], () => r(require('./components/Admin/Quiz/EditQuiz.vue')), 'group-admin');

const UserAdmin = r => require.ensure([], () => r(require('./components/Admin/User/User.vue')), 'group-admin');

import storeInfo from './store';


const routes = [
    { path: '/', component: Hello },
    { path: '/quiz/:author/:name/result', component: QuizResult, name: 'quizResult' },
    {
        path: '/quiz/:author/:name', redirect: '/quiz/:author/:name/1', component: Quiz, name: 'quiz',
        children: [
            {
                path: ':id',
                component: Question,
                name: 'question'
            }
        ]
    },
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
