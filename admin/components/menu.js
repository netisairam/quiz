export default {
    name : "Menu",
    props: [],
    data() {
        return {

        }
    },  
    created: function(){},  
    methods:{
        changetab:function(tab){            
            if(tab == "logout"){
                this.$root.component_type = "Login";
                this.$root.login_status = "";
                this.$cookies.set('loginstatus','');
            }else{
                this.$root.component_type = tab;
            }
        }
    },
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="javascript:void(0);" v-on:click="changetab('Home')">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0);" v-on:click="changetab('Topics')">Topics</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0);" v-on:click="changetab('Questions')">Questions</a>
                    </li>
                </ul>                                    
                
            </div>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click="changetab('logout')">Logout</button>
        </nav>
    `
}