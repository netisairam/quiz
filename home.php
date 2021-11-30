<html>
    <head>
        <title>Quiz Admin</title>
        <?php
            include('./include_header.php');
        ?>

    </head>
    <body>
        <div id="root">            
            <component :is="component_type" :key="component_type"  v-on:changecom="change_com($event)"></component>
        </div>
        
        <script type="module">
            
            import Home from './components/home.js';
            
            Vue.use('vue-cookies');

            var app = new Vue({
                el: "#root",
                data:{
                    "component_type":"Home",
                    "login_status":""
                },
                components:{
                    'Home':Home,                    
                },
                watch:{
                    
                },
                created: function(){

                },
                mounted: function(){
                  
                },
                methods:{
                    logout:function(){                    
                        window.location = "/quiz/logout.php";
                    }
                }
            })
        </script>
    </body>
</html>    