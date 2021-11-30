<html>
    <head>
        <title>Quiz Admin</title>
        <?php
            include('../include_header.php');
        ?>

    </head>
    <body>
        <div id="root">            
            <component :is="component_type" :key="component_type"  v-on:changecom="change_com($event)"></component>
        </div>
        
        <script type="module">
            import Login from './components/login.js';
            import Home from './components/home.js';
            import Topics from './components/topics.js';
            import Questions from './components/questions.js';
            // import VueCookies from 'vue-cookies';
            Vue.use('vue-cookies');

            // Vue.use(VueCookies);

            var app = new Vue({
                el: "#root",
                data:{
                    "component_type":"Login",
                    "login_status":""
                },
                components:{
                    'Login':Login,
                    'Home':Home,
                    'Topics':Topics,
                    'Questions':Questions
                },
                watch:{
                    component_type:function(val){
                        if(val != "Login"){                            
                            this.component_type = val;
                            this.$cookies.set("tabname",val);
                        }else{
                            this.$cookies.set("tabname","");
                        }                        
                    }
                },
                created: function(){

                },
                mounted: function(){
                    // let getcookie = document.cookie;
                    // console.log("testing +> "+this.$cookies.get("loginstatus") );
                    var login_status = this.$cookies.get("loginstatus");
                    var cookietab = this.$cookies.get("tabname");
                    
                    if(login_status == 'logined'){                    
                        console.log("testing +> "+this.$cookies.get("tabname") );
                        this.login_status = login_status;
                        if(cookietab == ''){
                            this.component_type = "Home";
                        }else{
                            this.component_type = cookietab;
                        }
                        
                    }else{
                        console.log("testing 123");
                        this.login_status = "";
                        this.component_type = "Login";
                    }
                },
                methods:{
                    change_com:function(vdata){
                        this.login_status = vdata.loginstatus;
                        this.component_type = vdata.component;
                    }
                }
            })
        </script>
    </body>
</html>    