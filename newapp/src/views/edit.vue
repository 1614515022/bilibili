<template>
  <div class="edit">
      <nav-bar style="margin-bottom:2.778vw"></nav-bar>
      <div class="uploadfile">
          <van-uploader class="uploadimg" preview-size="100vw" :after-read="afterRead"></van-uploader>
        <edit-banner left="头像">
            <img slot="right" v-if="model.user_img" :src="model.user_img">
            <img slot="right" v-else src="../assets/me.jpg">
        </edit-banner>
      </div>

      <edit-banner left="昵称" @bannerClick="textshow = true">
        <a href="javascript:;" slot="right">{{model.name}}</a>
        </edit-banner>
      <edit-banner left="账号">
        <a href="javascript:;" slot="right">{{model.username}}</a>
        </edit-banner>
      <edit-banner left="性别" @bannerClick="gendershow = true">
          <a href="javascript:;" slot="right">{{model.gender==0?"男":"女"}}</a>
      </edit-banner>
      <edit-banner left="个性签名" @bannerClick="textareashow = true">
          <a href="javascript:;" slot="right">{{model.user_desc}}</a>
      </edit-banner>

        <div class="back" @click="$router.push('/userinfo')">
            返回个人中心
        </div>

      <van-dialog v-model="textshow"
        title="昵称"
        show-cancel-button
        @confirm="textconfirm"
        @cancel='text = ""' >
            <van-field v-model="text" autofocus />
      </van-dialog>

      <van-dialog v-model="textareashow"
        title="个性签名"
        show-cancel-button
        @confirm="textareaconfirm"
        @cancel='text = ""' >
            <van-field v-model="text" autofocus />
      </van-dialog>

      <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="genderactions" @select="onSelect" />
  </div>
</template>
    
<script>
import NavBar from "@/components/common/Navbar"
import editBanner from "@/components/common/editBanner"
export default {
    data(){
        return{
            model:{},
            text:"",
            textshow:false,
            textareashow:false,
            gendershow:false,
            genderactions:[
                {name:"男",val:0},
                {name:"女",val:1}
            ]
        }
    },
    components:{
        NavBar,editBanner
    },
    methods:{
        async UserinfoData(){
            const res = await this.$http.get("/user/"+localStorage.getItem("id"))
            this.model = res.data[0]
            console.log(this.model)
        },
        async afterRead(file){
            console.log(file)
            const fromdata = new FormData()
            fromdata.append("file",file.file)
            const res = await this.$http.post("/upload",fromdata)
            console.log(res)
            this.model.user_img = res.data.url
            this.userUpdate()
        },
        async userUpdate(){
            const res = await this.$http.post("/update/"+localStorage.getItem("id"),this.model)
            console.log(res)
            if(res.data.code == 200){
                this.$msg.fail("修改成功")
            }
        },
        textconfirm(){
            this.model.name = this.text
            this.userUpdate()
            this.text=""
        },
        textareaconfirm(){
            this.model.user_desc = this.text
            this.userUpdate()
            this.text=""
        },
        onSelect(data){
            console.log(data)
            this.model.gender = data.val
            this.gendershow = false
        },
        
    },
    created(){
        this.UserinfoData()
    }
    
}

</script>
<style lang='less' scoped>
.edit a{    
    color:#333
}
.edit img{
    width: 12.5vw;
    height: 12.5vw;
    border-radius: 50%;
}
.uploadfile{
    position: relative;
    overflow: hidden;
    .uploadimg{
        position: absolute;
        opacity: 0;
        
    }
}
.back{
    margin:2.778vw 0;
    padding:2.778vw 0;
    background-color:white;
    color:#999;
    display: flex;
    justify-content: center;
    align-items:center;
    font-size: 4vw;
}
</style>