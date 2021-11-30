export default {
    name : "Menu",
    props: [],
    data() {
        return {
            h : {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            username:'',
        }
    },  
    created: function(){}, 
    mounted: function(){
        this.getusername();
    }, 
    methods:{
        getusername:function(){
            // alert("tesitng ");
            var formData = new FormData(); 
            formData.append('action', 'getusername');
            let t = this;
            axios.post('/quiz/apis/',formData,this.h).then(response => {				
                let res = response['data'];
                if(res.status == "success"){
                    t.username = res.data;
                }else{
                    this.$root.logout();
                }
                
            });            
        }
    },
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">  
                        Welcome {{username}}          
                    </li>                    
                </ul>                                                    
            </div>
            <a class="btn btn-outline-success my-2 my-sm-0" href="/quiz/logout.php">Logout</a>
            
        </nav>
    `
}