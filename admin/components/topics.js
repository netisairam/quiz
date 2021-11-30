import Menu from './menu.js';
export default {
    name: "Topic",
    props: [],
    components:{
        "Menu" : Menu
    },
    data() {
        return {
            "topic":{},
            "topic_name":"",
            "topic_id":0,
            "show_edit":0,
            "h" : {
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },
        }
    },
    mounted:function(){
        this.gettopic();
    },
    methods: {
        gettopic:function(){
            var formData = new FormData(); 
            formData.append('action', 'gettopics');            
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				                
                let res = response['data'];                
                if(res.status == "success"){
                    t.topic = res.data;
                }
            }); 
        },
        addtopic:function(){
            var formData = new FormData(); 
            formData.append('action', 'addtopics');            
            formData.append('topic_name', this.topic_name.toLowerCase());            
            formData.append('type', 'insert');            
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				                
                let res = response['data'];                
                if(res.status == "success"){
                    t.gettopic();
                    t.resettopic();
                }else{

                }
            });
        },
        resettopic:function(){
            this.topic_name = "";
            this.topic_id = 0;            
            this.show_edit = 0;
        },
        edittopic:function(id, name){
            this.topic_name = name;
            this.topic_id = id;
            this.show_edit = 1;
        },
        updatetopic:function(){
            var formData = new FormData(); 
            formData.append('action', 'addtopics');            
            formData.append('type', 'update');            
            formData.append('topic_name', this.topic_name.toLowerCase());            
            formData.append('topic_id', this.topic_id);            
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				                
                let res = response['data'];                
                if(res.status == "success"){
                    t.gettopic();
                    t.resettopic();
                }else{

                }
            });
        }
    },
    template: `
            <div>                    
                <Menu></Menu>
                <div class="container mt-5">
                    <div class="row">
                        <form class="col-6">                
                            <div class="col-10">
                                <label for="topic" class="form-label">Topic</label>
                                <input type="text" class="form-control" id="topic" v-model="topic_name" required>
                            </div>  
                            <div class="d-flex">                                 
                                <button type="button" id="add_product" v-on:click="addtopic" class="btn btn-primary mt-2 me-2 d-flex align-items-center" v-if="show_edit==0">
                                    <span class="material-icons">add</span>
                                    Add
                                </button>
                                <button type="button" id="add_product" v-on:click="updatetopic" class="btn btn-primary mt-2 me-2 d-flex align-items-center" v-if="show_edit==1">
                                    <span class="material-icons">update</span>
                                    Update
                                </button>                                
                                <button type="button"  v-on:click="resettopic" class="btn btn-danger mt-2 me-2 d-flex align-items-center">
                                    <span class="material-icons">refresh</span>
                                    Reset
                                </button>
                            </div>
                        </form>
                        <div class="col-6">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Topic</th>
                                        <th></th>                                
                                    </tr>
                                </thead>
                                <tbody v-if="Object.keys(this.topic).length > 0">
                                    <tr v-for="(val, index) in topic" :key="index">
                                        <td>{{  index + 1}}</td>
                                        <td>{{val.topic}}</td>
                                        <td class="col-2">
                                            <span class="material-icons" style="cursor:pointer" v-on:click="edittopic(val.id, val.topic)">
                                                edit
                                            </span>                                            
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="3" class="text-center"><strong> No Topics Found </strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>                    
                </div>                    
            </div>
            `
}