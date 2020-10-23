<template>
  <div id="nav">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<style lang="less">
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color:#f4f4f4;
}
p{
  margin: 0;
  padding: 0;
}
</style>