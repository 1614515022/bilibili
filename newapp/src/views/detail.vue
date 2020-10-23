<template>
<div @click="pushdetail" v-if="detailitem">
    <div class="detail">
        <div class="imgparent">
            <img :src="detailitem.img" alt="" >
            <div class="bottom">
                <span class="video"><van-icon name="play-circle-o" />1200</span>
                <span class="comment"><van-icon name="orders-o" />540</span>
            </div>
        </div>
      <p>{{detailitem.name}}</p>
    </div>
</div>
  
</template>

<script>
export default {
    props:["detailitem"],
    methods:{
        pushdetail(){
            if(this.$route.path != `/article/${this.detailitem.id}`){
                this.$router.push(`/article/${this.detailitem.id}`)
            }
        }
    }

}

</script>
<style lang='less' scoped>
.detail{
    .imgparent{
        position: relative;
        img{
            width:100%;
            height: 27.778vw;
        }
        .bottom{
            position: absolute;
            background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
            bottom: 1.389vw;
            width:100%;
            display: flex;
            justify-content: space-between;
            color:white;
        }
    }
    
    p{
        font-size:3.333vw;
    }
}
</style>