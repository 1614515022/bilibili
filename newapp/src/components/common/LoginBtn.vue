<template>
    <div class="package" @click="registerClick">
        <div class="LoginBtn">
            {{text}}
        </div>
    </div>
</template>
<script>
export default {
    props:["text"],
    methods:{
        registerClick:function(){
            this.$emit("registerSubmit")
        }
    }
}

</script>
<style lang='less' scoped>
.package{
    padding:4.167vw 2.778vw
}
.LoginBtn{
    height: 12.5vw;
    background: #ff9db5;
    color:white;
    border-radius: 6.25vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>