export default {
    name: "Login",
    props: [],
    data() {
        return {
            "username":"",
            "password":"",
            "showpass":false,
            "error":"",
        }
    },
    computed:{

    },
    watch:{
        
    },
    methods: {
        login:function(event){
            event.preventDefault();            
            
            var formData = new FormData(); 
            formData.append('action', 'login');
            formData.append('email', this.username);
            formData.append('password', btoa(this.password));            
            let h = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            this.error = '';
            let t = this;
            axios.post('/quiz/apis/',formData,h).then(response => {				
                let res = response['data'];
                t.changecomponent(res);
            });            
        },        
        changecomponent:function(vdata){
            this.email = '';
            this.password = '';
            if(vdata){        
                if( vdata.status == "success"){        
                    let passdata = {"component":"home","loginstatus":"logined"}
                    // document.cookie = "loginstatus=logined";
                    this.$cookies.set('loginstatus','logined');

                    this.$emit('changecom',passdata);
                }else{
                    this.error = vdata.message;
                }
            }
        },
        show_pass(type){
            this.showpass = type;
            const passtype = document.getElementById('password');
            if(type){
                passtype.type = 'text';
            }else{
                passtype.type = 'password';
            }
        }
    },
    template: `
                <div class="container h-100 d-flex align-items-center">                    
                    
                    <form class="wrapper form-wrap"  v-on:submit="login($event)" >
                        <div class="alert alert-danger" role="alert"  v-show="error!=''">
                            {{error}}
                        </div>
                    
                        <div class="title ">Login</div>                    
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" v-model="username" class="form-control" id="email" required>                            
                        </div>
                        <div class="mb-3">
                           
                                <label for="password" class="form-label">Password</label>
                            <div style="position:relative">
                                <input type="password" v-model="password" class="form-control" id="password" required>
                                <a href="javascript:void(0);" v-on:click="show_pass(true)" v-show="!showpass" style="position: absolute;top: 0px;bottom: 0px;left: auto;right: 10px;margin: auto;display: block;height: 24px; color:black;">
                                    <span class="material-icons">
                                        visibility
                                    </span>
                                </a>
                                <a href="javascript:void(0);" v-on:click="show_pass(false)" v-show="showpass" style="position: absolute;top: 0px;bottom: 0px;left: auto;right: 10px;margin: auto;display: block;height: 24px;color:black;">
                                    <span class="material-icons">
                                        visibility_off
                                    </span>
                                </a>
                            </div>
                        </div>
                        <button type="click" class="btn btn-primary me-0 ms-auto d-block" style="width: 120px;">
                            Login
                        </button>
                    </form>                    
                </div>
            `
}