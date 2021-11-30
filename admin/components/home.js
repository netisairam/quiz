import Menu from './menu.js';
export default {
    name: "home",
    props: [],
    components:{
        "Menu" : Menu
    },
    data() {
        return {
            
        }
    },
    created:function(){        
    },
    methods: {

    },
    template: `
            <div>                    
                <Menu></Menu>
                <div class="container">
                    <h1>Welcome</h1>
                </div>                    
            </div>
            `
}