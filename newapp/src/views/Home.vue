<template>
  <div>
    <div class="home">
        <nav-bar></nav-bar>
        <van-tabs v-model="active" swipeable sticky >
            <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
              <van-list
                v-model="item.loading"
                :finished="item.finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad">
  
                <div class="detailparent">
                  <detail class="detailitem" :detailitem="categoryItem" v-for="(categoryItem,categoryIndex) in item.list" :key="categoryIndex"></detail>
                </div>
              </van-list>
            </van-tab> 
        </van-tabs>
    </div>
  </div>
  
</template>

<script>
import NavBar from "../components/common/Navbar";
import detail from "./detail";
export default {
  data() {
    return {
      category: [],
      active: 0,
    };
  },
  components: {
    NavBar,
    detail,
  },
  methods: {
    async selectCategory() {
      const res = await this.$http.get("/category");
      console.log(res);
      this.changeCategory(res.data);
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.finished = false;
        item.loading = false;
        item.pagesize = 10;
        return item;
      });
      this.category = category1;
      this.selectArticle();
    },
    async selectArticle() {
      const categoryItem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryItem._id, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize,
        },
      });

      categoryItem.list.push(...res.data)
      categoryItem.loading = false;
      if(res.data.length < categoryItem.pagesize){
        categoryItem.finished = true;
      }
    },
    onLoad(){
      const categoryItem = this.categoryItem();
      setTimeout(()=>{
        categoryItem.page += 1
        this.selectArticle()
      })
      
    },
    categoryItem() {
      const categoryItem = this.category[this.active];
      //console.log(categoryItem);
      return categoryItem;
    },
  },
  watch: {
    active() {
      this.selectArticle();
    },
  },
  created() {
    this.selectCategory();
  },
};
</script>

<style lang="less">
.home{
  background:white
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
  .detailitem {
    padding: 1.389vw 0;
    width: 45%;
  }
}
</style>