<template>
    <div class="navbar">
        <div class="logo" @click="$router.push('/')">
            <img src="@/assets/logo.jpg">
        </div>
        <div>
            <span>
                <b class="content">请输入内容</b>
                <van-icon class="ipt-icon" name="search" />
            </span>
        </div>
        <div>
            <img :src="imgUrl" @click="$router.push('/edit')" v-if="imgUrl">
            <img src="@/assets/youke.jpg" @click="$router.push('/login')" v-if="!imgUrl">
            <p>下载APP</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            imgUrl:""
        }
    },
    async mounted(){
        if(localStorage.getItem("token")){
            const res = await this.$http.get("/user/"+localStorage.getItem("id"))
            this.imgUrl = res.data[0].user_img
        }
    }
}
</script>

<style lang='less' scoped>
.navbar{
    height: 12.5vw;
    background-color: white;
    display: flex;
    .logo{
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 80%;
        }
    }
    
}
div:nth-child(2){
    flex:1;
    display: flex;
    align-items: center;
    span{
        
        background-color: #f4f4f4;
        height: 7.222vw;
        width: 90%;
        border-radius: 3.611vw;
        position: relative;
        color:#aaa;
        .content{
            font-size:3.611vw;
            position: absolute;
            top:50%;
            left:8.333vw;
            transform: translate(0,-51%);
            color:"#aaa"
        }
        .ipt-icon{
            position: absolute;
            left:2.778vw;
            top:50%;
            transform: translate(0,-50%);
            color:"#aaa"
        }
    }
}
div:nth-child(3){
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        height: 24px;
        width: 24px;
        border-radius: 24px;
    }
    p{
        background-color: #fb7299;
        color: white;
        margin: 0 8px;
        padding:5px 10px;
        font-size:13px;
        border-radius: 3px;
    }
}
</style>