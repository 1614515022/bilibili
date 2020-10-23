<template>
  <div class="search">
    <div>
      <van-search
        v-model="iptValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onIndex">搜索</div>
        </template>
      </van-search>
      <div>
        <detail v-for="(item,index) in searchlist" :key="index" :detailitem="item"></detail>
      </div>
    </div>
  </div>
</template>

<script>
import detail from "@/views/search.vue"
export default {
  data() {
    return {
      iptValue: "",
      searchlist: [],
      reslist: [],
      isShow: false,
    };
  },
  components:{
    detail
  },
  methods: {
    async commendData() {
      const res = await this.$http.get("/commend");
      this.searchlist = res.data;
      console.log(this.searchlist);
      //console.log(res)
    },
    onIndex() {
      if (this.iptValue == "") {
        return;
      }
      this.searchlist.forEach((item) => {
        if (
          item.id.indexOf(this.iptValue) > -1 ||
          item.name.indexOf(this.iptValue) > -1 ||
          item.userid.indexOf(this.iptValue) > -1
        ) {
          this.reslist.push(item);
        }
      });
      console.log(this.searchlist);
      if (this.reslist.length == 0) {
        this.$msg.fail("没有搜素到");
      } else {
        this.isShow = true;
      }
      this.reslist = [];
    },
  },
  created() {
    this.commendData();
  },
};
</script>
<style lang='less' scoped>

</style>