<template>
    <div class="container">
        <h1>Login</h1>
        <form class="wrapper form-wrap">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" required>                            
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        
    </div>
</template>
<style scoped>

*{font-family:'Roboto',Arial,sans-serif;box-sizing:border-box;}
.form-wrap{
    width: 600px;margin: auto;box-shadow: 0px 1px 6px #00000029;padding: 12px;box-shadow: 0px 1px 6px #00000029;
    padding: 20px;box-shadow: 0px 1px 6px #00000029;border-radius: 8px;
}
.form-wrap .title{
    color: #2B2A29;font-size: 1.5rem;font-weight: normal;font-family: 'RobotoMedium';text-align: center; 
    margin: 12px auto 36px;line-height: normal;
}
.btn-submit{
    color: #2B2A29;font-size: 18px;font-family: 'Robotomedium';background-color: #FFCA08;margin: auto auto auto 6px;
    width: 135px;height: 42px;transition: all 0.26s;outline: none;box-shadow: none;
}
.btn-submit:hover{background-color: #FFBD00 !important; box-shadow: 0px 3px 6px 0px #00000029;}
.btn-reset{
    color: #2B2A29;font-size: 18px;font-family: 'Robotomedium';background-color: #fff;margin: auto auto auto 6px;
    width: 135px;height: 42px;border: 1px solid #707070;transition: all 0.26s;outline: none;box-shadow: none;
}
.btn-reset:hover{box-shadow: 0px 3px 6px 0px #00000029;}
.btn:focus {outline: 0;box-shadow: none;}

.btns-wrap{display: flex;justify-content: space-between;max-width: 300px;margin: auto 0 auto auto;}
.btns-wrap .btn{width: 50%;}
</style>
export default {
    name: "Login",
    props: [],
    data() {
        return {
    
        }
    },
    methods: {
    
    },
    
}