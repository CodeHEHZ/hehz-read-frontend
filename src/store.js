import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true;

let storeInfo = {
    state: {
        quiz: [],
        quizInfo: {},
        bookList: [],
        answer: [],
        answerCount: 0,
        questionNumber: 0,
        visited: [],
        api: 'https://api.read.hehlzx.cn/',
        static: 'https://static.read.hehlzx.cn/',
        uploadUrl: 'https://api.read.hehlzx.cn/upload'
    },
    mutations: {
        nextQuestion (state) {
            if (state.questionNumber < state.quiz.length - 1)
                state.questionNumber++;
        },
        lastQuestion (state) {
            if (state.questionNumber > 0)
                state.questionNumber--;
        },
        setQuestion (state, m) {
            state.questionNumber = m;
        },
        select (state, m) {
            if (!state.answer[m.number])
                state.answerCount++;
            state.answer[m.number] = m.label;
        },
        visit (state, m) {
            if (m < state.quiz.length)
                state.visited[m] = 1;
        },
        setBookList (state, bookList) {
            state.bookList = bookList;
        },
        cleanQuizInfo (state) {
            state.quizInfo = {};
            state.quiz = [];
            state.answer = [];
            state.visited = [];
            state.answerCount = 0;
            state.questionNumber = 0;
        }
    },
    actions: {
        getBookList ({ state, commit }, forceRefresh) {
            return new Promise((resolve) => {
                if (state.bookList.length === 0 || forceRefresh) {
                    Vue.http.get(state.api + 'book/list')
                        .then(response => {
                            let bookList = response.body;
                            for (let i = 0; i < bookList.length; i++) {
                                bookList[i].cover += '!web';
                            }
                            commit('setBookList', response.body);
                            resolve(state.bookList);
                        });
                } else {
                    resolve(state.bookList);
                }
            });
        },
        getBook ({ state, dispatch }, bookInfo) {
            return new Promise((resolve, reject) => {
                dispatch('getBookList', bookInfo.forceRefresh).then(() => {
                    let book = state.bookList.filter(book => {
                        return book.author === bookInfo.author && book.name === bookInfo.name;
                    });
                    if (book[0]) {
                        resolve(book[0]);
                    } else {
                        Vue.http.get(state.api + 'book/' + bookInfo.author + '/' + bookInfo.name)
                            .then(response => {
                                resolve(response.body);
                            }, err => {
                                reject(err);
                            });
                    }
                });
            });
        },
        getQuiz ({ state }, bookInfo) {
            return new Promise((resolve, reject) => {
                if (state.quizInfo.name === bookInfo.name && state.quizInfo.author === bookInfo.author) {
                    resolve(state.quiz);
                } else {
                    Vue.http.get(state.api + 'book/' + bookInfo.author + '/' + bookInfo.name + '/quiz',
                        { credentials: true }).then(
                        response => {
                            state.quiz = response.body.quiz.question;
                            state.quizInfo = bookInfo;
                            state.quizInfo.id = response.body.quiz._id;
                            state.quizInfo.deadline = response.body.deadline;
                            resolve(state.quiz);
                        })
                    .catch(
                        response => {
                            reject(response);
                        }
                    )
                }
            });
        }
    }
};

export default storeInfo;