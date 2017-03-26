import 'core-js/es6/promise'
import 'core-js/fn/string/includes'

import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
var VueResource = require('vue-resource');
import './assets/element.css'

import App from './App.vue'
import Hello from './components/Hello.vue'
import Quiz from './components/Quiz.vue'
import QuizResult from './components/QuizResult.vue'
import Login from './components/Login.vue'
import BookList from './components/BookList.vue'
// import BookDetail from './components/BookDetail.vue'

import Question from './components/Question.vue'
import Dashboard from './components/Dashboard.vue'
import storeInfo from './store'


const routes = [
    { path: '/', component: Hello },
    { path: '/quiz/result', component: QuizResult },
    { path: '/quiz', redirect: '/quiz/1', component: Quiz,
        children: [
            {
                path: ':id',
                component: Question
            }
        ]
    },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/booklist', component: BookList },
    { path: '/book/:name', component: BookDetail },
    { path: '*', redirect: '/' }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(VueResource);

let store = new Vuex.Store(storeInfo)

const cookie = Vue.cookie

let http = {
    root: '/root',
    headers: { }
}

new Vue({
    el: '#app',
    router,
    store,
    cookie,
    http,
    render: h => h(App)
})
