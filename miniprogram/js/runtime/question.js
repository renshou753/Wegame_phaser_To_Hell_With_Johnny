/**
 * 问题处理类
 */
import {questionList} from '../data/questions.js'
import ResourceLoader from "../base/ResourceLoader.js";
export default class Question {
    constructor () {
        this.currentList = this.getQuestions();
        ResourceLoader.create(this.loaders);
    }
    static getInstance () {
        if (!Question.instance) {
            Question.instance = new Question();
        }
        return Question.instance;
    }
    // 随机获取10个问题
    getQuestions() {
        let questions = [], randoms = [], loaders = [];
        let count = 0;

        while (count < 5) {
            let random = parseInt(Math.random() * questionList.length);
            if (randoms.indexOf(random) === -1) {
                questions.push(questionList[random]);
                loaders.push([random, questionList[random].pic]);
                randoms.push(random);
                count++;
            }
        }
        this.loaders = loaders;
        return questions;
    }
}