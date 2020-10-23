<template>
    <div>
        <login-top middleTop="注册bilibili">
            <div slot="right" style="font-size=3.611vw" @click="$router.push('/login')">跳转到登录页</div>
        </login-top>
        <login-text 
        label="姓名"
        style="margin:4.167vw 0" 
        placeholder="请输入姓名"
        type="text"
        rule="^.{6,16}$"
        @inputChange="res=>model.name=res"
        @keyup.enter.native="registerSubmit"
        />
        <login-text 
        label="账号"
        placeholder="请输入账号"
        type="text"
        rule="^.{6,16}$"
        @inputChange="res=>model.username=res"
        @keyup.enter.native="registerSubmit"
        />
        <login-text 
        label="密码"
        placeholder="请输入密码"
        type="password"
        rule="^.{6,16}$"
        @inputChange="res=>model.password=res"
        @keyup.enter.native="registerSubmit"
        />
        <login-btn text="注册"
        @registerSubmit="registerSubmit"
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
                name:"",
                username:"",
                password:""
            }
            
        }
    },
    components:{
        LoginTop,LoginText,LoginBtn
    },
    methods:{
        async registerSubmit(){
            let rulg = /^.{6,16}$/

            if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
               const res = await this.$http.post("/register",this.model)
               this.$msg.fail(res.data.msg)
               localStorage.setItem("id",res.data.id)
               localStorage.setItem("token",res.data.objtoken)
               console.log(res)
            }else{
                this.$msg.fail("格式不正确，请重新输入")
            }
        }
    }
    
}
</script>
