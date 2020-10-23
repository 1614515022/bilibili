<template>
  <div>
      <van-field 
       :label="label"
        :type="type"
         :placeholder="placeholder"
          v-model="content"
           />
  </div>
</template>

<script>
export default {
  data(){
    return{
      content:""
    }
  },
    props:["label","type","placeholder","rule"],
    methods:{
      handlerulg:function(){
        const rue = new RegExp(this.rule)
        if(rue.test(this.content)){
          this.$emit("inputChange",this.content)
        }
      }
    },
    watch:{
      content(){
        this.handlerulg()
      }
    }
}

</script>
<style lang='less' scoped>
</style>