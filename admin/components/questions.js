import Menu from './menu.js';
export default {
    name: "questions",
    props: [],
    components:{
        "Menu" : Menu,
        "paginate": VuejsPaginate
    },
    data() {
        return {
            topics : {},
            show_form:false,
            questions:{},        
            q_topic:"",
            topic_data:[],
            question:"",
            option_a:"",
            option_b:"",
            option_c:"",
            option_d:"",            
            answer:"",            
            search_topic:"",
            error:"",
            page:1,
            totalpages:0,
            qedit_id:0
        }
    },
    mounted:function(){
        this.gettopic();
        this.getquestions();
    },
    computed:{

    },
    watch:{
        
    },
    methods: {
        clickCallback:function(page){
            this.page = parseInt(page);
            this.getquestions();    
        },
        deletequestion:function(val){
            var formData = new FormData();             
            formData.append( 'action', 'deletequestion' );            
            formData.append( 'qid' , val);
            var t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				                
                let res = response['data'];                
                if(res.status == "success"){
                    t.show_form = false;
                    t.getquestions();                                
                }
            }); 
        },
        geteditrecord:function(qid){
            let t = this;
            var formData = new FormData();             
            formData.append( 'action', 'geteditrecord' );            
            formData.append( 'qid' , qid);
            axios.post('/quiz/apis/',formData,this.h).then(response => {				                
                let res = response['data'];                
                if(res.status == "success"){
                    t.qedit_id = parseInt(res.data.id);
                    t.q_topic = res.data.topic;
                    t.question = res.data.question;
                    t.option_a = res.data.option_a;
                    t.option_b = res.data.option_b;
                    t.option_c = res.data.option_c;
                    t.option_d = res.data.option_d;
                    t.answer = res.data.answer;                    
                    t.show_form = true;
                    document.getElementById("question_form").scrollIntoView();
                }
            }); 
        },        
        save_question:function(){
            var error = [];
            if( this.q_topic == ""){
                error.push("Please select Topic");
            }
            if( this.question == ""){
                error.push("Please enter question");
            }
            if( this.option_a == ""){
                error.push("Please enter Option A");
            }
            if( this.option_b == ""){
                error.push("Please enter Option B");
            }
            if( this.option_c == ""){
                error.push("Please enter Option C");
            }
            if( this.option_d == ""){
                error.push("Please enter Option D");
            }
            if( this.answer == ""){
                error.push("Please enter Answer");
            }
            if( error.length > 0 ){
                this.error = '';
                this.error = error.join(', ');
                return false;
            }else{
                this.error = '';
            }
            var formData = new FormData(); 
            if( this.qedit_id > 0 ){
                formData.append( 'qid', this.qedit_id );            
                formData.append( 'action', 'update_question' );            
            }else{
                formData.append( 'action', 'save_question' );            
            }  
            
            formData.append( 'q_topic' , this.q_topic);
            formData.append( 'question' , this.question);
            formData.append( 'option_a' , this.option_a);
            formData.append( 'option_b' , this.option_b);
            formData.append( 'option_c' , this.option_c);
            formData.append( 'option_d' , this.option_d            );
            formData.append( 'answer' , this.answer);        
            formData.append( 'page' , this.page);
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				                
                let res = response['data'];                
                if(res.status == "success"){
                    t.resetquestion();
                    t.getquestions();                                
                    t.show_form = false;
                    if( t.qedit_id > 0 ){
                        t.qedit_id = 0;
                    }
                }
            }); 
        },
        getquestions:function(){
            var formData = new FormData(); 
            formData.append('action', 'getquestions');            
            formData.append('page', this.page);            
            if(this.search_topic != ''){
                formData.append( 'search', this.search_topic );            
            }
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				                
                let res = response['data'];                
                if(res.status == "success"){                    
                    t.questions = res.data;
                    // console.log("testing "+ res.total);
                    t.totalpages = parseInt(res.pages);
                }else{
                    t.questions = {};
                }
            }); 
        },
        resetquestion:function(){
            this.q_topic = "";
            this.question = "";
            this.option_a = "";
            this.option_b = "";
            this.option_c = "";
            this.option_d = "";            
            this.answer = "";            
        },
        gettopic:function(){
            var formData = new FormData(); 
            formData.append('action', 'gettopics');            
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				                
                let res = response['data'];                
                if(res.status == "success"){
                    t.topics = res.data;
                    console.log(res.data);
                    var tt = res.data;
                    for(let val in tt){
                        t.topic_data[tt[val]['id']] = tt[val]['topic'];
                    }                    
                }
            }); 
        },
        search:function(event){
            event.preventDefault();
            console.log("test "+ this.search_topic);
            this.getquestions();
        },
        addquestion:function(event){
            event.preventDefault();
            this.show_form = true;
        },
    },
    template: `
            <div>                    
                <Menu></Menu>
                <div class="container">
                    <h1>Questions</h1>
                    <div class="card" style="width: auto;">
                        <form class="row g-3 m-2 " id="question_form">                            
                            <div class="col-auto ">
                                <select class="form-select" aria-label="Default select example" v-model="search_topic">
                                    <option value="">Select Topic</option>
                                    <option :key="index" :value="val.id" v-for="(val, index) in topics">{{val.topic}}</option>                                    
                                </select>
                            </div>
                            <div class="col-auto ml-2">
                                <button class="btn btn-primary mb-3" v-on:click="search($event)">Search</button>
                                <button class="btn btn-danger mb-3" v-on:click="search_topic='';page=1;search($event)" >Reset</button>
                                <button class="btn btn-danger mb-3" v-on:click="addquestion($event)" >Add Question</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="card mt-2" v-show="show_form" >
                        <div class="card-body">
                            <h5 class="card-title">Add Question</h5>
                            <div class="alert alert-danger" role="alert" v-if="error != ''">
                                {{error}}    
                            </div>
                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label for="topic" class="form-label">Topic</label>
                                    <select id="topic" class="form-select" required  v-model="q_topic">
                                        <option selected>Select Topic</option>     
                                        <option v-for="(val,index) in topics" :value="val.id" :key="index">{{val.topic}}</option>                                           
                                    </select>
                                </div>                                
                                <div class="col-md-12">
                                    <label for="question" class="form-label" >Question</label>
                                    <textarea class="form-control" id="question" required  v-model="question"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="option_a" class="form-label">Options A</label>
                                    <textarea class="form-control" id="option_a" required v-model="option_a"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="option_b" class="form-label">Options B</label>
                                    <textarea class="form-control" id="option_b" required v-model="option_b"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="option_c" class="form-label">Options C</label>
                                    <textarea class="form-control" id="option_c" required v-model="option_c"></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label for="option_d" class="form-label">Options D</label>
                                    <textarea class="form-control" id="option_d" required v-model="option_d"></textarea>
                                </div>
                                <div class="col-md-12">
                                    <label for="answer" class="form-label">Answer</label>
                                    <textarea class="form-control" id="answer" required v-model="answer"></textarea>
                                </div>
                                <div class="col-md-12">
                                    <button type="button" class="btn btn-primary" v-on:click="save_question" v-if="qedit_id==0">Save</button>
                                    <button type="button" class="btn btn-primary" v-on:click="save_question" v-if="qedit_id>0">Update</button>
                                    <button type="button" class="btn btn-secondary" v-on:click="resetquestion" >Clear</button>
                                    <button type="button" class="btn btn-secondary" v-on:click="show_form = false;" >Close</button>                                                                                                            
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card" style="width: auto;">
                            <div id="paginatee" style="display: flex; padding: 16px ​5px 0p; justify-content: center; align-items: center;">
                                
                                <template>
                                    <paginate 
                                    :page-count="totalpages"
                                    :page-range="5"
                                    :margin-pages="1"
                                    :container-class="'pagination'"
                                    :click-handler="clickCallback"
                                    :page-class="'page-item'"
                                    :page-link-class="'page-link'"
                                    :prev-class="'page-item'"
                                    :next-link-class="'page-link'"
                                    :next-class="'page-item'"
                                    :prev-link-class="'page-link'"
                                    :prev-text="'Prev'" 
                                    :first-last-button="true"
                                    :break-view-text="'---'"
                                    :next-text="'Next'">
                                    </paginate>
                                </template>
                                
                            </div>
                        </div>
                    <table class="table table-striped mt-5">
                        <thead>                            
                            <th>Topic</th>
                            <th>Level</th>
                            <th>Question</th>                                
                            <th>Answer</th>
                            <th></th>
                        </thead>
                        <tbody v-if="Object.keys(questions).length > 0">
                            <tr v-for="(val,index) in questions" :key="val.id">
                               
                                <td>{{ topic_data[val.topic] }}</td>                                
                                <td>
                                    <p>{{ val.question }}</p>
                                    <p>A: {{val.option_a}}</p>
                                    <p>B: {{val.option_b}}</p>
                                    <p>C: {{val.option_c}}</p>
                                    <p>D: {{val.option_d}}</p>
                                </td>
                                <td>{{ val.answer }}</td>
                                <td>
                                    <span class="material-icons" style="cursor:pointer" v-on:click="geteditrecord(val.id);">edit</span>
                                    <span class="material-icons" style="cursor:pointer" v-on:click="deletequestion(val.id);">delete</span>
                                </td>        
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="4">No Question Found</td>
                            </tr>
                        </tbody>
                    </table>                   
                </div>                    
            </div>
            `
}