<template>
  <div v-if="model">
        <nav-bar></nav-bar>
    <div class="article">
        <div class="videoparent">
          <div class="video">
              <video :src="model.content" controls="controls"></video>
          </div>
        </div>
        <div class="detailtext">
            <div>
              <span>{{model.category.title}}</span>
              <span>{{model.name}}</span>
            </div>
            <div>
              <span>{{model.userinfo.name}}</span>
              <span>140万次观看</span>
              <span>6032弹幕</span>
              <span>{{model.date}}</span>
             </div>
             <div>
                 <span @click="collection" :class="{activecolor:colletionColor}">
                     <van-icon name="star" />收藏
                 </span>
                 <span @click="subscription" :class="{activecolor:subscriptionColor}">
                     <van-icon name="like" />关注
                 </span>
                 <span>
                     <van-icon name="share" />分享
                 </span>
                 <span>
                     <van-icon name="chat" />{{lens}}评论
                 </span>
             </div>
        </div>
        <div class="detailparent">
            <detail class="detailitem" v-for="(item,index) in commendlist" :key="index" :detailitem="item"></detail>
        </div>
        <div>
            <comment ref="commentipt" :totalcomment="lens" @postcomment="postpublish"></comment>
        </div>
        <div>
            <comment-text ref="refreshlist" @publishClick="postpublishClick" @commentlength="len => lens = len"></comment-text>
        </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/Navbar"
import detail from "./detail"
import comment from "../components/article/comment"
import commentText  from "../components/article/commentText"
export default {
    data(){
        return{
            model:null,
            commendlist:null,
            lens:null,
            postcomment:{
                comment_content:"",
                comment_date:"",
                article_id:null,
                parent_id:null,
            },
            colletionColor:null,
            subscriptionColor:null
        }
    },
    components: {
        NavBar,detail,comment,commentText
    },
    methods:{
        async getModel(){
            const res = await this.$http.get("/article/"+this.$route.params.id)
            this.model = res.data[0]
            if(this.model){
                this.subscriptioncode()
            }
        },
        async commendData(){
            const res = await this.$http.get("/commend")
            this.commendlist = res.data
        },
        async postpublish(data){
            const date = new Date();
            let m = date.getMonth() + 1;
            let d = date.getDate()
            if(m<10){
                m = "0" + m
            }
            if(d<10){
                d = "0" + d
            }
            let str = `${m}-${d}`
            this.postcomment.comment_content = data
            this.postcomment.comment_date = str
            this.postcomment.article_id = this.$route.params.id
            console.log(this.postcomment)
            const res = await this.$http.post("/comment_post/"+localStorage.getItem("id"),this.postcomment)
            this.$refs.refreshlist.getcommentlist()
            this.postcomment.parent_id = null
            if(res.status == 200){
                this.$msg.fail("评论发表成功")
            }
        },
        postpublishClick(id){
            this.postcomment.parent_id = id
            this.$refs.commentipt.focusIpt()
        },
        //收藏
        async collection(){
            if(localStorage.getItem("token")){
                const res = await this.$http.post("/collection/"+localStorage.getItem("id"),{article_id:this.$route.params.id})
                if(res.data.msg == "收藏成功"){
                this.colletionColor = true
                }else{
                this.colletionColor = false
                }
                this.$msg.fail(this.res.msg)
            } 
        },
        //打开页面，判断是否收藏
        async collectioncode(){
            if(localStorage.getItem("token")){
                const res = await this.$http.get("/collection/"+localStorage.getItem("id"),{
                    params:{
                        article_id:this.$route.params.id
                    }
                })
                this.colletionColor = res.data.success
            }
            
        },
        //关注
        async subscription(){
            if(localStorage.getItem("token")){
                const res = await this.$http.post("/sub_scription/"+localStorage.getItem("id"),{sub_id:this.model.userid})
                if(res.data.msg == "关注成功"){
                this.subscriptionColor = true
                }else{
                this.subscriptionColor = false
                }
                this.$msg.fail(this.res.msg)
            }
           
        },
        //打开页面，判断是否关注
        async subscriptioncode(){
            if(localStorage.getItem("token")){
                const res = await this.$http.get("/sub_scription/"+localStorage.getItem("id"),{
                    params:{
                        sub_id:this.model.userid
                    }
                })
                this.subscriptionColor = res.data.success
            }
            
        }
    },
    created(){
        this.getModel()
        this.commendData()
        this.collectioncode()
        
    },
    watch:{
        $route(){
            this.getModel()
            this.commendData()
            this.collectioncode()
        }
    }
}

</script>
<style lang='less' scoped>
.article{
    background:white;
}
.videoparent{
    .video{
        width: 100%;
        video{
            width: 100%;
        }
    }
}
.detailtext{
    padding:2.778vw;
    div:nth-child(1){
        span:nth-child(1){
            padding:1.389vw;
            color:#fb7299;
            background: #f4f4f4;
            border-radius: 2.778vw;
            font-size: 3.333vw;
        }
        span:nth-child(2){
            padding-left:4.167vw
        }
    }
    div:nth-child(2){
        padding:3.611vw 0 ;
        font-size:3.333vw;
        span:nth-child(2){
            padding:0 2.778vw 0 5.556vw;
            color:#aaa
        }
        span:nth-child(3){
            padding-right:2.778vw;
            color:#aaa
        }
        span:nth-child(4){
            color:#aaa
        }
    }
    div:nth-child(3){
        .activecolor{
            color:#fb7299
        }
        color:#aaa;
        span:nth-child(1){
            padding:0 10px 0 5px;
        }
        span:nth-child(3){
            padding:0 80px 0 10px;
        }
        
    }
}
.detailparent {
  background:white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    padding: 1.389vw 0;
    width: 45%;
  }
}
</style>