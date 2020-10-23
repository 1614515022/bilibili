<template>
<div @click="bannerClick">
    <div class="editBanner" >
        <span>{{left}}</span>
        <span>
            <slot name="right"></slot>
        </span>
    </div>
</div>
  
</template>
<script>
export default {
    props:["left"],
    methods:{
        bannerClick(){
            this.$emit("bannerClick")
        }
    }
}

</script>
<style lang='less'>
.editBanner{
    background: white;
    padding:4.167vw;
    border-bottom: 1px solid #eee;
    color:#333;
    font-size:3.611vw;
    display:flex;
    justify-content:space-between; 
    align-items: center;
    
}
</style>