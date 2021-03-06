export default {
    name: "questions",
    props: ["quiz_question","topic_name"],
    components:{},
    data() {
        return {
            question_no : 0,
            level : 'Beginner Level',            
            q_ids : [],
            q_answer : [],
            score : 0,
            show_score : true
        }
    },
    mounted:function(){
        // this.question_no = 8;
    },
    watch:{
        question_no:function(val){
            if( val == 0 && val <= 3 ){
                this.level = 'Beginner Level';
            }else if( val >= 4 && val <= 6 ){
                this.level = 'Intermediate Level';
            }else if( val >= 7 && val <= 9 ){
                this.level = 'Professional Level';
            }
        }
    },
    methods: {
        answerques:function(answer, oid){            
            if( this.quiz_question[this.question_no]['answer'] == answer ){
                this.score = this.score + 1; 
            }
            
            if( this.question_no < 9 ){

                this.question_no = this.question_no + 1;
                document.getElementById(oid).checked = false;  
                document.getElementById(oid).blur();                
            }else{
                this.show_score = false;
            }            
        }
    },
    template: `
        <div>
            <div class="card mt-2" v-if="show_score" >
                <div class="card-body">                    
                    <div class="row">
                        <div class="col-6">                            
                            <span>Topic: {{topic_name}} </span> 
                        </div>
                        <div class="col-6" style="text-align:right">                            
                            <span>Level: {{level}} </span> 
                        </div>
                        <div class="col-12 mt-2">
                            {{question_no==0?1:question_no+1}}) {{quiz_question[question_no]['question']}}
                        </div>
                        <div class="col-6 mt-2 form-check"  >
                            A) <input class="form-check-input" type="radio" name="option" id="option_a" v-on:click="answerques(quiz_question[question_no]['option_a'], 'option_a')" > <label for="option_a" class="form-check-label" style="cursor:pointer" >{{quiz_question[question_no]['option_a']}}</label>
                        </div>
                        <div class="col-6 mt-2 form-check"    >
                            B) <input class="form-check-input" type="radio" name="option" id="option_b" v-on:click="answerques(quiz_question[question_no]['option_b'], 'option_b')"> <label for="option_b" class="form-check-label" style="cursor:pointer" >{{quiz_question[question_no]['option_b']}}</label>
                        </div>
                        <div class="col-6 mt-2 form-check"    >
                            C) <input class="form-check-input" type="radio" name="option" id="option_c" v-on:click="answerques(quiz_question[question_no]['option_c'], 'option_c')"> <label for="option_c" class="form-check-label" style="cursor:pointer" >{{quiz_question[question_no]['option_c']}}</label>
                        </div>
                        <div class="col-6 mt-2 form-check"   >
                            D) <input class="form-check-input" type="radio" name="option" id="option_d" v-on:click="answerques(quiz_question[question_no]['option_d'], 'option_d')"> <label for="option_d" class="form-check-label" style="cursor:pointer" >{{quiz_question[question_no]['option_d']}}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-2" v-if="!show_score" >
                <div class="card-body">   
                    <div class="row">
                        <div class="col-12">                            
                            <span>Topic: {{topic_name}} </span> 
                        </div>
                        <h1>Your Score {{score}} / 10</h1>                 
                    </div>
                </div>
            </div>
        </div>
    `
}