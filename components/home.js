import Menu from './menu.js';
import Questions from './questions.js';
export default {
    name: "home",
    props: [],
    components:{
        "Menu" : Menu,
        "Questions" : Questions
    },
    data() {
        return {
            topics : {},
            selected_topic : 0,
            quiz_question : {},
            show_question : false,           
            topic_name : ''
        }
    },
    mounted:function(){
        this.gettopi();    
    },
    methods: {
        gettopi:function(){
            // alert("tesitng ");
            var formData = new FormData(); 
            formData.append('action', 'getfornttopics');
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				
                let res = response['data'];
                if(res.status == "success"){
                    t.topics = res.data;
                }else if(res.status == "fail" && res.message == "Please login"){                    
                    this.$root.logout();
                }else{

                }                
            });
        },
        selecttopic:function(topic, topicname){
            this.selected_topic = topic;     
            this.topic_name = topicname;
            var formData = new FormData(); 
            formData.append('action', 'getquizquestion');
            formData.append('topic', topic);
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				
                let res = response['data'];
                if(res.status == "success"){                    
                    t.show_question = true;
                    t.quiz_question = res.data;
                }else if(res.status == "fail" && res.message == "Please login"){                    
                    this.$root.logout();
                }else{

                }                
            });
        }
    },
    template: `
            <div>                    
                <Menu></Menu>
                <div class="container">
                    <div v-show="!show_question" > 
                        <h3>Quiz</h3>
                        <p>Please select Topic to start quiz</p>
                        <div class="card-deck" v-if="Object.keys(topics).length > 0">
                            <div class="card mt-2" style="cursor:pointer" v-for="(val, index) in topics" :key="index" >
                                <div class="card-body text-center">
                                    <p class="card-text" v-on:click="selecttopic(index, val)">{{val}}</p>
                                </div>
                            </div>                        
                        </div>
                    </div>
                    <div v-if="show_question"  >                     
                        <Questions :quiz_question="quiz_question" :topic_name="topic_name"></Questions>
                    </div>
                </div>                    
            </div>
            `
}