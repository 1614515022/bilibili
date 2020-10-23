<template>
  <div>
    <div class="commentparent">
      <div v-for="(item,index) in commentlist" :key="index">
        <div class="commentitem">
          <div class="user_img">
            <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img">
            <img v-else src="@/assets/youke.jpg"/>
          </div>
          <div class="info">
            <p>
              <span v-if="item.userinfo">{{item.userinfo.name}}</span>
              <span v-else>此用户没有昵称</span>
              <span>{{item.comment_date}}</span>
            </p>
            <div>
              {{item.comment_content}}
              <div>
                <span class="commentpublish" @click="publishClick(item.comment_id)">回复</span>
              </div>
            </div>
          </div>
        </div>
        <comment-response style="padding:5px 20px" @childpost="publishClick" :commentchild="item.child"></comment-response>
      </div>
    </div>
  </div>
</template>

<script>
import commentResponse from "./commentResponse"
export default {
  data() {
    return{
      commentlist:null
    }
  },
  components:{
    commentResponse
  },
  methods: {
    async getcommentlist() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      if(res.data){
        this.$emit("commentlength",res.data.length)
      }
      this.commentlist = this.changecommentlist(res.data)
      console.log(this.commentlist)
    },
    changecommentlist(data){
      function fn(temp){
        let arr=[];
        for(let i = 0; i<data.length; i++){
          if(data[i].parent_id == temp){
            arr.push(data[i])
            data[i].child = fn(data[i].comment_id)
          }
          
        }
        return arr
      }
      return fn(null)
    },
    publishClick(id){
      this.$emit("publishClick",id)
    }
  },
  created() {
    this.getcommentlist();
  },
};
</script>
<style lang='less' scoped>
.commentparent {
  >div{
    border-bottom: 1px solid #999;
    .commentitem {
      padding: 5.556vw 2.778vw 0 2.778vw;
      display: flex;
      .user_img {
        img {
          width: 9.722vw;
          height: 9.722vw;
          border-radius: 9.722vw;
        }
      }
      .info {
        margin:0 2.778vw;
        flex: 1;
        
        p {
          display: flex;
          justify-content: space-between;
          font-size: 3.611vw;
          color: #555;
        }

        >div {
          font-size: 3.611vw;
          position: relative;
          right:0 ;
          
          span{
            position: absolute;
            right:0;
            top:0;
            color:red;
          }
        }
      }
    }
  }
}

</style>