<template>
  <div class="commentitems">
    <div class="commentitem" v-for="(item,index) in commentchild" :key="index">
      <div class="user_img">
        <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img">
        <img v-else src="@/assets/youke.jpg"/>
      
      <div class="info">
        <p>
          <span v-if="item.userinfo">{{item.userinfo.name}}</span>
          <span v-else>此用户没有昵称</span>
          <span>{{item.comment_date}}</span>
        </p>
        <div>
          <div v-if="!temp">{{item.comment_content}}</div>
          <div v-else>回复 <span style="color:#478ef0">{{item.parent_user_info.name}}</span> :{{item.comment_content}}</div>
          <span class="respond" @click="childpublishClick(item.comment_id)">回复</span>
        </div>
      </div>
      </div>
      <commentchild-item @childpost="childpost" :commentchild="item.child" :temp="true"></commentchild-item>
    </div>
  </div>
</template>
<script>
export default {
  name:"commentchildItem",
  props:["commentchild","temp"],
  methods:{
    childpublishClick(id){
      this.$emit("childpost",id)
    },
    childpost(id){
      this.childpublishClick(id)
    }
  }
};
</script>
<style lang='less' scoped>
.commentitems {
    .commentitem {
      display: flex;
      flex-direction: column;
      .user_img {
        display: flex;
        padding:5px 0;
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
          position: relative;
          font-size: 3.611vw;
          .respond{
            position: absolute;
            right:0;
            top:0;
            color:red;
          }
        }
      }
    }
  
}
</style>