import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'


const app = Vue.createApp({
    data() {
        return {
            isCardAdded: false,
            flashCards: [],
            questionInput: "",
            answerInput: "",
            areFieldsEmpty: false,
            addQuestionAble: true
        }
    },

    // SHOW CARDS SAVED IN LOCAL STORAGE
    mounted() {
        let savedFlashs = localStorage.getItem('saved-flashcards')
        if (savedFlashs) {
            this.flashCards = JSON.parse(savedFlashs)
        }
        console.log('load: ', this.flashCards)
    },

    methods: {

        getCardById(id){
            return this.flashCards.find((card) => {
                return card.id == id;
              })
        },

        createCard(){
            this.isCardAdded = true
            this.addQuestionAble = false
        
        },

        saveCard(){
            if(!this.questionInput || !this.answerInput){
                this.areFieldsEmpty = true
                setTimeout(()=> { this.areFieldsEmpty = false }, 3000);
                return
            } 
            
            this.flashCards.push(
                {
                id: nanoid(),
                question: this.questionInput,
                answer: this.answerInput,
                isShowAnswerVisible: false,
                editMode: false,
                questionBeingEdited: this.questionInput,
                answerBeingEdited: this.answer
                })


            this.questionInput = ""
            this.answerInput = ""
            this.isCardAdded = false
            this.addQuestionAble = true
                
        },

        closeCard(id){
            let card = this.getCardById(id)
            this.isCardAdded = !this.isCardAdded
            this.addQuestionAble = true
            this.questionInput = ""
            this.answerInput = ""

        },

        deleteCard(id){
            let card = this.getCardById(id)
            this.flashCards = this.flashCards.filter(card => card.id != id)
        },

        showAnswer(id){
            let card = this.getCardById(id)
            card.isShowAnswerVisible = !card.isShowAnswerVisible

        },

        //Edit Mode

        editCard(id){
            let card = this.getCardById(id)
            card.editMode = true
            this.addQuestionAble = false

        },

        saveEditedCard(id){
            let card = this.getCardById(id)
            card.editMode = false
            this.addQuestionAble = true
            card.isShowAnswerVisible = false
        },

        closeCardEditMode(id){
            let card = this.getCardById(id)
            card.editMode = false
            this.addQuestionAble = true

        },
    },
        // SAVE CARDS IN LOCAL STORAGE
    watch: {
        flashCards: {
            handler(value) {
                console.log('flashcards watch:', value)
                let toLocalStorage = JSON.stringify(value)
                localStorage.setItem('saved-flashcards', toLocalStorage)
            },
            deep: true
        }
    }
})

app.mount('#app')