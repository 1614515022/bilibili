<template>
    <div>
      <nav-bar></nav-bar>
      <img src="@/assets/background.jpg" class="background">
      <user-detail :userinfo="model"></user-detail>
      <user-article></user-article>
    </div>
</template>

<script>
import NavBar from "@/components/common/Navbar"
import UserDetail from "@/components/usercomponents/userdetail"
import userArticle from "@/components/usercomponents/userArticle"
export default {
    data(){
        return {
            model:""
        }
    },
    components:{
        NavBar,UserDetail,userArticle
    },
    methods:{
        async UserinfoData(){
            const res = await this.$http.get("/user/"+localStorage.getItem("id"))
            this.model = res.data[0]
        }
    },
    created(){
        this.UserinfoData()
    }

}

</script>
<style lang='less' >
.background{
    width:100%;
    height: 100px;
}
</style>