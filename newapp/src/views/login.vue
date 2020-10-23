<template>
    <div>
        <login-top middleTop="登录bilibili">
            <div slot="right" style="font-size=3.611vw" @click="$router.push('/register')">跳转到注册页</div>
        </login-top>
        
        <login-text 
        style="margin:4.167vw 0" 
        label="账号"
        placeholder="请输入账号"
        type="text"
        rule="^.{6,16}$"
        @inputChange="res=>model.username=res"
        @keyup.enter.native="loginSubmit"
        />
        <login-text 
        label="密码"
        placeholder="请输入密码"
        type="password"
        rule="^.{6,16}$"
        @inputChange="res=>model.password=res"
        @keyup.enter.native="loginSubmit"
        />
        <login-btn text="登录"
        @registerSubmit="loginSubmit"
        />
    </div>
</template>
<script>
import LoginTop from "../components/common/LoginTop"
import LoginText from "@/components/common/LoginText"
import LoginBtn from "../components/common/LoginBtn"
export default {
    data(){
        return{
            model:{
                username:"",
                password:""
            }
            
        }
    },
    components:{
        LoginTop,LoginText,LoginBtn
    },
    methods:{
        async loginSubmit(){
            let rulg = /^.{6,16}$/

            if(rulg.test(this.model.username) && rulg.test(this.model.password)){
               const res = await this.$http.post("/login",this.model)
               this.$msg.fail(res.data.msg)
               localStorage.setItem("id", res.data.id)
               localStorage.setItem("token",res.data.token)
               if(res.data.msg == "登录成功"){
                    setTimeout(()=>{    
                        this.$router.push("/userinfo")
                    },1000)  
               }
               
            }else{
                this.$msg.fail("格式不正确，请重新输入")
            }
        }
    }
    
}
</script>
