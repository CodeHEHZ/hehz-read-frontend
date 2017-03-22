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
}]

let bookList = [
    {name: '《卡拉马佐夫兄弟》', url: '/assets/covers/cover1.png'},
    {name: '《他改变了中国》', url: '/assets/covers/cover2.jpg'}
]

let storeInfo = {
    state: {
        quiz,
        bookList,
        answer: [],
        answerCount: 0,
        questionNumber: 0,
        api: 'https://api.read.hehlzx.cn/'
    },
    mutations: {
        nextQuestion (state) {
            if (state.questionNumber < state.quiz.length - 1)
                state.questionNumber++
        },
        lastQuestion (state) {
            if (state.questionNumber > 0)
                state.questionNumber--
        },
        setQuestion (state, m) {
            state.questionNumber = m
        },
        select (state, m) {
            if (!state.answer[m.number])
                state.answerCount++
            state.answer[m.number] = m.label
        }
    }
}

export default storeInfo;