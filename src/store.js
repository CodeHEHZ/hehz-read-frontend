import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true;

let quiz = [{
    text: '《卡拉马佐夫兄弟》的作者是',
    answers: [
        { label: 'A', answer: '陀思妥耶夫斯基' },
        { label: 'B', answer: '托尔斯泰斯基' },
        { label: 'C', answer: '兔斯基' },
        { label: 'D', answer: '老斯基' }
    ]
}, {
    text: '《卡拉马佐夫兄弟》的主角是',
    answers: [
        { label: 'A', answer: '阿列克塞·费奥多罗维奇·卡拉马佐夫' },
        { label: 'B', answer: '阿列克塞·费列罗·卡拉马佐夫' },
        { label: 'C', answer: '爱茜茜里·费奥多罗维奇·卡拉马佐夫' },
        { label: 'D', answer: '阿莫西林·莫西干头·卡拉马佐夫' }
    ]
}, {
    text: '《卡拉马佐夫兄弟》中的斯乜尔加耶夫是',
    answers: [
        { label: 'A', answer: '笨蛋' },
        { label: 'B', answer: '呆瓜' },
        { label: 'C', answer: '小机智' },
        { label: 'D', answer: '莫西干头' }
    ]
}];

let storeInfo = {
    state: {
        quiz,
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
        getBook ({ state, dispatch }, bookInfo, forceRefresh) {
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
        }
    }
};

export default storeInfo;