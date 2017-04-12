import 'core-js/es6/promise';
import 'core-js/fn/string/includes';

import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';
import VueResource from 'vue-resource';
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
import storeInfo from './store';


const routes = [
    {path: '/', component: Hello},
    {path: '/quiz/result', component: QuizResult},
    {
        path: '/quiz', redirect: '/quiz/1', component: Quiz,
        children: [
            {
                path: ':id',
                component: Question
            }
        ]
    },
    {path: '/login', component: Login},
    {path: '/logout', component: Logout},
    {path: '/dashboard', component: Dashboard},
    {path: '/book/:author/:name', component: BookDetail, name: 'BookDetail'},
    {path: '*', redirect: '/'}
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
