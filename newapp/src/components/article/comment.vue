<template>
  <div>
    <div class="comment">
      <div>
        <span>评论</span>
        <span>({{totalcomment}})</span>
      </div>
      <div>
        <span>
          <img v-if="myUser[0]" :src="myUser[0].user_img" />
          <img v-else src="@/assets/youke.jpg" />
        </span>
        <span>
          <input type="text" v-model="mycomment" ref="commentipt" placeholder="想说点什么？" />
          <button @click="commentPublich">发表</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myUser: {},
      mycomment:""
    };
  },
  props:["totalcomment"],
  methods: {
    async myUserinfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.myUser = res.data;
    },
    commentPublich(){
        if(!this.myUser && !localStorage.getItem("token") && !localStorage.getItem("id")){
            this.$msg.fail("请先登录")
            return
        }
        this.$emit("postcomment",this.mycomment)
        this.mycomment = ""
    },
    focusIpt(){
      this.$refs.commentipt.focus()
    }
  },
  created() {
      if(localStorage.getItem("token")){
           this.myUserinfo();
      }
  },
};
</script>
<style lang='less' scoped>
.comment {
  background: white;
  div:nth-child(1) {
    padding: 2.778vw;
    margin: 13.889vw 0 0 0;
    span:nth-child(2) {
      color: #aaa;
      padding: 0 5.556vw;
    }
  }
  div:nth-child(2) {
    display: flex;
    align-items: center;
    span:nth-child(1) {
      padding: 0 2.778vw;
      img {
        width: 11.111vw;
        height: 11.111vw;
        border-radius: 11.111vw;
      }
    }
    span:nth-child(2) {
      padding-left: 1.389vw;
      color: #444;
      input {
        outline: none;
        border: 0;
        padding: 1.944vw;
        font-size: 4.167vw;
        background: #ccc;
        border-radius: 13.889vw;
      }
      button {
        border: 0;
        outline: none;
        background: #fb7299;
        color: white;
        border-radius: 5.556vw;
        padding: 2.222vw 7.999px;
        margin: 0 2.778vw;
      }
    }
  }
}
</style>